import express from 'express';
import {addBasic, addSettings, addThanks, getBasic, getdashboard, getSettings, getThanks, logout, register, signin} from '../controllers/user.controller'
import isAuthenticated from '../middlewares/isAuthenticated';

const router = express.Router();

router.route('/register').post(register);
router.route('/signin').post(signin);
router.route('/logout').get(logout);
router.route('/dashboard').get(getdashboard);
router.route('/dashboard/getbasic/:id').get(getBasic);
router.route('/dashboard/addbasic').post(isAuthenticated, addBasic);
router.route('/dashboard/getthanks/:id').get(getThanks);
router.route('/dashboard/addthanks/:id').post(addThanks);
router.route('/dashboard/getsettings/:id').get(getSettings);
router.route('/dashboard/addsettings/:id').post(addSettings)

export default router;