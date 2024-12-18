import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  userId?: string;
}

const isAuthenticated = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies?.token;
    console.log('Authenticating request. Token present:', !!token);

    if (!token) {
      console.log('No token found in cookies');
      res.status(401).json({
        message: 'User not authenticated',
        success: false,
      });
      return;
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      console.error('SECRET_KEY is not defined in environment variables');
      throw new Error('SECRET_KEY is not defined in environment variables');
    }

    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
      console.log('Invalid token:', decoded);
      res.status(401).json({
        message: 'Invalid token',
        success: false,
      });
      return;
    }

    req.userId = decoded.userId;
    console.log('User authenticated. User ID:', req.userId);
    next();
  } catch (error) {
    console.error('Error in isAuthenticated middleware:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
};

export default isAuthenticated;

