import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/home";
import { AppRoutes } from "../constants/routes";
import { LoginPage } from "../pages/login";
import { ConfigureProviders } from "../providers";
import { Layout } from "../layout";
import { getLastPartOfString } from "../utils";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ConfigureProviders />,
    children: [
      {
        path: "pages",
        element: <Layout />,
        children: [
          {
            path: getLastPartOfString(AppRoutes.HOME),
            element: <HomePage />,
          },
        ],
      },
      {
        path: AppRoutes.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
]);
