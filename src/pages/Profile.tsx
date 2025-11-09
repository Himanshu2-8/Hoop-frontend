import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface User {
  name: string;
  email: string;
  highestScore: number;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUser({
          name: decodedToken.name,
          email: decodedToken.email,
          highestScore: decodedToken.highestScore || 0,
        });
      } catch (e) {
        console.error("Error parsing token:", e);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] via-[#FDF3E5] to-[#E9F4F4] flex items-center justify-center text-amber-700 text-2xl font-semibold">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] via-[#FDF3E5] to-[#E9F4F4] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-amber-200 p-8 text-center">
        <h1 className="text-4xl font-extrabold text-amber-700 mb-8">Your Profile</h1>

        <div className="text-left space-y-6">
          <div>
            <label className="text-sm font-semibold text-amber-800 block mb-1">Name</label>
            <p className="text-lg font-medium text-amber-800 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100">
              {user.name}
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-amber-800 block mb-1">Email</label>
            <p className="text-lg font-medium text-amber-800 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100">
              {user.email}
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-amber-800 block mb-1">
              Highest Score
            </label>
            <p className="text-lg font-medium text-amber-800 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100">
              {user.highestScore}
            </p>
          </div>
        </div>

        <Link to="/dashboard">
          <button className="mt-8 w-full bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all transform hover:scale-105 shadow-md">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
