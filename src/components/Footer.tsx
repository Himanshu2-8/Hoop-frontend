import { Link } from "react-router-dom";
import { Volleyball } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#FFF8E7] via-[#FDF3E5] to-[#E9F4F4] border-t border-amber-100 shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        
        <div className="flex items-center gap-3 mb-6 md:mb-0">
          <Volleyball className="text-amber-500" size={30} />
          <span className="text-2xl font-bold text-amber-600">Hoop</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-gray-700 font-medium mb-6 md:mb-0">
          <Link
            to="/dashboard"
            className="hover:text-amber-600 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="hover:text-amber-600 transition-colors"
          >
            Profile
          </Link>
          <Link
            to="/community"
            className="hover:text-amber-600 transition-colors"
          >
            Community
          </Link>
          <Link
            to="/about"
            className="hover:text-amber-600 transition-colors"
          >
            About
          </Link>
        </div>

        <div className="flex justify-center gap-4 text-amber-600">
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-amber-700 transition-transform transform hover:scale-110"
          >
            <i className="ri-instagram-line text-2xl"></i>
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-amber-700 transition-transform transform hover:scale-110"
          >
            <i className="ri-twitter-x-line text-2xl"></i>
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-amber-700 transition-transform transform hover:scale-110"
          >
            <i className="ri-linkedin-line text-2xl"></i>
          </a>
        </div>
      </div>

      <div className="text-center text-gray-600 text-sm border-t border-amber-100 py-4">
        © {new Date().getFullYear()} <span className="text-amber-600 font-semibold">Hoop</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;