import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NoticePage from "./pages/NoticePage";
import NoticeUpload from "./components/NoticeUpload";
import NoticeList from "./components/NoticeList";

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <h1>Notice Analyzer</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notices" element={<NoticeList />} />
            <Route path="/notices/upload" element={<NoticeUpload />} />
            <Route path="/notices/:id" element={<NoticePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
