import { io } from "socket.io-client";

const socket=io("https://hoop-backend.onrender.com/",{
    withCredentials:true
})

export default socket;