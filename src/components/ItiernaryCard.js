import { useState } from "react";
import { saveAs } from "file-saver";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import Swal from "sweetalert2";

export const PostCard = ({ post, toggle, setToggle }) => {
  const { title, days, id } = post;
  const [showFullItinerary, setShowFullItinerary] = useState(false);

  const handleShare = (e) => {
    e.stopPropagation();
    const itineraryText = `Title: ${title}\n\n${days.replace(/\*/g, "\n")}`;
    const blob = new Blob([itineraryText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${title.replace(/\s+/g, "_")}_Itinerary.txt`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const document = doc(db, "posts", id);
      await deleteDoc(document);
      Swal.fire({
              title: 'Itinerary Deleted Successfully',
              icon: 'success',
              confirmButtonText: 'Cool!'
            })
            setToggle(!toggle);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const toggleItinerary = () => {
    setShowFullItinerary(!showFullItinerary);
  };

  return (
    <div className="card p-4 border bg-blue-400 rounded-md shadow-lg hover:shadow-xl transition">
      <div className="flex justify-between items-center p-4 rounded-lg">
        <button
          className="text-blue-950 font-semibold rounded-lg bg-Bluee shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
          onClick={toggleItinerary}
        >
          <h1 className="text-xl font-bold">{title}</h1>
        </button>
        
        <button
          onClick={handleDelete}
          className="p-2 rounded-full  transition duration-300 ease-in-out z-50 relative cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" className="bi bi-trash text-red-500" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>
        </button>
      </div>

      {showFullItinerary && days && (
        <div className="mt-4">
          {days.split("*").map((line, index) => {
            const cleanedLine = line.replace(/\n/g, "").trim();
            const isHeader = [
              "Day", "Theme", "Overall Vibe", "##", "Morning", 
              "Afternoon", "Evening", "Optional", "Notes"
            ].some(header => cleanedLine.startsWith(header));

            return (
              <div key={index}>
                {isHeader && <br />}
                <p className={`text-gray-900 text-md font-serif ${isHeader ? 'font-bold' : ''}`}>
                  {cleanedLine}
                </p>
              </div>
            );
          })}
          
          <div className="flex justify-between items-center p-4 rounded-lg">
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-white dark:bg-indigo-100 text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              Download Itinerary
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
