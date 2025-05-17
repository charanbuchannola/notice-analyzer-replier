import React, { useState } from "react";
import { uploadNotice } from "../api/notices";

const NoticeUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("noticeFile", file);

    try {
      const response = await uploadNotice(formData);
      setSuccess("Notice uploaded successfully!");
      setFile(null);
    } catch (err) {
      setError("Error uploading notice: " + err.message);
    }
  };

  return (
    <div>
      <h2>Upload Notice</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default NoticeUpload;
