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
    if (!roomCode.trim()) {
      return;
    }

    const userId = JSON.parse(atob(token.split(".")[1])).id;

    socket.emit("join_room", { code: roomCode, userId });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Join Game</h1>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-600 block mb-2">Enter Room Code</label>
            <input
              placeholder="123456"
              onChange={(e) => {
                setRoomCode(e.target.value);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button onClick={handleJoinRoom} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all transform hover:scale-105">
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;

