import React, { useEffect, useState } from "react";
import { fetchNotices } from "../api/notices";
import { Link } from "react-router-dom";

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

  if (loading) return <div>Loading notices...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Uploaded Notices
      </h2>
      <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow">
        {notices.map((notice) => (
          <li key={notice._id} className="p-4 hover:bg-blue-50 transition">
            <Link
              to={`/notices/${notice._id}`}
              className="text-blue-700 font-semibold hover:underline"
            >
              {notice.originalFilename}
            </Link>
            <span className="ml-2 text-gray-500 text-sm">
              ({new Date(notice.uploadedAt).toLocaleDateString()})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeList;
