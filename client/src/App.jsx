import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NoticePage from "./pages/NoticePage";
import NoticeUpload from "./components/NoticeUpload";
import NoticeList from "./components/NoticeList";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-700 text-white py-6 shadow">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold tracking-tight">Notice Analyzer</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notices" element={<NoticeList />} />
              <Route path="/notices/upload" element={<NoticeUpload />} />
              <Route path="/notices/:id" element={<NoticePage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;