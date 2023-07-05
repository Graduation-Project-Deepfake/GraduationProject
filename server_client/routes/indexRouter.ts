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
router.route('/').get(get_home, removeDeepfake, removeFrame, removeFace);
router
    .route('/scanner')
    .get(getScanner, removeDeepfake, removeFrame, removeFace);

export default router;
