import type { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { GEMINI_API_KEY } from '../config/env.js';

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const extractInvoiceData = async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  try {
    const prompt = `
You are an expert invoice data extraction AI. Analyze the following text and extract the relevant information to create an invoice. 

The output MUST be a valid JSON object.

The JSON object should have the following structure:
{
  "clientName": "string",
  "email": "string",
  "address": "string",
  "items": [
    {
      "name": "string",
      "quantity": number,
      "price": number
    }
  ]
}

If a field is not found, use an empty string for strings or 0 for numbers. Return ONLY the JSON object, no other text.

Here is the text to parse:
--- TEXT START ---
${text}
--- TEXT END ---`;

    const result = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    const responseText = result.text ?? '';

    // Clean up response text in case Gemini adds markdown code blocks
    const cleanedJson = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();
    const parsedData = JSON.parse(cleanedJson);

    res.status(200).json({
      status: 'success',
      data: parsedData
    });
  } catch (error: any) {
    console.error('AI Extraction Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to extract data from text',
      error: error.message
    });
  }
};
