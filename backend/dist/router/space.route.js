"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const space_controller_1 = require("../controllers/space.controller");
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
const router = express_1.default.Router();
router.route('space-id').get(space_controller_1.getSpaceId);
router.route('/space-data').get(isAuthenticated_1.default, space_controller_1.getSpaceData);
router.route('/generate-link').post(isAuthenticated_1.default, space_controller_1.generateSpaceLink);
router.route('/:spaceId/submit-testimonial').post(space_controller_1.submitTestimonial);
exports.default = router;
