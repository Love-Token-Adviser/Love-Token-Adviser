import { createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  SignupPage,
  LoginPage,
  RecommendationPage,
  CartPage,
} from "@/pages";
import Layout from "./Layout";
import { unLoginLoader, loginLoader } from "./loader";

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
      {
        path: "/recommendation",
        element: <RecommendationPage />,
        loader: loginLoader,
      },
      {
        path: "/cart",
        element: <CartPage />,
        loader: loginLoader,
      },
    ],
  },
]);

export default router;
