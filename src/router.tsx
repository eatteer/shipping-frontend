import { Home } from "@/pages/home/home";
import { SignIn } from "@/pages/sign-in/sign-in";
import { SignUp } from "@/pages/sign-up/sign-up";
import { LoggedInRedirection } from "@/security/logged-in-redirection";
import { ProtectedRoute } from "@/security/protected-route";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "auth",
    element: <LoggedInRedirection />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
]);
