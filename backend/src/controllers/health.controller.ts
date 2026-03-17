import type { Request, Response } from 'express';

/**
 * @desc    Health check endpoint to keep the server alive on Render free tier
 * @route   GET /api/v1/health
 * @access  Public
 */
export const healthCheck = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy and active',
    timestamp: new Date().toISOString()
  });
};
