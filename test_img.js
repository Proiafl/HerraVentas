import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function test() {
  try {
    const imageResp = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: "A blue power drill" }] }
    });
    console.log("Success:", !!imageResp.candidates[0].content.parts[0].inlineData);
  } catch (e) {
    console.error("Error:", e.message);
  }
}
test();
