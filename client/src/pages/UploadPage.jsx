import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF.");
    const formData = new FormData();
    formData.append("noticeFile", file);
    formData.append("isScanned", isScanned);

    try {
      setLoading(true);
      const res = await API.post("/notices/upload", formData);
      const noticeId = res.data.notice._id;
      navigate(`/notice/${noticeId}`);
    } catch (err) {
      alert("Upload failed. Check console.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 space-y-4">
      <h2 className="text-2xl font-bold">📤 Upload Tax Notice</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <label className="block">
        <input
          type="checkbox"
          className="mr-2"
          checked={isScanned}
          onChange={() => setIsScanned(!isScanned)}
        />
        Is Scanned?
      </label>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload & Analyze"}
      </button>
    </div>
  );
};

export default UploadPage;
