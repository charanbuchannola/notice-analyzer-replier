import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import NoticeDetailsPage from "./pages/NoticeDetailsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/notice/:id" element={<NoticeDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
