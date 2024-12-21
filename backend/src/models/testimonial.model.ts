import mongoose, { Document, Schema } from 'mongoose';

export interface Testimonial {
  spaceId: string;
  rating?: number;
  answers: Array<{ question: string; answer: string }>;
  name?: string;
  email?: string;
  title_company?: string;
  social_link?: string;
  address?: string;
  custom_info?: Array<{ field: string; value: string }>;
  submittedAt: Date;
}

export interface TestimonialDocument extends Testimonial, Document {}

const testimonialSchema = new Schema<TestimonialDocument>({
  spaceId: { type: String, required: true },
  rating: { type: Number },
  answers: [{ 
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  name: { type: String },
  email: { type: String },
  title_company: { type: String },
  social_link: { type: String },
  address: { type: String },
  custom_info: [{ 
    field: { type: String, required: true },
    value: { type: String, required: true }
  }],
  submittedAt: { type: Date, default: Date.now }
});

export const TestimonialModel = mongoose.model<TestimonialDocument>('Testimonial', testimonialSchema);

