import { GoogleGenAI } from "@google/genai";
import { DEFAULT_SYSTEM_INSTRUCTION } from "../constants";

// Initialize Gemini API Client
// NOTE: The API key is expected to be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateHRAdvice = async (
  stepTitle: string, 
  userContext: string, 
  employeeName: string
): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash'; 
    
    const prompt = `
      Tôi đang ở Bước: "${stepTitle}".
      Nhân viên tên là: "${employeeName}".
      Bối cảnh/Vấn đề cụ thể tôi đang gặp phải: "${userContext}".
      
      Hãy cho tôi lời khuyên cụ thể cho bước này. Nếu phù hợp, hãy viết giúp tôi một kịch bản nói chuyện ngắn hoặc một email mẫu để gửi cho nhân viên này.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: DEFAULT_SYSTEM_INSTRUCTION,
      },
    });

    return response.text || "Xin lỗi, tôi không thể tạo phản hồi lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi kết nối với trợ lý AI. Vui lòng kiểm tra lại API Key hoặc thử lại sau.";
  }
};
