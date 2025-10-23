import { createBrowserRouter, Outlet } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import CreateGame from "./pages/CreateGame";
import JoinRoom from "./pages/JoinRoom";
import GameRoom from "./pages/GameRoom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signin",
          element: <Signin />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/create",
          element: <CreateGame />,
        },
        {
          path: "/join",
          element: <JoinRoom />,
        },
        {
          path: "/room/:code",
          element: <GameRoom />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
