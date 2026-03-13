import type { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { GEMINI_API_KEY, GEMINI_MODEL } from '../config/env.js';

if (!GEMINI_API_KEY || !GEMINI_MODEL) {
  throw new Error(
    'GEMINI_API_KEY or GEMINI_MODEL is not set in environment variables'
  );
}

const modelName = GEMINI_MODEL;

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const handleAiError = (error: any, res: Response, customMessage: string) => {
  const isRateLimit = error.status === 429 || error.message?.includes('429');

  const finalMessage = isRateLimit
    ? 'AI quota exceeded. Please wait a minute and try again.'
    : customMessage;

  return res.status(error.status || 500).json({
    status: 'error',
    message: finalMessage,
    error: isRateLimit ? 'RATE_LIMIT_EXCEEDED' : 'AI_OPERATION_FAILED'
  });
};

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
  "phone": "string",
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
      model: modelName,
      contents: prompt
    });

    const responseText = result.text ?? '';
    const cleanedJson = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();
    const parsedData = JSON.parse(cleanedJson);

    res.status(200).json({ status: 'success', data: parsedData });
  } catch (error: any) {
    handleAiError(
      error,
      res,
      'Failed to extract data from text, please try again'
    );
  }
};

export const generateSampleInvoiceText = async (
  req: Request,
  res: Response
) => {
  try {
    const prompt = `
Generate a unique, realistic, but unstructured text description of an invoice. 
The text should look like a person typed it in an email or message.
Include:
- A random realistic client name
- A realistic email address
- A realistic physical address
- A phone number
- 2 to 4 line items with different quantities and prices (prices must be without decimals values)

Variation is key. Make it feel like a natural message. 
Return ONLY the text of the message, nothing else. No JSON, no markdown.`;

    const result = await genAI.models.generateContent({
      model: modelName,
      contents: prompt
    });

    res.status(200).json({ status: 'success', data: result.text || '' });
  } catch (error: any) {
    handleAiError(
      error,
      res,
      'Failed to generate sample text, please try again!'
    );
  }
};
