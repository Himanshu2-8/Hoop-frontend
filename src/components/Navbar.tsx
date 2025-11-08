import { motion } from "framer-motion";
import type { ReactElement, ReactNode } from "react";
import { Volleyball, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] via-[#FDF3E5] to-[#FFF8E7]">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link
            to={token ? "/dashboard" : "/"}
            className="flex items-center space-x-2"
          >
            <Volleyball className="text-amber-500 drop-shadow-sm" size={32} />
            <span className="text-2xl font-bold text-amber-600">Hoop</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/profile"
              className="text-amber-500 hover:text-amber-600 font-medium transition"
            >
              Profile
            </Link>

            {token ? (
              <>
                <span className="text-gray-700 font-semibold">
                  Hi, {userName}
                </span>

                <Link to="/profile">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-white font-semibold shadow hover:bg-amber-600 transition-all"
                  >
                    Dashboard
                  </motion.button>
                </Link>

                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-xl border border-amber-500 text-amber-600 font-semibold hover:bg-amber-50 transition-all"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <Link to="/signin">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-white font-semibold shadow hover:bg-amber-600 transition-all"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-amber-600"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col items-center py-4 space-y-4 bg-[#FFF8E7]/90 border-t border-amber-100 shadow-sm backdrop-blur-sm"
          >
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="text-amber-500 hover:text-amber-600 font-medium"
            >
              Profile
            </Link>

            {token ? (
              <>
                <span className="text-gray-700 font-semibold">
                  Hi, {userName}
                </span>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <span className="block px-4 py-2 rounded-lg bg-amber-500 text-white font-semibold shadow hover:bg-amber-600">
                    Dashboard
                  </span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block px-4 py-2 rounded-lg border border-amber-500 text-amber-600 font-semibold hover:bg-amber-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                <span className="block px-4 py-2 rounded-lg bg-amber-500 text-white font-semibold shadow hover:bg-amber-600">
                  Sign In
                </span>
              </Link>
            )}
          </motion.div>
        )}
      </motion.header>
      <main className="max-w-7xl mx-auto px-6 pt-24">{children}</main>
    </div>
  );
}