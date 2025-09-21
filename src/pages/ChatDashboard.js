import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  doc,
  setDoc
} from "firebase/firestore";

let socket = null;

export const ChatDashboard = () => {
  const auth = getAuth();
  const db = getFirestore();
  const [user, setUser] = useState(null);
  const [activeUsers, setActiveUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState({}); // eslint-disable-line
  const [newMsg, setNewMsg] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [messageListeners, setMessageListeners] = useState({}); // Track Firestore listeners

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser?.uid || "No user");
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  // Initialize socket connection when user is authenticated
  useEffect(() => {
    if (!user) {
      console.log("No user, not connecting socket");
      return;
    }

    console.log("Initializing socket for user:", user.uid);

    // Initialize socket connection
    socket = io("https://planorama-user-chat.onrender.com", {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
      
      // Register user after connection is established
      socket.emit("new user", {
        uid: user.uid,
        name: user.displayName || user.email || "Anonymous",
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socket.on("usersList", (users) => {
      console.log("Received users list:", users);
      setActiveUsers(users);
    });

    socket.on("receiveMessage", ({ roomId, from, fromUid, text }) => {
      console.log("Received message via socket:", { roomId, from, fromUid, text, currentUser: user.uid });
      
      // Extract UIDs from roomId to check if this message belongs to current user
      const roomParts = roomId.split("_");
      const isMyRoom = roomParts.includes(user.uid);
      
      if (isMyRoom) {
        console.log("Message is for current user's room - will be saved to Firestore by sender");
        // Note: We don't add to local state here because Firestore listener will handle it
        // This prevents duplicate messages
      } else {
        console.log("Message not for current user's room");
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Cleanup on unmount or user change
    return () => {
      console.log("Cleaning up socket connection");
      if (socket) {
        socket.disconnect();
        socket = null;
      }
      setIsConnected(false);
      setActiveUsers({});
      
      // Cleanup Firestore listeners
      Object.values(messageListeners).forEach(unsubscribe => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      });
      setMessageListeners({});
    };//eslint-disable-next-line
  }, [user]);

  // Load messages for selected user from Firestore
  useEffect(() => {
    if (selectedUser && user) {
      const roomId = getRoomId(user.uid, selectedUser.uid);
      console.log("Setting up Firestore listener for room:", roomId);
      
      // Clean up previous listener for this room if it exists
      if (messageListeners[roomId]) {
        messageListeners[roomId]();
      }

      // Create Firestore listener for this room
      const messagesRef = collection(db, "chats", roomId, "messages");
      const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));
      
      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const roomMessages = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          roomMessages.push({
            id: doc.id,
            ...data,
            timestamp: data.timestamp?.toDate() || new Date(),
            // Ensure consistent display logic
            from: data.fromUid === user.uid ? "Me" : data.from
          });
        });
        
        console.log(`Loaded ${roomMessages.length} messages for room ${roomId}`, roomMessages);
        setMessages(roomMessages);
        
        // Also update allMessages for this room
        setAllMessages(prev => ({
          ...prev,
          [roomId]: roomMessages
        }));
      }, (error) => {
        console.error("Error listening to messages:", error);
      });

      // Store the listener
      setMessageListeners(prev => ({
        ...prev,
        [roomId]: unsubscribe
      }));

    } else {
      setMessages([]);
    }//eslint-disable-next-line
  }, [selectedUser, user, db]);

  // Generate consistent roomId
  const getRoomId = (uid1, uid2) => [uid1, uid2].sort().join("_");

  const sendMessage = async () => {
    if (!newMsg.trim() || !selectedUser || !socket || !isConnected) {
      console.log("Cannot send message:", { newMsg: newMsg.trim(), selectedUser, socket: !!socket, isConnected });
      return;
    }

    const roomId = getRoomId(user.uid, selectedUser.uid);
    const messageData = {
      text: newMsg,
      from: user.displayName || user.email || "Me",
      fromUid: user.uid,
      timestamp: serverTimestamp(),
      read: false
    };

    try {
      // Save message to Firestore
      console.log("Saving message to Firestore:", messageData);
      const messagesRef = collection(db, "chats", roomId, "messages");
      await addDoc(messagesRef, messageData);
      
      // Also create/update the chat room document with basic info
      const chatRoomRef = doc(db, "chats", roomId);
      await setDoc(chatRoomRef, {
        participants: [user.uid, selectedUser.uid],
        participantNames: {
          [user.uid]: user.displayName || user.email || "Anonymous",
          [selectedUser.uid]: selectedUser.name
        },
        lastMessage: {
          text: newMsg,
          from: user.displayName || user.email || "Me",
          timestamp: serverTimestamp()
        },
        updatedAt: serverTimestamp()
      }, { merge: true });

      // Send socket message for real-time notification
      socket.emit("privateMessage", {
        roomId,
        from: user.displayName || user.email || "Me",
        fromUid: user.uid,
        to: selectedUser.uid,
        text: newMsg,
      });

      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      // You could show an error toast here
    }
    
    setNewMsg("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-gray-500">Please log in to access chat</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 h-[80vh] gap-4">
      {/* Sidebar */}
      <div className="col-span-1 bg-gray-100 rounded-2xl p-4 shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Active Users</h2>
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} title={isConnected ? 'Connected' : 'Disconnected'}></div>
        </div>
        
        <div className="text-sm text-gray-600 mb-2">
          You: {user.displayName || user.email || "Anonymous"}
        </div>
        
        <ul className="space-y-2">
          {Object.entries(activeUsers).length === 0 ? (
            <li className="text-gray-400 text-sm">No other users online</li>
          ) : (
            Object.entries(activeUsers).map(([uid, u]) => (
              uid !== user.uid && (
                <li
                  key={uid}
                  onClick={() => setSelectedUser({ uid, ...u })}
                  className={`cursor-pointer p-2 rounded-lg transition-colors ${
                    selectedUser?.uid === uid
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-blue-100"
                  }`}
                >
                  {u.name}
                </li>
              )
            ))
          )}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="col-span-3 flex flex-col bg-white rounded-2xl shadow">
        {selectedUser ? (
          <>
            <div className="p-4 border-b font-semibold text-lg bg-blue-50 rounded-t-2xl">
              Chat with {selectedUser.name}
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.length === 0 ? (
                <div className="text-gray-400 text-center">No messages yet. Start the conversation!</div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.from === "Me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-xl max-w-[70%] ${
                        msg.from === "Me"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t flex gap-2">
              <input
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!isConnected}
              />
              <button
                onClick={sendMessage}
                disabled={!isConnected || !newMsg.trim()}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};