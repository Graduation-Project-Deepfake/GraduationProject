import { NextFunction, Request, Response } from 'express';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { Server } from 'socket.io';
import { uploadSingleVideo } from '../middlewares/uploadVideoMiddleware';
import deepfake from '../models/deepfakeModel';
// Express app
const app = express();
// Socket.io connection
const serverio = require('http').createServer(app);
const io = new Server(serverio, {
    cors: {
        origin: '*',
        methods: '*',
        credentials: true,
    },
});
let predict = '';
let video = '';
io.on('connection', async (socket) => {
    socket.on('prediction', async (prediction) => {
        predict = prediction;
        console.log(prediction);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
serverio.listen(3000, () => {
    console.log('server is running......');
});

// @desc    Upload Single image for deepfake
// @route   POST /api/v1/deepfake/:id/deepfake
// @access  Private
export const uploaddeepfakeVideo = uploadSingleVideo('video');

// @desc    Create list of deepfake
// @route   Post /api/v1/deepfake
// @access  Private
export const createdeepfake = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded.' });
            return;
        }
        // Access the uploaded file using req.file
        const uploadedFile = req.file;
        // Process the uploaded video here (e.g., save to a database, perform operations, etc.)
        req.body.video = uploadedFile.originalname;
        console.log(req.body.video);
        video = '1.mp4';
        io.emit('data', req.body.video);
        const document = await deepfake.create({ video: req.body.video });
        res.status(201).json({ data: document });
    }
);

// @desc    Get Single video for deepfake
// @route   Get /api/v1/deepfake
// @access  Public
let preprocessed_images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];
let faces_cropped_images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];
const no_faces = false;
export const getPredict = (req: Request, res: Response, next: NextFunction) => {
    predict = 'REAL';
    if (!predict) {
        setTimeout(() => {
            getPredict(req, res, next);
        }, 100);
    } else {
        res.render('deepfake', {
            message: predict,
            preprocessed_images,
            faces_cropped_images,
            no_faces,
            video,
        });
    }
};
