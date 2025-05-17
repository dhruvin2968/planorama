import { useEffect } from "react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  useEffect(() => {
    document.title = `Page Not Found - Planorama`;
  });

  return (
    <main>
      <section className="flex min-h-screen flex-col justify-center px-2">
        <div className="flex flex-col items-center my-4">
          <p className="text-7xl text-gray-700 font-bold my-10 ">404, Oops!</p>
        </div>
        <div className="flex items-center justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transform transition duration-300"
          >
            Back To Planorama
          </Link>
        </div>
      </section>
    </main>
  );
};
