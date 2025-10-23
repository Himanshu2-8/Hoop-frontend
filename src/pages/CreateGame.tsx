import { useEffect, useState } from "react";
import socket from "@/socket";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateGame = () => {
  const [roomCode, setRoomCode] = useState("");
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
    socket.on("waiting", () => {
      console.log("Waiting for another player...");
    });

    socket.on("roomReady", (data) => {
      console.log("Room ready:", data);
      navigate(`/room/${data.room.code}`);
    });

    socket.on("error", (err) => {
      alert(err.message || "Something went wrong");
    });

    return () => {
      socket.off("waiting");
      socket.off("roomReady");
      socket.off("error");
    };
  }, [navigate]);

  useEffect(() => {
    if (!token || !userId) {
      navigate("/signin");
    }
  }, [token, userId, navigate]);

  if (!token || !userId) {
    return null;
  }

  const handleRoomCodeLogin = async () => {
    try {
      const res = await axios.get("http://localhost:4000/create", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const code = res.data.code;
      setRoomCode(code);
      socket.emit("join_room", { code, userId });
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Failed to create room. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={handleRoomCodeLogin}>Create Room</button>
      {roomCode && <p>Room Code: {roomCode}</p>}
    </div>
  );
};

export default CreateGame;
