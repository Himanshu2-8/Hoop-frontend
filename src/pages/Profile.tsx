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
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Profile</h1>
        <div className="text-left space-y-4">
          <div>
            <label className="text-sm font-bold text-gray-600">Name</label>
            <p className="text-lg text-gray-800">{user.name}</p>
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600">Email</label>
            <p className="text-lg text-gray-800">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600">Highest Score</label>
            <p className="text-lg text-gray-800">{user.highestScore}</p>
          </div>
        </div>
        <Link to="/dashboard">
          <button className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all transform hover:scale-105">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
