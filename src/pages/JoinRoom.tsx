import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "@/socket";

const JoinRoom = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");

  useEffect(() => {
    socket.on("room_ready", (data) => {
      navigate(`/room/${data.room.code}`);
    });

    return () => {
      socket.off("room_ready");
    };
  }, [navigate]);

  const handleJoinRoom = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/signin");
      return;
    }
    if (!roomCode.trim()) return;

    const userId = JSON.parse(atob(token.split(".")[1])).id;
    socket.emit("join_room", { code: roomCode, userId });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] via-[#FDF3E5] to-[#E9F4F4] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-amber-200 p-8 text-center">
        <h1 className="text-4xl font-bold text-amber-700 mb-8">Join Game</h1>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-amber-800 block mb-2">
              Enter Room Code
            </label>
            <input
              placeholder="123456"
              onChange={(e) => setRoomCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
            />
          </div>
          <button
            onClick={handleJoinRoom}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all transform hover:scale-105 shadow-md"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;