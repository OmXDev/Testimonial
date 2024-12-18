import mongoose from 'mongoose';


const testimoniaSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  rating:{type:Number,min:1,max:5,required:false},
  message:{type:String,required:true},
  createdAt:{type:Date,default:Date.now}
})

const basicSchema = new mongoose.Schema({
  _id:{type:mongoose.Schema.Types.ObjectId,auto:true},
  space_name: { type: String, required: true, unique: true },
  space_logo: { type: String, required: false },
  title: { type: String, required: true},
  custom_message: { type: String, required: true },
  custom_questions: {
    type: [
      {
        question: { type: String, required: true ,default:''}
      }
    ],
    validate: [
      (arr: Array<{ question: string }>) => arr.length <= 8,
      '{PATH} exceeds the limit of 8'
    ]
  },
  collection_type: { type: String, enum: ['text', 'video', 'audio'], default: 'text' },
  star_ratings: { type: Boolean, default: false },
  Theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  language: { type: String, default: 'en' },
  showExtraQuestions: { type: Boolean, default: false },
  collectExtraInfo: { type: Boolean, default: false },
  extra_info: {
    name: { type: String, required: false },
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
        (arr: Array<{ fields: string }>) => arr.length <= 5,
        '{PATH} exceeds the limit of 5'
      ]
    }
  },
  testimonials:[testimoniaSchema]
});

const thankSchema = new mongoose.Schema({
  image: { type: String, required: false },
  thank_title: { type: String, default: '' },
  thank_message: { type: String, default: '' },
});

const settingSchema = new mongoose.Schema({
  video_duration: { type: String, default: '' },
  text_characters: { type: Number, default: 0 },
});

const dashboardSchema = new mongoose.Schema({
  basic: { type: basicSchema, default: {} },
  thankyou: { type: thankSchema, default: {} },
  extrasettings: { type: settingSchema, default: {} }
});

interface IBasic {
  _id?: mongoose.Types.ObjectId;
  space_name: string;
  space_logo: string;
  title: string;
  custom_message: string;
  custom_questions: Array<{ question: string }>;
  collection_type: 'text' | 'video' | 'audio';
  star_ratings: boolean;
  Theme: 'light' | 'dark';
  language: string;
  showExtraQuestions: boolean;
  collectExtraInfo: boolean;
  extra_info: {
    name?: string;
    email?: string;
    title_company?: string;
    social_link?: string;
    address?: string;
    custom_info?: Array<{ fields: string }>;
  };
}

interface IThank {
  image?: string;
  thank_title: string;
  thank_message: string;
}

interface ISetting {
  video_duration: string;
  text_characters: number;
}

interface IDashboard {
  basic: IBasic;
  thankyou: IThank;
  extrasettings: ISetting;
}

interface IUser extends mongoose.Document {
  firstname: string;
  email: string;
  password: string;
  dashboard: IDashboard;
}

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dashboard: { type: dashboardSchema, default:undefined }
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);
export default User;

