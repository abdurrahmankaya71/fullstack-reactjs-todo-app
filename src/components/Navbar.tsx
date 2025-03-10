import { NavLink } from "react-router-dom";
import Button from "./ui/Button";

const Navbar = () => {
  //* local storage
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const isLoggedIn = userData !== null;

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    location.reload();
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-300"
            >
              Home
            </NavLink>
          </div>
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-white hover:text-yellow-400 transition duration-300 ${
                      isActive ? "text-yellow-400" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `text-white hover:text-yellow-400 transition duration-300 ${
                      isActive ? "text-yellow-400" : ""
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <span className="text-white">{userData.user.email}</span>
                <Button variant={"danger"} onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
