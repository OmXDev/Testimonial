import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import { NextFunction, Request,Response } from 'express'
import bcrypt from 'bcrypt'

interface AuthenticatedRequest extends Request{
    userId?:string;
}

export const register = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try {
        const { firstname, email, password} = req.body;
        if(!firstname || !email || !password){
            res.status(401).json({
                message:"something is missing, please check!",
                success: false
            })
            return;
        }
        const user = await User.findOne({email})
        if(user){
            res.status(401).json({
                message: 'User already Registered.',
                success:false
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password,12);
        await User.create({
            firstname,
            email,
            password:hashedPassword
        })
        res.status(201).json({
            message:'Acoount Created successfully',
            success:true
        })
        return;
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const signin = async (req:Request,res:Response):Promise<void> =>{
    try {
        const {email,password} = req.body;
        if(!email||!password){
            res.status(401).json({
                message:'something is missing,please check!',
                success:false
            })
            return;
        }
        let user = await User.findOne({email});
        if(!user){
            res.status(401).json({
                message:'invalid id or password',
                success:false
            })
            return ;
        }
        const isPasswordMatch= await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            res.status(401).json({
                message:'Incorrect Password',
                success: false
            })
            return;
        }

        const token = await jwt.sign({userId:user._id},
            process.env.SECRET_KEY as string,
            {expiresIn:'1d'}
        )

        user= {
            _id: user._id,
            firstname: user.firstname,
            email:user.email,
            user:user.dashboard

        } as any;

        res.cookie('token',token,{
            httpOnly:true,
            sameSite:'strict',
            maxAge:1*24*60*60*100
        }).json({
                message:`Welcome back ${user!.firstname}`,
                success:true,
                user
            })
            return;

    } catch (error) {
        console.log(error)   
    }
}

export const logout = async (req:Request,res:Response):Promise<void>=>{
    try {
        res.cookie('token',"" ,{
            maxAge:0
        }).json({
            message:'Logged out successfully',
            success: true
        })
        return 
    } catch (error) {
        console.log(error)
    }
}

export const getdashboard = async (req:Request,res:Response):Promise<void>=>{
    try {
        const userId= req.params.id;
        const user = await User.findById(userId).select('dashboard');
        
        if(!user){
            res.status(404).json({
                message:'User not found',
            })
            return;
        }
        res.status(200).json(user.dashboard)
    } catch (error) {
        console.log('error fetching dashboard'+ error)
    }
}

export const getBasic= async (req:Request,res:Response):Promise<void>=>{
    try {
        const userId= req.params.id;
        const user = await User.findById(userId).select('dashboard.basic')
        res.status(200).json({success:true,basic:user?.dashboard.basic})
    } catch (error) {
        console.log(error)
    }
}
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

export const addBasic = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { 'dashboard.basic': basic } },
            { new: true, runValidators: true }
        );

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
    } catch (error) {
        console.error('Error in addBasic:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error occurred while updating basic settings',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getThanks = async (req:Request,res:Response):Promise<void>=>{
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('dashboard.thankyou')
        res.status(200).json({success:true,thankyou:user?.dashboard.thankyou})
    } catch (error) {
        console.log(error)
    }
}

export const addThanks = async (req:Request,res:Response):Promise<void>=>{
    try {
        const userId = req.params.id;
        const{item} = req.body;
        const user= await User.findByIdAndUpdate(
            userId,
            {$push:{'dashboard.thanksyou':item}},
            {new:true}
        )
    } catch (error) {
        
    }
}

export const getSettings = async (req:Request,res:Response): Promise<void>=>{
    try {
        const userId = req.params.id;
        const user= await User.findById(userId).select('dashboard.extrasettings')

        res.status(200).json({success:true,extrasettings:user?.dashboard.extrasettings})
    } catch (error) {
        console.log(error)
    }
}

export const addSettings = async (req:Request,res:Response):Promise<void>=>{
    try {
        const userId = req.params.id;
        const {item} = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            {$push:{'dashboard.extrasettings':item}},
            {new:true}
        )
    } catch (error) {
        console.log(error)
    }
}