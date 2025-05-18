import axios from "axios";

const API_URL = "http://localhost:5001/api/notices";

export const fetchNotices = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching notices: " + error.message);
  }
};

export const uploadNotice = async (file) => {
  const formData = new FormData();
  formData.append("noticeFile", file);

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error uploading notice: " + error.message);
  }
};

export const getNoticeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching notice by ID: " + error.message);
  }
};

export const uploadReply = async (id, draftReply) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/reply`, { draftReply });
    return response.data;
  } catch (error) {
    throw new Error("Error uploading reply: " + error.message);
  }
};
