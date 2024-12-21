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
exports.submitTestimonial = exports.generateSpaceLink = exports.getSpaceData = exports.getSpaceId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
const testimonial_model_1 = require("../models/testimonial.model");
// export const getSpaceId = async (req:AuthenticatedRequest,res:Response):Promise<void>=>{
//     try {
//         const userId = req.userId;
//         if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//              res.status(400).json({ message: 'Invalid or missing user ID' });
//              return;
//         }
//         const user= await User.findById(userId)
//         if(!user||!user.dashboard||!user.dashboard.basic){
//              res.status(404).json({message:'Space Id not found'})
//              return;
//         }
//         const spaceId = user.dashboard.basic._id;
//         if (!spaceId || !mongoose.Types.ObjectId.isValid(spaceId.toString())) {
//              res.status(400).json({ message: 'Invalid Space ID' });
//              return;
//         }
//         res.status(200).json({spaceId})
//     } catch (error) {
//         res.status(500).json({error:'Internal Server Error'})
//     }
// }
// export const getSpaceId = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
//     try {
//         const userId = req.userId;
//         if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//             res.status(400).json({ message: 'Invalid or missing user ID' });
//             return;
//         }
//         const user = await User.findById(userId);
//         if (!user || !user.dashboard || !user.dashboard.basic) {
//             res.status(404).json({ message: 'Space Id not found' });
//             return;
//         }
//         const spaceId = user.dashboard.basic._id;
//         if (!spaceId || !mongoose.Types.ObjectId.isValid(spaceId.toString())) {
//             res.status(400).json({ message: 'Invalid Space ID' });
//             return;
//         }
//         res.status(200).json({ spaceId });
//     } catch (error) {
//         console.error('Error in getSpaceId:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
// export const getSpaceId = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
//     try {
//         const userId = req.userId;
//         if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//             res.status(400).json({ message: 'Invalid or missing user ID' });
//             return;
//         }
//         const user = await User.findById(userId);
//         if (!user || !user.dashboard || !user.dashboard.basic) {
//             res.status(404).json({ message: 'Space not found' });
//             return;
//         }
//         const spaceId = user.dashboard.basic._id;
//         if (!spaceId) {
//             // If spaceId doesn't exist, create one
//             user.dashboard.basic._id = new mongoose.Types.ObjectId();
//             await user.save();
//             res.status(200).json({ spaceId: user.dashboard.basic._id });
//         } else if (!mongoose.Types.ObjectId.isValid(spaceId.toString())) {
//             res.status(400).json({ message: 'Invalid Space ID' });
//         } else {
//             res.status(200).json({ spaceId });
//         }
//     } catch (error) {
//         console.error('Error in getSpaceId:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
// export const getSpaceId = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
//     try {
//         const userId = req.userId;
//         if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//             res.status(400).json({ message: 'Invalid or missing user ID' });
//             return;
//         }
//         const user = await User.findById(userId);
//         if (!user || !user.dashboard || !user.dashboard.basic) {
//             res.status(404).json({ message: 'Space not found' });
//             return;
//         }
//         if (!user.dashboard.basic._id) {
//             // If _id doesn't exist, create one
//             user.dashboard.basic._id = new mongoose.Types.ObjectId();
//             await user.save();
//         }
//         const spaceId = user.dashboard.basic._id;
//         console.log('spaceId:', spaceId); // Add this line to log the spaceId
//         if (!mongoose.Types.ObjectId.isValid(spaceId)) {
//             res.status(400).json({ message: 'Invalid Space ID' });
//             return;
//         }
//         res.status(200).json({ spaceId: spaceId.toString() }); // Convert to string before sending
//     } catch (error) {
//         console.error('Error in getSpaceId:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
const getSpaceId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        console.log('userId:', userId);
        if (!userId || !mongoose_1.default.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: 'Invalid or missing user ID' });
            return;
        }
        const user = yield user_model_1.default.findById(userId);
        console.log('user:', user);
        if (!user || !user.dashboard || !user.dashboard.basic) {
            res.status(404).json({ message: 'Space not found' });
            return;
        }
        console.log('user.dashboard.basic:', user.dashboard.basic);
        if (!user.dashboard.basic._id) {
            user.dashboard.basic._id = new mongoose_1.default.Types.ObjectId();
            yield user.save();
        }
        const spaceId = user.dashboard.basic._id;
        console.log('spaceId:', spaceId);
        if (!mongoose_1.default.Types.ObjectId.isValid(spaceId)) {
            res.status(400).json({ message: 'Invalid Space ID' });
            return;
        }
        res.status(200).json({ spaceId: spaceId.toString() });
    }
    catch (error) {
        console.error('Error in getSpaceId:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getSpaceId = getSpaceId;
// export const getSpaceData = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const spaceId = req.params.spaceId;
//         const user = await User.findOne({ 'dashboard.basic._id': spaceId })
//         if (!user || !user.dashboard.basic) {
//             res.status(404).json({
//                 success: false,
//                 message: 'Space not found'
//             })
//             return;
//         }
//         res.json({
//             success: true,
//             spaceId: spaceId,
//             spaceData: user.dashboard.basic
//         })
//     } catch (error) {
//         console.log('error fetching Space Data', error);
//         res.status(500).json({ success: false, message: 'Server Error' })
//     }
// }
const getSpaceData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        // Fetch user data
        const user = yield user_model_1.default.findById(userId).select('dashboard.basic');
        if (!user || !((_a = user.dashboard) === null || _a === void 0 ? void 0 : _a.basic)) {
            res.status(404).json({
                success: false,
                message: 'No basic dashboard data found for the user',
            });
            return;
        }
        // Return dashboard.basic
        res.json({
            success: true,
            spaceData: user.dashboard.basic,
        });
    }
    catch (error) {
        console.error('Error fetching dashboard basic data:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});
exports.getSpaceData = getSpaceData;
const generateSpaceLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body;
        const user = yield user_model_1.default.findById(userId);
        if (!user || !user.dashboard.basic) {
            res.status(404).json({
                success: false,
                message: 'User or Space not found'
            });
            return;
        }
        const spaceId = user.dashboard.basic._id;
        const uniqueLink = `${process.env.FRONTEND_URL}/testimonial/${spaceId}`;
        res.json({ success: true, link: uniqueLink });
    }
    catch (error) {
        console.log('Error in generating Link', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});
exports.generateSpaceLink = generateSpaceLink;
const submitTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { spaceId, rating, answers, name, email, title_company, social_link, address, custom_info } = req.body;
        // Validate required fields
        if (!spaceId || !answers || !Array.isArray(answers)) {
            res.status(400).json({ success: false, message: 'Invalid testimonial data' });
            return;
        }
        // Create a new testimonial document
        const newTestimonial = {
            spaceId,
            rating,
            answers,
            name,
            email,
            title_company,
            social_link,
            address,
            custom_info,
            submittedAt: new Date()
        };
        // Save the testimonial to the database
        const savedTestimonial = yield testimonial_model_1.TestimonialModel.create(newTestimonial);
        res.status(201).json({
            success: true,
            message: 'Testimonial submitted successfully',
            testimonial: savedTestimonial
        });
    }
    catch (error) {
        console.error('Error submitting testimonial:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.submitTestimonial = submitTestimonial;
