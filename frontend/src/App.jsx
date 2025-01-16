import React from "react";

import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";


function App() {
  return (
   
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-grow">
          <Outlet />
        </main>
        <Footer />
      
      </div>
    
  );
}

export default App;