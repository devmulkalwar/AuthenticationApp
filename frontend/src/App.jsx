import React from "react";

import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, Bounce } from "react-toastify"; // Import Bounce transition
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from "./contexts/GlobalContext";
function App() {
  return (
    <ContextProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-grow">
          <Outlet />
        </main>
        <Footer />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce} // Pass Bounce correctly as a prop
        />
      </div>
    </ContextProvider>
  );
}

export default App;
