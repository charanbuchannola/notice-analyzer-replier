const express = require("express");

const noticeController = require("../controllers/noticeController");
const router = express.Router();
const { upload } = require("../services/multer.service");

router.post("/upload", upload, noticeController.uploadNotice);
router.get("/", noticeController.getNotices);
router.get("/:id", noticeController.getNoticeById);
router.put("/:id/reply", noticeController.updateNoticeReply);

module.exports = router;
