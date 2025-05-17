import React, { useState } from "react";
import { uploadReply } from "../api/notices";

const ReplyEditor = ({ noticeId, onReplySubmitted }) => {
  const [replyText, setReplyText] = useState("");

  const handleChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await uploadReply(noticeId, replyText);
      setReplyText("");
      onReplySubmitted();
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  return (
    <div className="reply-editor">
      <h3>Draft Your Reply</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={replyText}
          onChange={handleChange}
          placeholder="Type your reply here..."
          rows="5"
          required
        />
        <button type="submit">Submit Reply</button>
      </form>
    </div>
  );
};

export default ReplyEditor;
