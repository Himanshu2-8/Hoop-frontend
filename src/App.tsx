import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./components/Home";
import CreateGame from "./pages/CreateGame";
import JoinRoom from "./pages/JoinRoom";
import GameRoom from "./pages/GameRoom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";

export default function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/signin", element: <Signin /> },
        { path: "/signup", element: <Signup /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/create", element: <CreateGame /> },
        { path: "/join", element: <JoinRoom /> },
        { path: "/room/:code", element: <GameRoom /> },
        { path: "/profile", element: <Profile /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
