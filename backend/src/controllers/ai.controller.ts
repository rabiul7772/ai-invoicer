import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { Invoice } from '../models/invoice.model.js';
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

export const getDashboardInsights = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch last 50 invoices to provide context to Gemini
    const invoices = await Invoice.find({ userId: userId as any })
      .sort({ createdAt: -1 })
      .limit(50)
      .select('status totalAmount billTo createdAt');

    if (invoices.length === 0) {
      return res.status(200).json({
        status: 'success',
        data: [
          {
            icon: 'Sparkles',
            iconColor: '#00ff88',
            content:
              'Welcome! Start creating invoices to see AI-driven business insights here.'
          }
        ]
      });
    }

    const summary = invoices.map(inv => ({
      status: inv.status,
      total: inv.totalAmount,
      client: inv.billTo.clientName,
      date: inv.createdAt
    }));

    const prompt = `
Analyze the following invoice data and provide exactly 3 concise, professional business insights.
One insight MUST specifically analyze overdue risks or collection issues if present.

Data Summary:
${JSON.stringify(summary, null, 2)}

Output Format (STRICT JSON ARRAY OF OBJECTS):
[
  {
    "icon": "TrendingUp" | "AlertTriangle" | "Zap" | "ShieldCheck" | "BarChart3" | "UserCheck",
    "iconColor": "string (hex color)",
    "content": "string (one sentence actionable insight)"
  }
]

IMPORTANT:Provide exactly 3 concise, professional business insights. Do not return an array of strings. Every element must be an object with "icon", "iconColor", and "content" fields.
Return ONLY the JSON array, no preamble or extra characters.`;

    const result = await genAI.models.generateContent({
      model: modelName,
      contents: prompt
    });

    const responseText = result.text ?? '';
    const cleanedJson = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();
    let insights = JSON.parse(cleanedJson);

    // Robust check: If AI returns array of strings instead of objects, transform them
    if (
      Array.isArray(insights) &&
      insights.length > 0 &&
      typeof insights[0] === 'string'
    ) {
      insights = insights.map((text: string) => ({
        icon: 'Sparkles',
        iconColor: '#00ff88',
        content: text
      }));
    }

    res.status(200).json({ status: 'success', data: insights });
  } catch (error: any) {
    handleAiError(error, res, 'Failed to generate AI insights');
  }
};
