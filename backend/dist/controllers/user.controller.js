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
exports.addSettings = exports.getSettings = exports.addThanks = exports.getThanks = exports.addBasic = exports.getBasic = exports.getdashboard = exports.logout = exports.signin = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, email, password } = req.body;
        if (!firstname || !email || !password) {
            res.status(401).json({
                message: "something is missing, please check!",
                success: false
            });
            return;
        }
        const user = yield user_model_1.default.findOne({ email });
        if (user) {
            res.status(401).json({
                message: 'User already Registered.',
                success: false
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        yield user_model_1.default.create({
            firstname,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            message: 'Acoount Created successfully',
            success: true
        });
        return;
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.register = register;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401).json({
                message: 'something is missing,please check!',
                success: false
            });
            return;
        }
        let user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({
                message: 'invalid id or password',
                success: false
            });
            return;
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(401).json({
                message: 'Incorrect Password',
                success: false
            });
            return;
        }
        const token = yield jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
        user = {
            _id: user._id,
            firstname: user.firstname,
            email: user.email,
            user: user.dashboard
        };
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 1 * 24 * 60 * 60 * 100
        }).json({
            message: `Welcome back ${user.firstname}`,
            success: true,
            user
        });
        return;
    }
    catch (error) {
        console.log(error);
    }
});
exports.signin = signin;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie('token', "", {
            maxAge: 0
        }).json({
            message: 'Logged out successfully',
            success: true
        });
        return;
    }
    catch (error) {
        console.log(error);
    }
});
exports.logout = logout;
const getdashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield user_model_1.default.findById(userId).select('dashboard');
        if (!user) {
            res.status(404).json({
                message: 'User not found',
            });
            return;
        }
        res.status(200).json(user.dashboard);
    }
    catch (error) {
        console.log('error fetching dashboard' + error);
    }
});
exports.getdashboard = getdashboard;
const getBasic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield user_model_1.default.findById(userId).select('dashboard.basic');
        res.status(200).json({ success: true, basic: user === null || user === void 0 ? void 0 : user.dashboard.basic });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getBasic = getBasic;
// export const addBasic = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { item } = req.body; 
//         const user = await User.findOneAndUpdate(
//             {},  
//             { $push: { 'dashboard.basic': item } },
//             { new: true, upsert: true } 
//         );
//         res.status(200).json({ success: true, message: 'Basic item added', user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Error occurred' });
//     }
// };
const addBasic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { basic } = req.body;
        const userId = req.userId;
        // console.log('Received request to add basic settings. User ID:', userId);
        // console.log('Basic settings:', JSON.stringify(basic, null, 2));
        if (!userId) {
            console.log('User not authenticated');
            res.status(401).json({ success: false, message: 'User not authenticated' });
            return;
        }
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, { $set: { 'dashboard.basic': basic } }, { new: true, runValidators: true });
        if (!updatedUser) {
            console.log('User not found for ID:', userId);
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        console.log('User updated successfully');
        res.status(200).json({
            success: true,
            message: 'Basic settings updated successfully',
            user: updatedUser
        });
    }
    catch (error) {
        console.error('Error in addBasic:', error);
        res.status(500).json({
            success: false,
            message: 'Error occurred while updating basic settings',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.addBasic = addBasic;
const getThanks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield user_model_1.default.findById(userId).select('dashboard.thankyou');
        res.status(200).json({ success: true, thankyou: user === null || user === void 0 ? void 0 : user.dashboard.thankyou });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getThanks = getThanks;
const addThanks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { item } = req.body;
        const user = yield user_model_1.default.findByIdAndUpdate(userId, { $push: { 'dashboard.thanksyou': item } }, { new: true });
    }
    catch (error) {
    }
});
exports.addThanks = addThanks;
const getSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield user_model_1.default.findById(userId).select('dashboard.extrasettings');
        res.status(200).json({ success: true, extrasettings: user === null || user === void 0 ? void 0 : user.dashboard.extrasettings });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSettings = getSettings;
const addSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { item } = req.body;
        const user = yield user_model_1.default.findByIdAndUpdate(userId, { $push: { 'dashboard.extrasettings': item } }, { new: true });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addSettings = addSettings;
