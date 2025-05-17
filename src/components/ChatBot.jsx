import React, { useState, useEffect } from "react";
import { Send, Maximize, Minimize } from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Beatrix from "./BeatrixImg";
import MessageComponent from "./MessageComponent";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase/config";
export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState(null);
  const [chatbotText, setChatbotText] = useState("Login To Start Chatting!!");
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setChatbotText("Need travel tips or day plans? Ask Me Anything!!");
      } else {
        setUserId(null);
        setChatbotText("Login To Start Chatting!!");
      }
    });
  }, []);

  const toggleChatbot = () => setIsOpen(!isOpen);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !userId) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch(
        "https://dhruvin2968-plaorama-chatbot.hf.space/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, prompt: input }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const botResponse = {
          text: data.response || "Error: No response from server",
          sender: "bot",
        };
        setMessages((prev) => [...prev, botResponse]);

        // Store user query in Firestore
        await addDoc(collection(db, "queries"), {
          prompt: input,
          author: {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid,
          },
          timestamp: serverTimestamp(),
        });
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "Error: Failed to fetch response", sender: "bot" },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Error: Unable to reach server", sender: "bot" },
      ]);
    }

    setInput("");
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div
        onClick={toggleChatbot}
        className={`fixed bottom-4 right-0 z-50 cursor-pointer p-3 rounded-full bg-transparent transition-transform duration-300 ${
          isOpen
            ? "translate-x-[calc(100%-130px)] translate-y-[calc(100%-220px)]"
            : ""
        }`}
      >
        <Beatrix />
      </div>

      {/* Chatbot UI */}
      <div
        className={`fixed bottom-4 right-4 z-40 bg-white dark:bg-indigo-100 rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-[120%]"
        } ${
          isFullScreen ? "w-[90vw] h-[80vh]" : "md:w-[25vw] w-[85vw] h-[60vh]"
        }`}
      >
        {/* Header with Fullscreen Toggle */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-white font-bold text-xl">Plan with Beatrix</h2>
          <div className="flex gap-2">
            <button
              onClick={toggleFullScreen}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
            <button
              onClick={toggleChatbot}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-4">{chatbotText}</div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <MessageComponent message={message} />
            </div>
          ))}
        </div>

        {/* Input Field */}
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
