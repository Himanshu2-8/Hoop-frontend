import { Trophy } from "lucide-react";
import { motion } from "motion/react";
import type { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(): ReactElement {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  let userName = null;

  if (token) {
    try {
      userName = JSON.parse(atob(token.split(".")[1])).name;
    } catch (e) {
      console.error("Error parsing token:", e);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-6 px-8 bg-white/80 backdrop-blur-sm shadow-md"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to={token ? "/dashboard" : "/"} className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
            Hoop
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <span className="text-gray-700 font-semibold">Welcome, {userName}</span>
              <Link to="/profile">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-white/80 backdrop-blur-sm text-teal-700 rounded-lg font-semibold hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Profile
                </motion.button>
              </Link>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <Link to="/signin">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-white/80 backdrop-blur-sm text-teal-700 rounded-lg font-semibold hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Sign In
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}
