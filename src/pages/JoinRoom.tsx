import { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "@/socket";

const JoinRoom = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");

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

    socket.emit("join_room", { roomCode, userId });

    socket.on("room_ready", () => {
      navigate(`/room/${roomCode}`);
    });
  };

  return (
    <div>
      <input
        placeholder="Enter Room Code"
        onChange={(e) => {
          setRoomCode(e.target.value);
        }}
      ></input>
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default JoinRoom;

