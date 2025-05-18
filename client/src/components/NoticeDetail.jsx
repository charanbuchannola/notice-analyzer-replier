import React from "react";

const NoticeDetail = ({ notice }) => {
  if (!notice) return <div>No notice data available.</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        {notice.originalFilename}
      </h2>
      <div className="mb-4 flex flex-wrap gap-4">
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium">
          Status: {notice.status}
        </span>
        <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm font-medium">
          Uploaded: {new Date(notice.uploadedAt).toLocaleString()}
        </span>
        <a
          href={notice.cloudinaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-medium hover:underline"
        >
          View PDF
        </a>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Summary</h3>
        <p className="bg-gray-50 p-3 rounded">{notice.summary}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Suggested Actions
        </h3>
        <pre className="bg-gray-50 p-3 rounded whitespace-pre-wrap">
          {notice.suggestedActions}
        </pre>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Draft Reply
        </h3>
        <pre className="bg-gray-50 p-3 rounded whitespace-pre-wrap">
          {notice.draftReply}
        </pre>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Extracted Text
        </h3>
        <pre className="bg-gray-50 p-3 rounded whitespace-pre-wrap max-h-48 overflow-auto">
          {notice.extractedText}
        </pre>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Cleaned Text
        </h3>
        <pre className="bg-gray-50 p-3 rounded whitespace-pre-wrap max-h-48 overflow-auto">
          {notice.cleanedText}
        </pre>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <span className="font-medium">Type:</span>{" "}
            {notice.analysis?.typeOfNotice}
          </div>
          <div>
            <span className="font-medium">PAN:</span>{" "}
            {notice.analysis?.panNumber}
          </div>
          <div>
            <span className="font-medium">Notice Date:</span>{" "}
            {notice.analysis?.noticeDate}
          </div>
          <div>
            <span className="font-medium">Deadline:</span>{" "}
            {notice.analysis?.deadline}
          </div>
          <div>
            <span className="font-medium">Assessment Year:</span>{" "}
            {notice.analysis?.assessmentYear}
          </div>
          <div>
            <span className="font-medium">Reason:</span>{" "}
            {notice.analysis?.reasonForNotice}
          </div>
          <div>
            <span className="font-medium">Required Action:</span>{" "}
            {notice.analysis?.requiredAction}
          </div>
          <div>
            <span className="font-medium">Issuing Authority:</span>{" "}
            {notice.analysis?.issuingAuthority}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
