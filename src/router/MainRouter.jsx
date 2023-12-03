import { createBrowserRouter } from "react-router-dom";
import LogIn from "../pages/LogIn/LogIn";
import UserHome from "../pages/UserHome/UserHome";
import Dashboard from "../pages/UserHome/Dashboard/Dashboard";
import Account from "../pages/UserHome/Account/Account";
import Syllabus from "../pages/UserHome/Syllabus/Syllabus";
import ProtectedRoute from "../pages/UserHome/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <UserHome />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "syllabus",
        element: <Syllabus />,
      },
    ],
  },
]);

export default router;
