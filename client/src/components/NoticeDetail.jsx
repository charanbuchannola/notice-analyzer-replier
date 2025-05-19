import React from "react";

const InfoBlock = ({ title, children, color = "blue" }) => (
  <div className="mb-5">
    <h3
      className={`text-base font-semibold text-${color}-700 mb-2 tracking-wide`}
    >
      {title}
    </h3>
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      {children}
    </div>
  </div>
);

const AnalysisGrid = ({ analysis }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
    <div>
      <span className="font-medium text-gray-700">Type:</span>{" "}
      {analysis?.typeOfNotice || <span className="text-gray-400">-</span>}
    </div>
    <div>
      <span className="font-medium text-gray-700">PAN:</span>{" "}
      {analysis?.panNumber || <span className="text-gray-400">-</span>}
    </div>
    <div>
      <span className="font-medium text-gray-700">Notice Date:</span>{" "}
      {analysis?.noticeDate || <span className="text-gray-400">-</span>}
    </div>
    <div>
      <span className="font-medium text-gray-700">Deadline:</span>{" "}
      {analysis?.deadline || <span className="text-gray-400">-</span>}
    </div>
    <div>
      <span className="font-medium text-gray-700">Assessment Year:</span>{" "}
      {analysis?.assessmentYear || <span className="text-gray-400">-</span>}
    </div>
    <div className="sm:col-span-2">
      <span className="font-medium text-gray-700">Reason:</span>{" "}
      {analysis?.reasonForNotice || <span className="text-gray-400">-</span>}
    </div>
    <div className="sm:col-span-2">
      <span className="font-medium text-gray-700">Required Action:</span>{" "}
      {analysis?.requiredAction || <span className="text-gray-400">-</span>}
    </div>
    <div className="sm:col-span-2">
      <span className="font-medium text-gray-700">Issuing Authority:</span>{" "}
      {analysis?.issuingAuthority || <span className="text-gray-400">-</span>}
    </div>
  </div>
);

const CAResponseLetter = ({ analysis }) => (
  <div className="bg-gradient-to-b from-red-50 to-white border-l-4 border-red-400 shadow-xl rounded-2xl p-6 my-8 mx-auto max-w-2xl">
    <h3 className="text-lg font-bold text-red-700 mb-2 text-center tracking-wide">
      Professional Response (CA Letter)
    </h3>
    <div className="text-gray-700 text-sm mb-4 text-center">
      <span className="font-semibold">Date:</span>{" "}
      {analysis?.noticeDate || "[Date]"}
    </div>
    <div className="mb-2">
      <span className="font-semibold">To:</span>
      <br />
      {analysis?.issuingAuthority || "The Assessment Unit"}
      <br />
      Income Tax Department, Government of India
    </div>
    <div className="mb-3 font-semibold">
      Subject:{" "}
      <span className="font-normal">
        Response to Demand Notice under Section 156 for AY{" "}
        {analysis?.assessmentYear || "[Assessment Year]"} – PAN:{" "}
        {analysis?.panNumber || "[PAN]"}
      </span>
    </div>
    <div className="mb-3">Dear Sir/Madam,</div>
    <div className="mb-3">
      We acknowledge receipt of Demand Notice (DIN:{" "}
      <span className="font-mono">{analysis?.din || "[DIN]"}</span>) dated{" "}
      {analysis?.noticeDate || "[Notice Date]"} issued to{" "}
      <span className="font-semibold">
        {analysis?.taxpayerName || "[Taxpayer Name]"}
      </span>{" "}
      for AY {analysis?.assessmentYear || "[Assessment Year]"}, demanding{" "}
      <span className="font-semibold">
        ₹{analysis?.demandAmount || "[Amount]"}
      </span>
      .
    </div>
    <div className="mb-3">
      <table className="w-full text-xs border border-gray-200 rounded">
        <tbody>
          <tr>
            <td className="font-semibold pr-2 py-1">Name:</td>
            <td>{analysis?.taxpayerName || "[Taxpayer Name]"}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-2 py-1">PAN:</td>
            <td>{analysis?.panNumber || "[PAN]"}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-2 py-1">Status:</td>
            <td>{analysis?.status || "[Status]"}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-2 py-1 align-top">Address:</td>
            <td className="whitespace-pre-line">
              {analysis?.address || "[Address]"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="mb-3">
      If the demand is agreed, payment will be made within the stipulated time
      and proof submitted. If not agreed, an appeal will be filed with NFAC in
      Form 35.
    </div>
    <div className="mb-3">Kindly acknowledge receipt.</div>
    <div className="mt-6">
      Yours faithfully,
      <br />
      <span className="font-semibold">For [Firm Name]</span>
      <br />
      [CA Name], Chartered Accountant
      <br />
      M. No.: [XXXXXXXX]
      <br />
      [Phone] | [Email]
    </div>
  </div>
);

const NoticeDetail = ({ notice }) => {
  if (!notice) return <div>No notice data available.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* Notice Details */}
      <div className="bg-gray-50 rounded-xl shadow p-6 border border-blue-100 mb-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center tracking-tight">
          {notice.originalFilename}
        </h2>
        <InfoBlock title="Summary" color="blue">
          <p className="whitespace-pre-wrap text-gray-800 text-base">
            {notice.summary}
          </p>
        </InfoBlock>
        <InfoBlock title="Suggested Actions" color="green">
          <ul className="list-disc pl-5 text-green-900">
            {notice.suggestedActions ? (
              notice.suggestedActions.split("\n").map((action, idx) => (
                <li key={idx} className="mb-1">
                  {action}
                </li>
              ))
            ) : (
              <li>No actions suggested.</li>
            )}
          </ul>
        </InfoBlock>
        <InfoBlock title="Cleaned Text" color="purple">
          <pre className="whitespace-pre-wrap max-h-40 overflow-auto text-gray-700 text-sm bg-purple-50 rounded p-3 border border-purple-100">
            {notice.cleanedText}
          </pre>
        </InfoBlock>
        <InfoBlock title="Analysis" color="indigo">
          <AnalysisGrid analysis={notice.analysis} />
        </InfoBlock>
      </div>
      {/* CA Letter Below */}
      <CAResponseLetter analysis={notice.analysis} />
    </div>
  );
};

export default NoticeDetail;
