import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/signin", {
        email,
        password,
      });
      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/create");
      }
    } catch (error) {
      alert("Sign-in failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
    </form>
  );
}
