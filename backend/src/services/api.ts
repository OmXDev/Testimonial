import axios from 'axios';

const API_BASE_URL= 'http://localhost:5000/api'

export const submitTestimonial= async(testimonialData:any)=>{
    try {
        const response= await axios.post(`&{API_BASE_URL}/space/submit-testimonial`,testimonialData);
        return response.data;
    } catch (error) {
        console.error('Error submitting testimonial:',error);
        throw error;
    }
}