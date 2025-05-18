import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Welcome to the Notice Analyzer
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Your one-stop solution for managing tax notices efficiently.
      </p>
      <div className="space-x-4">
        <Link
          to="/notices"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          View Notices
        </Link>
        <Link
          to="/notices/upload"
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Upload Notice
        </Link>
      </div>
    </div>
  );
};

export default Home;
