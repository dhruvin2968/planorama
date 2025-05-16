import { useEffect, useRef, useState } from "react";
import { PostCard } from "../components/ItiernaryCard";
import { SkeletonCard } from "../components/SkeletonCard";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { auth } from "../firebase/config";

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
    <>
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
          ? new Array(5).fill(false).map((_, index) => <SkeletonCard key={index} />)
          : posts.map((post) => <PostCard key={post.id} post={post} toggle={toggle} setToggle={setToggle} />)}
        {!loading && posts.length === 0 && (
          <p className="text-center col-span-full text-gray-600">
            No itineraries created by you yet.
          </p>
        )}
      </section>
    </>
  );
};
