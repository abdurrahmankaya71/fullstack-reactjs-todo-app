import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import RootLayout from "../pages/Layout";
import PrivateRoute from "../components/auth/PrivateRoute";

//! temp
export const isLoggedIn = true;

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />}>
                <Route
                    index
                    element={
                        <PrivateRoute
                            isAllowed={isLoggedIn}
                            redirectPath="/login"
                        >
                            <HomePage />
                        </PrivateRoute>
                    }
                />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>
        </>
    )
);

export default router;
