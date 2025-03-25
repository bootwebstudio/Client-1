import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Home from "./pages/Home";
import Form from "./pages/Form";
import Thanks from "./pages/Thanks";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
