"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
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
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
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
    }
    catch (error) {
        console.error('Error in isAuthenticated middleware:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
});
exports.default = isAuthenticated;
