import React, { useEffect, useState } from "react";
import { fetchNotices } from "../api/notices";

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNotices = async () => {
      try {
        const data = await fetchNotices();
        setNotices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getNotices();
  }, []);

  if (loading) {
    return <div>Loading notices...</div>;
  }

  if (error) {
    return <div>Error fetching notices: {error}</div>;
  }

  return (
    <div>
      <h2>Notice List</h2>
      <ul>
        {notices.map((notice) => (
          <li key={notice._id}>
            <a href={`/notices/${notice._id}`}>{notice.originalFilename}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeList;
