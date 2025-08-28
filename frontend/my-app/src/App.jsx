import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Home />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
