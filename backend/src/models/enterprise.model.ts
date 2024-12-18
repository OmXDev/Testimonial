import mongoose from 'mongoose'

interface IBasic {
    space_name: string;
    space_logo: string;
    title: string;
    custom_message: string;
    custom_questions: string;
    extra_info: {
        name: string;
        email: string;
        title_company: string;
        social_link: string;
        address: string;
        custom_info: string;
    }
}

interface IThank {
    image: string;
    thank_title: string;
    thank_message: string;
}

interface ISetting {
    video_duration: string;
    text_characters: number;
}

interface INotifiaction{
    text:{
        sender_name:string;
        reply_email:string;
        subject:string;
        message:string;
        share_button:string;
    },
    video:{
        sender_name:string;
        reply_email:string;
        subject:string;
        video:string;
        share_button:string;
    }
}

interface IUser extends Document {
    firstname: string;
    email: string;
    password: string;
    dashboard: {
        basic: [IBasic],
        thanksyou: [IThank],
        extrasettings: [ISetting],
        notification:[INotifiaction],
    }
}

const notificationSchema = new mongoose.Schema({
    text: {
        sender_name: { type: String, required: true },
        reply_email: { type: String, requied: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
        share_button: { type: String, required: true }
    },
    video: {
        sender_name: { type: String, required: true },
        reply_email: { type: String, requied: true },
        subject: { type: String, required: true },
        video: { type: String, required: true },
        share_button: { type: String, required: true }
    }
})

const settingSchema = new mongoose.Schema({
    video_duration: { type: String, default: '' },
    text_characters: { type: Number, default: '' },

})

const thankSchema = new mongoose.Schema({
    image: { type: String, required: true },
    thank_title: { type: String, default: '' },
    thank_message: { type: String, default: '' },

})

const spaceSchema = new mongoose.Schema({

    space_name: { type: String, required: true, unique: true },
    space_logo: { type: String, required: true },
    title: { type: String, required: true },
    custom_message: { type: String, required: true },
    custom_questions: {
        type: [
            {
                question: { type: String, required: true }
            }
        ],
        validate: [
            (arr: Array<object>) => arr.length <= 8,
            '{PATH} exceeds the limit of 8'
        ]
    },
    extra_info: {
        name: { type: String, required: true },
        email: { type: String, required: false },
        title_company: { type: String, required: false },
        social_link: { type: String, required: false },
        address: { type: String, required: false },
        custom_info: {
            type: [
                {
                    fields: {
                        type: String,
                        required: { type: Boolean, default: false },
                    }
                }
            ],
            validate: [
                (arr: Array<object>) => arr.length <= 5,
                '{PATH} excess the limit of 5'
            ]
        },
        collection_type: { type: String },

        star_ratings: { type: Boolean, default: true },
        Theme: { type: Boolean, default: true }
    }

})


const enterpriseSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    payment_info:{type:String,required:true},
    validity:{type:String,required:true},
    dashboard: {
        basic: [spaceSchema],
        thanksyou: [thankSchema],
        extrasettings: [settingSchema],
        notification: [notificationSchema]
    }
}, { timestamps: true })

const Enterprise = mongoose.model<IUser>('Enterprise', enterpriseSchema);
export default Enterprise;