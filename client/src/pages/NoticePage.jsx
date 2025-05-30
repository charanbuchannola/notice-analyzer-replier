import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoticeById } from "../api/notices";
import NoticeDetail from "../components/NoticeDetail";

const NoticePage = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const fetchedNotice = await getNoticeById(id);
        setNotice(fetchedNotice);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {notice && (
        <>
          <NoticeDetail notice={notice} />
        </>
      )}
    </div>
  );
};

export default NoticePage;
