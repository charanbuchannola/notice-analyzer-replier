import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoticeById } from "../api/notices";

const NoticeDetail = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await getNoticeById(id);
        setNotice(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="notice-detail">
      <h2>{notice.originalFilename}</h2>
      <p>
        <strong>Uploaded At:</strong>{" "}
        {new Date(notice.uploadedAt).toLocaleString()}
      </p>
      <p>
        <strong>Cloudinary URL:</strong>{" "}
        <a
          href={notice.cloudinaryUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Document
        </a>
      </p>
      <p>
        <strong>Extracted Text:</strong> {notice.extractedText}
      </p>
      <p>
        <strong>Cleaned Text:</strong> {notice.cleanedText}
      </p>
      <p>
        <strong>Analysis:</strong> {JSON.stringify(notice.analysis, null, 2)}
      </p>
      <p>
        <strong>Summary:</strong> {notice.summary}
      </p>
      <p>
        <strong>Suggested Actions:</strong> {notice.suggestedActions}
      </p>
      <p>
        <strong>Draft Reply:</strong> {notice.draftReply}
      </p>
    </div>
  );
};

export default NoticeDetail;
