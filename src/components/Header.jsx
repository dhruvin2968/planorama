import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import Swal from "sweetalert2";
import Logo from "./finallogo.png";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Menu, X, Compass, LogIn, LogOut } from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export const Header = () => {
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );
  const navigate = useNavigate();

  function handleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        setIsAuth(true);
        localStorage.setItem("isAuth", true);
        Swal.fire({
          title: "Logged In Successfully",
          icon: "success",
          confirmButtonText: "Cool!",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  }

  function handleLogout() {
    signOut(auth);
    setIsAuth(false);
    navigate("/");
    localStorage.setItem("isAuth", false);
    Swal.fire({
      title: "Logged Out Successfully!",
      icon: "success",
      confirmButtonText: "Okay",
    });
  }

  const navItems = [
    { path: "/", label: "Home", icon: Compass },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/faqs", label: "FAQs" },
    ...(isAuth ? [{ path: "/mydashboard", label: "Dashboard" }] : []),
  ];

  const navLinkClasses = (isActive) =>
    `relative px-4 py-2 text-md font-medium transition-colors duration-200
    ${
      isActive
        ? "<text-blue-5></text-blue-5>00"
        : "text-gray-700 dark:text-white hover:text-blue-600"
    }`;

  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 15 }}
      className="w-full relative top-0 z-50  bg-gradient-to-l from-indigo-100 via-indigo-200 to-indigo-100
         dark:bg-black dark:from-indigo-900 dark:via-gray-900  dark:to-black backdrop-blur-lg text-gray-800 dark:text-gray-200"
    >
      <nav className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.7 }}
                className="text-blue-600"
              >
                <img
                  src={Logo}
                  className="h-10 dark:bg-white/80 rounded-xl"
                  alt="PlanOrama Logo"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-800 bg-clip-text text-transparent dark:text-white">
                  Planorama
                </span>
                <span className="text-sm text-gray-800 dark:text-gray-300">
                  Explore. Dream. Discover.
                </span>
              </div>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-3">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => navLinkClasses(isActive)}
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {label}
                </motion.span>
                {location.pathname === path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-0.5 bg-blue-600 bottom-0"
                  />
                )}
              </NavLink>
            ))}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full  "
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isAuth ? handleLogout : handleLogin}
              className={`ml-4 px-6 py-2 rounded-full font-medium transition-colors duration-200
                ${
                  isAuth
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              <span className="flex items-center space-x-2">
                {isAuth ? <LogOut size={18} /> : <LogIn size={18} />}
                <span>{isAuth ? "Logout" : "Login"}</span>
              </span>
            </motion.button>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map(({ path, label }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg transition-colors duration-200
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white"
                          : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}

                <button
                  onClick={() => {
                    setDarkMode(!darkMode);
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg transition-colors duration-200 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    isAuth ? handleLogout() : handleLogin();
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium text-left transition-colors duration-200
                    ${
                      isAuth
                        ? "bg-red-50 text-red-600"
                        : "bg-blue-600 text-white"
                    }`}
                >
                  <span className="flex items-center space-x-2">
                    {isAuth ? <LogOut size={18} /> : <LogIn size={18} />}
                    <span>{isAuth ? "Logout" : "Login"}</span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};
