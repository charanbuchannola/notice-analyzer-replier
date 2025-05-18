import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { uploadNotice } from "../api/notices";

const NoticeUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a PDF file to upload.");
      return;
    }
    setLoading(true);
    try {
      const response = await uploadNotice(file);
      setFile(null);
      fileInputRef.current.value = "";
      if (response.notice && response.notice._id) {
        navigate(`/notices/${response.notice._id}`);
      } else {
        setError("Upload succeeded but no notice ID returned.");
      }
    } catch (err) {
      // If backend sent a JSON error, show its message
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Error uploading notice: " + err.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Upload Tax Notice
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="block text-gray-700 font-medium mb-2">
            Select PDF Notice
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full text-gray-700 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          disabled={!file || loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default NoticeUpload;
