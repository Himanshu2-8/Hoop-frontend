import { createBrowserRouter } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Navbar from "./components/Navbar";
import { RouterProvider } from "react-router-dom";
import Home from "./components/Home";

export default function App() {
  const router = createBrowserRouter([
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
  ]);
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}
