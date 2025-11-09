import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async() => {
    const res = await axios.post("http://localhost:3000/signin", { email, password })
    if(res.status===200){
      console.log("Signin successful");
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    }
    else{
      console.error("Signin failed", res);
      alert("Signin failed");
      navigate("/signin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8E7] via-[#FDF3E5] to-[#E9F4F4] p-6">
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-10 w-full max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-amber-600 mb-6">
          Signin
        </h1>
        <p className="text-gray-600 mb-8">
          Join <span className="font-bold text-amber-600">Hoop</span> and connect with players, matches, and teams near you.
        </p>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/70 focus:border-amber-500 transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/70 focus:border-amber-500 transition-all"
            />
          </div>

          <button
            type="button"
            onClick={handleSignup}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all transform hover:scale-105 shadow-md"
          >
            Sign In
          </button>
        </div>

        <p className="text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-amber-600 hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
