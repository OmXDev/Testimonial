"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const testimoniaSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: false },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const basicSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    space_name: { type: String, required: true, unique: true },
    space_logo: { type: String, required: false },
    title: { type: String, required: true },
    custom_message: { type: String, required: true },
    custom_questions: {
        type: [
            {
                question: { type: String, required: true, default: '' }
            }
        ],
        validate: [
            (arr) => arr.length <= 8,
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
                (arr) => arr.length <= 5,
                '{PATH} exceeds the limit of 5'
            ]
        }
    },
    testimonials: [testimoniaSchema]
});
const thankSchema = new mongoose_1.default.Schema({
    image: { type: String, required: false },
    thank_title: { type: String, default: '' },
    thank_message: { type: String, default: '' },
});
const settingSchema = new mongoose_1.default.Schema({
    video_duration: { type: String, default: '' },
    text_characters: { type: Number, default: 0 },
});
const dashboardSchema = new mongoose_1.default.Schema({
    basic: { type: basicSchema, default: {} },
    thankyou: { type: thankSchema, default: {} },
    extrasettings: { type: settingSchema, default: {} }
});
const userSchema = new mongoose_1.default.Schema({
    firstname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dashboard: { type: dashboardSchema, default: undefined }
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
