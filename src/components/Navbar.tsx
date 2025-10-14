import { Trophy } from "lucide-react";
import { motion } from "motion/react";
import type { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function Navbar(): ReactElement {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-6 px-8"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
            Hoop
          </span>
        </div>
        <Link to="/signin">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white/80 backdrop-blur-sm text-teal-700 rounded-lg font-semibold hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Sign In
          </motion.button>
        </Link>
      </div>
    </motion.header>
  );
}
