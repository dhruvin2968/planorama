import { useEffect, useRef, useState } from "react";
import { PostCard } from "../components/ItiernaryCard";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { auth } from "../firebase/config";
import {Loading}from "../components/Loading"
import { NavLink } from "react-router-dom";
export const UserDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [toggle,setToggle]=useState();
  const [loading, setLoading] = useState(true);
  const [isGrid, setIsGrid] = useState(false); 
  const userId = auth.currentUser?.uid;
  const postRef = useRef(collection(db, "posts"));
  useEffect(() => {
    document.title = `Dashboard - Planorama`;
  });
  useEffect(() => {
    async function getUserPosts() {
      if (!userId) return;

      setLoading(true);
      const q = query(postRef.current, where("author.id", "==", userId));
      const data = await getDocs(q);
      setPosts(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(false);
    }
    getUserPosts();
  }, [userId,toggle]);

  return (
    <div className="min-h-screen">
      <button
        onClick={() => setIsGrid((prev) => !prev)}
        className="m-2 p-2 bg-white rounded absolute right-5"
      >
         {
          isGrid ?<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-view-list" viewBox="0 0 16 16">
          <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2m0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14"/>
        </svg> :<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-view-stacked" viewBox="0 0 16 16">
          <path d="M3 0h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm0 8h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
        </svg>
        }
      </button>
      <section
        className={`p-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
          isGrid ? "grid" : ""
        }`}
      >
        {loading
          ? new Array(1).fill(false).map((_, index) => <Loading />)
          : posts.map((post) => <PostCard key={post.id} post={post} toggle={toggle} setToggle={setToggle} />)}
        {!loading && posts.length === 0 && (
          <p className="text-center col-span-full text-gray-600 dark:text-white">
            No itineraries created by you yet.
             <NavLink to="/itinerarygenerator" className="group inline-block">
    <p><button
      className="
        px-7 rounded-xl font-bold text-lg
        bg-transparent
        text-white shadow-md ml-5
        hover:from-indigo-600 hover:to-indigo-700
        hover:scale-105 active:scale-95
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-indigo-400
        dark:from-indigo-700 dark:to-indigo-900
        dark:text-gray-100
        dark:hover:from-indigo-800  dark:hover:to-indigo-950
      "
    >
      <span className="inline-flex items-center text-black dark:text-white gap-2">
        <svg
          className="w-5 h-5 text-black dark:text-white  group-hover:animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path
            d="M12 19V6M5 12l7-7 7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Generate Itinerary
      </span>
    </button></p> 
  </NavLink>

          </p>
         
        )}
      </section>
    </div>
  );
};
