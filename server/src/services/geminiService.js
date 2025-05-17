const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const modelConfig = {
    // Gemini Pro for text tasks
    text: genAI.getGenerativeModel({ model: "gemini-pro" }),
    // Gemini Pro Vision for multimodal tasks (if we use it for OCR on image PDFs)
    vision: genAI.getGenerativeModel({ model: "gemini-pro-vision" }),
};

const generationConfig = {
    temperature: 0.3, 
    topP: 1,
    maxOutputTokens: 4096, 
};

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

async function runGeminiQuery(modelType, promptParts) {
    const model = modelConfig[modelType];
    if (!model) {
        throw new Error(`Invalid model type: ${modelType}`);
    }
    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: promptParts }],
            generationConfig,
            safetySettings,
        });
        if (result.response.candidates && result.response.candidates.length > 0) {
             if (result.response.candidates[0].content) {
                return result.response.candidates[0].content.parts.map(part => part.text).join("");
             } else {
                console.warn("Gemini response candidate has no content:", result.response.candidates[0]);
                throw new Error("Gemini response candidate has no content.");
             }
        } else {
            console.warn("No candidates in Gemini response:", result.response);
            if (result.response.promptFeedback) {
                console.error("Prompt Feedback:", result.response.promptFeedback);
                throw new Error(`Gemini request blocked or failed. Reason: ${result.response.promptFeedback.blockReason || 'Unknown'}`);
            }
            throw new Error("No candidates returned from Gemini.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}

// Function to convert PDF file buffer to Gemini Part for gemini-pro-vision
function fileToGenerativePart(buffer, mimeType) {
    return {
        inlineData: {
            data: buffer.toString("base64"),
            mimeType,
        },
    };
}


module.exports = { runGeminiQuery, fileToGenerativePart };