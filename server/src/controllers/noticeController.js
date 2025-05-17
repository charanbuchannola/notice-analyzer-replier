const Notice = require("../models/Notice");
const pdf = require("pdf-parse"); // For text-based PDFs
const {
  runGeminiQuery,
  fileToGenerativePart,
} = require("../services/geminiService");
const { uploadToCloudinary } = require("../config/cloudinary"); // Import Cloudinary uploader

// No longer need fs or path for local file management in this controller
// const fs = require('fs');
// const path = require('path');

exports.uploadNotice = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  // req.file.buffer contains the file data when using multer.memoryStorage()
  const fileBuffer = req.file.buffer;
  const originalFilename = req.file.originalname;

  try {
    // --- 0. Upload to Cloudinary FIRST ---
    // It's often better to ensure external storage succeeds before intensive processing
    const cloudinaryResult = await uploadToCloudinary(
      fileBuffer,
      originalFilename
    );

    if (!cloudinaryResult || !cloudinaryResult.secure_url) {
      throw new Error(
        "Cloudinary upload failed or did not return a secure URL."
      );
    }

    const notice = new Notice({
      originalFilename: originalFilename,
      cloudinaryUrl: cloudinaryResult.secure_url,
      cloudinaryPublicId: cloudinaryResult.public_id,
      status: "uploaded", // Initial status
    });
    await notice.save(); // Save initial record with Cloudinary details

    // --- 1. Read/Extract Text from PDF (using the fileBuffer) ---
    let extractedText = "";
    try {
      // Try text-based PDF parsing first directly from buffer
      const data = await pdf(fileBuffer);
      extractedText = data.text;

      // Heuristic: if very little text, might be scanned or parsing issue
      if (!extractedText || extractedText.trim().length < 100) {
        // Adjust threshold as needed
        console.log(
          "Low text from pdf-parse or potentially scanned PDF, trying OCR with Gemini Vision..."
        );
        const pdfPart = fileToGenerativePart(fileBuffer, "application/pdf");
        const promptParts = [
          {
            text: "Extract all text from this PDF document. Preserve formatting as much as possible.",
          },
          pdfPart,
        ];
        extractedText = await runGeminiQuery("vision", promptParts);
      }
    } catch (pdfParseError) {
      console.warn(
        "pdf-parse failed, attempting OCR with Gemini Vision:",
        pdfParseError.message
      );
      const pdfPart = fileToGenerativePart(fileBuffer, "application/pdf");
      const promptParts = [
        {
          text: "Extract all text from this PDF document. Preserve formatting as much as possible.",
        },
        pdfPart,
      ];
      extractedText = await runGeminiQuery("vision", promptParts);
    }

    notice.extractedText = extractedText;
    notice.status = "processing";
    await notice.save();

    //  2. Clean Text (using Gemini) 
    const cleanPromptParts = [
      {
        text:
          "You are a text cleaning expert. Clean the following extracted text from a tax notice. Remove irrelevant headers, footers, page numbers, and any OCR artifacts or noise. Preserve all meaningful content and structure related to the notice itself. Output only the cleaned text.\n\nExtracted Text:\n" +
          extractedText,
      },
    ];
    const cleanedText = await runGeminiQuery("text", cleanPromptParts);
    notice.cleanedText = cleanedText;
    await notice.save();

    //  3. Analyze the Notice (Using Gemini) 
    const analyzePromptParts = [
      {
        text: `You are an expert tax notice analyzer. Analyze the following cleaned tax notice text.
        Extract the following information in a structured JSON format:
        - typeOfNotice: (e.g., GST, TDS, Income Tax, Scrutiny, Demand Notice, etc.)
        - panNumber: (Permanent Account Number)
        - noticeDate: (Date on the notice, format YYYY-MM-DD if possible)
        - deadline: (Response deadline, format YYYY-MM-DD if possible)
        - assessmentYear: (e.g., 2022-23)
        - reasonForNotice: (Briefly state the main reason)
        - requiredAction: (What is explicitly asked of the recipient)
        - issuingAuthority: (e.g., Income Tax Department, GST Office name)

        If any information is not clearly present, use "Not Found" or null for the value.

        Additionally, provide a concise summary of the notice and suggest the next steps a Chartered Accountant or business should take.

        Format your entire response as a single JSON object with keys: "extractedInfo", "summary", and "suggestedNextSteps".

        Cleaned Tax Notice Text:\n${cleanedText}`,
      },
    ];
    const analysisResultText = await runGeminiQuery("text", analyzePromptParts);
    let analysisData = {
      extractedInfo: {},
      summary: "Analysis failed.",
      suggestedNextSteps: "Review manually.",
    };
    try {
      const cleanJsonString = analysisResultText
        .replace(/^```json\s*|```$/g, "")
        .trim();
      analysisData = JSON.parse(cleanJsonString);
    } catch (e) {
      console.error(
        "Failed to parse Gemini analysis JSON:",
        e,
        "\nRaw Gemini output:",
        analysisResultText
      );
      analysisData.summary =
        "Failed to parse structured analysis. Raw output below.";
      analysisData.rawOutput = analysisResultText; // Store raw if parsing fails
    }
    notice.analysis = analysisData.extractedInfo || {};
    notice.summary = analysisData.summary || "No summary provided.";
    notice.suggestedActions =
      analysisData.suggestedNextSteps || "No specific actions suggested.";
    notice.status = "analyzed";
    await notice.save();

    // --- 4. Generate Reply (Using Gemini) ---
    const replyPromptParts = [
      {
        text: `You are a professional legal assistant specializing in tax correspondence.
        Based on the following tax notice analysis and the original document stored at ${
          notice.cloudinaryUrl
        }:
        Extracted Information: ${JSON.stringify(notice.analysis, null, 2)}
        Summary: ${notice.summary}
        Suggested Actions: ${notice.suggestedActions}

        Draft a professional, polite, and compliant reply letter to the tax department.
        The letter should:
        1. Acknowledge receipt of the notice (mention notice number/date if available in analysis).
        2. Address the key points raised in the notice.
        3. Clearly state the intended actions, provide requested information (use placeholders like [DATA_TO_BE_FILLED]), or request clarification/extension if applicable as per suggested actions.
        4. Maintain a cooperative tone.

        Use placeholders like:
        - [Your/Company Name]
        - [Your/Company PAN] (use PAN from analysis if available)
        - [Your Address]
        - [Date of Reply]
        - [Notice Reference Number] (use from analysis if available)
        - [Assessing Officer/Issuing Authority] (use from analysis if available)
        - [Address of Tax Office]

        If crucial information for the reply is missing from the analysis, explicitly state that it needs to be filled in by the CA.
        Begin the letter with a standard formal salutation and end with a closing.
        Output ONLY the draft letter.
        `,
      },
    ];
    const draftReply = await runGeminiQuery("text", replyPromptParts);
    notice.draftReply = draftReply;
    notice.status = "reply_drafted";
    await notice.save();

    res
      .status(201)
      .json({
        message: "Notice processed and uploaded to Cloudinary successfully.",
        notice,
      });
  } catch (error) {
    console.error("Error processing notice:", error);
    // If Cloudinary upload succeeded but subsequent steps failed, you might want to delete the file from Cloudinary.
    // This requires storing the public_id from Cloudinary and calling its delete API.
    // For simplicity, this cleanup step is omitted here but is important for robust production systems.
    // Example (if 'notice' object was created and has cloudinaryPublicId):
    // if (notice && notice.cloudinaryPublicId) {
    //   try {
    //     await cloudinary.uploader.destroy(notice.cloudinaryPublicId, { resource_type: 'raw' });
    //     console.log('Cleaned up failed upload from Cloudinary:', notice.cloudinaryPublicId);
    //   } catch (cleanupError) {
    //     console.error('Error cleaning up Cloudinary file:', cleanupError);
    //   }
    // }
    res
      .status(500)
      .json({
        message: `Error processing notice: ${error.message}`,
        error: error.toString(),
      });
  }
};

// getNotices, getNoticeById, updateNoticeReply remain largely the same,
// as they interact with the MongoDB model which now stores Cloudinary URLs.
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ uploadedAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notices." });
  }
};

exports.getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: "Notice not found." });
    }
    res.json(notice);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notice." });
  }
};

exports.updateNoticeReply = async (req, res) => {
  try {
    const { draftReply } = req.body;
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: "Notice not found." });
    }
    notice.draftReply = draftReply;
    // notice.status = 'completed'; // Or 'reply_updated'
    await notice.save();
    res.json({ message: "Reply updated successfully.", notice });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating reply.", error: error.message });
  }
};
