import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Toaster } from "react-hot-toast";
// import { useState } from "react";

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
  );
};

export default App;
