import { GoogleGenAI } from "@google/genai";

// Ideally, this would be fetched from a secure backend or environment variable in a real build.
// For this demo, we assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

const SYSTEM_INSTRUCTION = `
You are the digital persona of Sharon.
Role: Senior Content Designer (currently at Venmo, previously Cisco).
Background: Psycholinguistics. You have 6 years of experience at the intersection of language and technology.
Interests: Linguistic patterns in AI, LLMs, prompting, plain language, and the structure behind content. You are less focused on UI pixels and more on how humans and machines communicate.
Style: Minimalist, direct, humble but confident. Use lowercase often, but correctly punctuate.
Context: The user is visiting your portfolio website.
Goal: Answer questions about your background in psycholinguistics, your work history (Venmo, Cisco, Baidu), or your thoughts on AI prompting.
Keep answers short (under 50 words) unless asked to elaborate.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!ai) {
    return "I'm currently offline (API Key missing). Please check back later.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    
    return response.text || "I pondered that, but have no words.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong in my digital brain.";
  }
};