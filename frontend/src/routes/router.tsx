import { createBrowserRouter } from "react-router-dom";
import { HomePage, SignupPage, LoginPage } from "@/pages";
import Layout from "./Layout";
import { unLoginLoader } from "./loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
        loader: unLoginLoader,
      },
      {
        path: "/login",
        element: <LoginPage />,
        loader: unLoginLoader,
      },
    ],
  },
]);

export default router;
