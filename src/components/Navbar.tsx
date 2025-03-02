import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="container flex flex-col justify-center items-center sm:flex-row">
                <li>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-400 block py-2 px-4"
                                : "text-white block py-2 px-4"
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-400 block py-2 px-4"
                                : "text-white block py-2 px-4"
                        }
                    >
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-400 block py-2 px-4"
                                : "text-white block py-2 px-4"
                        }
                    >
                        Register
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
