import { useEffect } from "react";
import socket from "@/socket";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateGame = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let userId = null;
  if (token) {
    try {
      userId = JSON.parse(atob(token.split(".")[1])).id;
    } catch (e) {
      console.error("Error parsing token:", e);
      localStorage.removeItem("token");
    }
  }

  useEffect(() => {
    if (!token || !userId) {
      navigate("/signin");
    }
  }, [token, userId, navigate]);

  const handleRoomCodeLogin = async () => {
    try {
      const res = await axios.get("https://hoop-backend.onrender.com/create", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const code = res.data.code;
      socket.emit("join_room", { code, userId });
      navigate(`/room/${code}`);
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Failed to create room. Please try again.");
    }
  };

  useEffect(() => {
    handleRoomCodeLogin();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] via-[#FDF3E5] to-[#E9F4F4] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-amber-200 p-8 text-center">
        <h1 className="text-4xl font-bold text-amber-700 mb-8">Creating Game...</h1>
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500 mx-auto"></div>
      </div>
    </div>
  );
};

export default CreateGame;
