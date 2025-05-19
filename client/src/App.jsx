import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NoticePage from "./pages/NoticePage";
import NoticeUpload from "./components/NoticeUpload";
import NoticeList from "./components/NoticeList";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow sticky top-0 z-20">
          <div className="container mx-auto px-4 flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-blue-700 tracking-tight">
                Notice Analyzer
              </span>
            </div>
            <nav className="flex gap-6">
              <a
                href="/"
                className="text-blue-700 hover:text-blue-900 font-medium"
              >
                Home
              </a>
            </nav>
          </div>
        </header>
        <main className="min-h-[80vh] bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notices" element={<NoticeList />} />
                <Route path="/notices/upload" element={<NoticeUpload />} />
                <Route path="/notices/:id" element={<NoticePage />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
