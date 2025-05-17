import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

const NoticeDetailsPage = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [replyEdit, setReplyEdit] = useState("");

  useEffect(() => {
    const fetchNotice = async () => {
      const res = await API.get(`/notices/${id}`);
      setNotice(res.data);
      setReplyEdit(res.data.draftReply || "");
    };
    fetchNotice();
  }, [id]);

  const handleSaveReply = async () => {
    await API.put(`/notices/${id}/reply`, { draftReply: replyEdit });
    alert("Reply updated.");
  };

  if (!notice) return <p className="p-4">Loading notice...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">📝 Notice Analysis</h1>

      <div className="bg-gray-50 p-4 rounded shadow">
        <p>
          <strong>Type:</strong> {notice.analysis?.typeOfNotice}
        </p>
        <p>
          <strong>PAN:</strong> {notice.analysis?.panNumber}
        </p>
        <p>
          <strong>Assessment Year:</strong> {notice.analysis?.assessmentYear}
        </p>
        <p>
          <strong>Date:</strong> {notice.analysis?.noticeDate}
        </p>
        <p>
          <strong>Deadline:</strong> {notice.analysis?.deadline}
        </p>
        <p>
          <strong>Reason:</strong> {notice.analysis?.reasonForNotice}
        </p>
        <p>
          <strong>Action:</strong> {notice.analysis?.requiredAction}
        </p>
        <p>
          <strong>Issued By:</strong> {notice.analysis?.issuingAuthority}
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-lg">📄 Summary</h3>
        <p className="whitespace-pre-wrap">{notice.summary}</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg">✅ Suggested Actions</h3>
        <p className="whitespace-pre-wrap">{notice.suggestedActions}</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg">✍️ Draft Reply</h3>
        <textarea
          className="w-full border p-2 rounded h-60"
          value={replyEdit}
          onChange={(e) => setReplyEdit(e.target.value)}
        ></textarea>
        <button
          onClick={handleSaveReply}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Reply
        </button>
      </div>
    </div>
  );
};

export default NoticeDetailsPage;
