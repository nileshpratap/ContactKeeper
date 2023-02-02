import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

import Home from "./components/pages/Home";
import About from "./components/pages/About";

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
          </Routes>
        </div>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
