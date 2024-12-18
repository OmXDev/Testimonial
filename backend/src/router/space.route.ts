import express from "express";
import {  generateSpaceLink, getSpaceData, getSpaceId, submitTestimonial,  } from "../controllers/space.controller";
import isAuthenticated from "../middlewares/isAuthenticated";


const router = express.Router();

router.route('space-id').get( getSpaceId)
router.route('/space-data').get(isAuthenticated,getSpaceData); 
router.route('/generate-link').post(isAuthenticated,generateSpaceLink) 
router.route('/:spaceId/submit-testimonial').post(submitTestimonial)  

export default router;