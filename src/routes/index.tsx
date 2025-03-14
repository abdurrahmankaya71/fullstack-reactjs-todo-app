import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import RootLayout from "../pages/Layout";
import ProtectedRoute from "../components/auth/ProtectedRoutes";
import Profile from "../pages/Profile";
import ErrorHandler from "../components/errors/ErrorHandler";

//* local storage
const userDataString = localStorage.getItem("loggedInUser");
const userData = userDataString ? JSON.parse(userDataString) : null;

const isLoggedIn = userData === null ? false : true;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute isAllowed={isLoggedIn} redirectPath="/login">
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute isAllowed={isLoggedIn} redirectPath="/login">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/">
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/">
              <RegisterPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  )
);

export default router;
