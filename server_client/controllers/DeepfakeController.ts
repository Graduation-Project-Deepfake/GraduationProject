import { NextFunction, Request, Response } from 'express';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { Server } from 'socket.io';
// import { spawn } from 'child_process';
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
let preprocessed_images = [''];
let faces_cropped_images = [''];
let video = '';
io.on('connection', async (socket) => {
    socket.on('prediction', async (prediction) => {
        predict = await prediction;
        console.log(prediction);
    });
    socket.on('preproc_images', async (preproc_images) => {
        preprocessed_images = await preproc_images;
        console.log(preproc_images);
    });
    socket.on('faces_images', async (faces_images) => {
        faces_cropped_images = await faces_images;
        console.log(faces_images);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
serverio.listen(4000, () => {
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

        // Reset the values to their initial state or empty them
        predict = '';
        preprocessed_images = [];
        faces_cropped_images = [];
        video = '';
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded.' });
            return;
        }
        const uploadedFile = req.file;
        req.body.video = uploadedFile.originalname;
        video = req.body.video;
        console.log(video);

        // Emit the video name to the client
        io.emit('response', req.body.video);

        // Process the uploaded video and create the deepfake document
        const document = await deepfake.create({ video: req.body.video });
        res.status(201).json({ data: document });
    }
);

// @desc    Get Single video for deepfake
// @route   Get /api/v1/deepfake
// @access  Public

const no_faces = false;
export const getPredict = (req: Request, res: Response, next: NextFunction) => {
    if (!predict || !preprocessed_images || !faces_cropped_images) {
        setTimeout(() => {
            getPredict(req, res, next);
        }, 100);
    } else {
        res.render('deepfake', {
            message: predict,
            preprocessed_images: preprocessed_images,
            faces_cropped_images: faces_cropped_images,
            no_faces,
            video: video,
        });
    }
};
