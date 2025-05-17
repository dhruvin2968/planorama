import { useEffect } from "react";
import Beach from "../components/Beach";
import { Chatbot } from "../components/ChatBot";
import { motion } from "framer-motion";
import AboutComponent from "../components/About";
import { InfiniteScroller } from "../components/InfiniteScroller";
import { CustomerSupport } from "../components/CustomerSupport";
import { Camera } from "lucide-react";
export const Home = () => {
  useEffect(() => {
    document.title = `Planorama -  The Adventure Atlas`;
  }, []);

  const handleScrollToThemeSelector = () => {
    const element = document.getElementById("theme-selector");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start", // Scroll to the top of the element
      });
    }
  };

  return (
    <>
      <div className="min-h-screen ">
        <Beach />
        {/* Hero Section */}
        <main className="">
          <div className="absolute md:bottom-0  md:top-0 top-4  inset-0 flex flex-col justify-center items-left text-left text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="md:text-7xl text-5xl text-white font-bold  md:mb-4  md:pl-8 pl-4  ">
                Explore the
              </h1>
              <h1 className="md:text-7xl text-5xl  text-white font-bold md:mb-4   md:pl-8 pl-4 ">
                world with us
              </h1>

              <h4 className="md:text-2xl text-xl text-black md:pl-8 pl-4 ">
                Planorama, the ultimate travel planner, lets you create
              </h4>
              <h4 className="md:text-2xl text-xl text-black md:pl-8 pl-4 ">
                unforgettable experiences with ease. Whether you're
              </h4>
              <h4 className="md:text-2xl text-xl text-black md:pl-8 pl-4 ">
                a seasoned explorer or a first-time traveler.
              </h4>
            </motion.div>
            <div className="flex">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className=" rounded-xl text-center flex flex-col items-center"
              >
                <button
                  onClick={handleScrollToThemeSelector}
                  className="md:mt-4 mt-1 md:ml-8 ml-2 mb-24 md:mb-0 max-w-52  bg-blue-950   text-white font-semibold rounded-2xl shadow-lg transform transition duration-300 hover:bg-black"
                >
                  <span className="font-medium md:text-xl text-lg">
                    Get Started
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 74 74"
                    height="34"
                    width="34"
                    className="inline ml-2"
                  >
                    <circle
                      strokeWidth="3"
                      stroke="white"
                      r="30.5"
                      cy="37"
                      cx="37"
                    ></circle>
                    <path
                      fill="white"
                      d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                    ></path>
                  </svg>
                </button>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
      <div className="theme-selector">
        <AboutComponent />
        <motion.div
          className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-extrabold bg-indigo-600 dark:bg-white from-indigo-600 via-indigo-800 to-blue-500 bg-clip-text text-transparent py-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Camera className="text-indigo-800 dark:text-white" size={36} />
          Planorama Signature Moments
        </motion.div>
        <InfiniteScroller />
      </div>
      <CustomerSupport />
      <div>
        <div>
          <Chatbot />
        </div>
      </div>
    </>
  );
};
