import express from 'express';
import {
    get_home,
    getScanner,
    removeDeepfake,
    removeFrame,
    removeFace,
} from '../controllers/IndexController';

const router = express.Router();

/* GET home page. */
router.route('/').get(removeDeepfake, removeFrame, removeFace,get_home);
router
    .route('/scanner')
    .get(removeDeepfake, removeFrame, removeFace,getScanner);

export default router;
