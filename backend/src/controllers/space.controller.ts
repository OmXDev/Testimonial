import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/user.model";
// import { CustomRequest } from '../middlewares/isAuthenticated';

interface AuthenticatedRequest extends Request {
    userId?: string;
}

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

export const getSpaceId = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        console.log('userId:', userId);

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: 'Invalid or missing user ID' });
            return;
        }

        const user = await User.findById(userId);
        console.log('user:', user);

        if (!user || !user.dashboard || !user.dashboard.basic) {
            res.status(404).json({ message: 'Space not found' });
            return;
        }

        console.log('user.dashboard.basic:', user.dashboard.basic);

        if (!user.dashboard.basic._id) {
            user.dashboard.basic._id = new mongoose.Types.ObjectId();
            await user.save();
        }

        const spaceId = user.dashboard.basic._id;
        console.log('spaceId:', spaceId);

        if (!mongoose.Types.ObjectId.isValid(spaceId)) {
            res.status(400).json({ message: 'Invalid Space ID' });
            return;
        }

        res.status(200).json({ spaceId: spaceId.toString() });
    } catch (error) {
        console.error('Error in getSpaceId:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

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

export const getSpaceData = async (req:AuthenticatedRequest,res:Response):Promise<void>=>{
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
          }
      
          // Fetch user data
          const user = await User.findById(userId).select('dashboard.basic');
          if (!user || !user.dashboard?.basic) {
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
        } catch (error) {
          console.error('Error fetching dashboard basic data:', error);
          res.status(500).json({ success: false, message: 'Server Error' });
        }
   
}

export const generateSpaceLink = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.body;
        const user = await User.findById(userId)

        if (!user || !user.dashboard.basic) {
            res.status(404).json({
                success: false,
                message: 'User or Space not found'
            })
            return;
        }

        const spaceId = user.dashboard.basic._id;

        const uniqueLink = `${process.env.FRONTEND_URL}/testimonial/${spaceId}`;
        res.json({ success: true, link: uniqueLink })
    } catch (error) {
        console.log('Error in generating Link', error);
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

export const submitTestimonial = async (req: Request, res: Response): Promise<void> => {
    try {
        const { spaceId } = req.params;
        const testimonialData = req.body;

        const user = await User.findOneAndUpdate(
            { 'dashboard.basic._id': spaceId },
            { $push: { 'dashboard.basic.testimonials': testimonialData } },
            { new: true }
        )

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'Space not found'
            })
            return;
        }

        res.json({ success: true, message: 'Testimonial Submitted Successfully' })
    } catch (error) {
        console.log('Error Submitting Testimonials', error);
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}
