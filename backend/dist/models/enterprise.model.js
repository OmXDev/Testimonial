"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
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
});
const settingSchema = new mongoose_1.default.Schema({
    video_duration: { type: String, default: '' },
    text_characters: { type: Number, default: '' },
});
const thankSchema = new mongoose_1.default.Schema({
    image: { type: String, required: true },
    thank_title: { type: String, default: '' },
    thank_message: { type: String, default: '' },
});
const spaceSchema = new mongoose_1.default.Schema({
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
            (arr) => arr.length <= 8,
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
                (arr) => arr.length <= 5,
                '{PATH} excess the limit of 5'
            ]
        },
        collection_type: { type: String },
        star_ratings: { type: Boolean, default: true },
        Theme: { type: Boolean, default: true }
    }
});
const enterpriseSchema = new mongoose_1.default.Schema({
    firstname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    payment_info: { type: String, required: true },
    validity: { type: String, required: true },
    dashboard: {
        basic: [spaceSchema],
        thanksyou: [thankSchema],
        extrasettings: [settingSchema],
        notification: [notificationSchema]
    }
}, { timestamps: true });
const Enterprise = mongoose_1.default.model('Enterprise', enterpriseSchema);
exports.default = Enterprise;
