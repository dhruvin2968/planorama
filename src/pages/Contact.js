import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import Swal from "sweetalert2";
export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      console.log("User not logged in");
      return;
    }

    try {
      await addDoc(collection(db, "contact"), {
        name: form.name,
        email: form.email,
        message: form.message,
        author: {
          name: auth.currentUser.displayName || "Anonymous",
          id: auth.currentUser.uid,
        },
        timestamp: serverTimestamp(),
        
      });
      Swal.fire({
                title: "Message Sent Successfully",
                icon: "success",
                confirmButtonText: "Cool!",
              });

      setForm({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      Swal.fire({
                title: "Please Try Again.",
                icon: "error",
                confirmButtonText: "Okay",
              });
    }
  };

  useEffect(() => {
    document.title = `Contact - Planorama`;
  }, []);



  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/contact-bg.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 p-8 md:p-12 rounded-2xl shadow-lg max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Get in Touch
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Have a question or want to plan your next trip? Contact us now!
        </p>
        <div className="flex flex-col md:flex-row md:gap-6 mb-6">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail size={20} /> <span>support@planorama.com</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Phone size={20} /> <span>+91 8291619774</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <MapPin size={20} /> <span>Mumbai, India</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg w-full"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg w-full h-32"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              Send Message
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};
