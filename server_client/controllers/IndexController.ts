import fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from 'express';

export const get_home = (req: Request, res: Response, next: NextFunction) => {
    res.render('index', { title: 'Express' });
};

export const getScanner = (req: Request, res: Response, next: NextFunction) => {
    res.render('scanner', { title: 'Express' });
};




export const removeDeepfake = (req: Request, res: Response, next: NextFunction) => {
    const folderPath = '../uploads/deepfake/';
    fs.readdir(folderPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
        if (err) {
          console.error('Error reading folder:', err);
          return;
        }
      
        // Iterate over the files
        files.forEach((file: string) => {
          const filePath = path.join(folderPath, file);
      
          // Remove each file
          fs.unlink(filePath, (error: NodeJS.ErrnoException | null) => {
            if (error) {
              console.error('Error removing file:', error);
            } else {
              console.log('File removed successfully:', filePath);
            }
          });
        });
      });
    res.status(204).send();
};

export const removeFace = (req: Request, res: Response, next: NextFunction) => {
    const folderPath = '../uploads/faces/';
    fs.readdir(folderPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
        if (err) {
          console.error('Error reading folder:', err);
          return;
        }
      
        // Iterate over the files
        files.forEach((file: string) => {
          const filePath = path.join(folderPath, file);
      
          // Remove each file
          fs.unlink(filePath, (error: NodeJS.ErrnoException | null) => {
            if (error) {
              console.error('Error removing file:', error);
            } else {
              console.log('File removed successfully:', filePath);
            }
          });
        });
      });
    res.status(204).send();
};

export const removeFrame = (req: Request, res: Response, next: NextFunction) => {
    const folderPath = '../uploads/frames/';
    fs.readdir(folderPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
        if (err) {
          console.error('Error reading folder:', err);
          return;
        }
      
        // Iterate over the files
        files.forEach((file: string) => {
          const filePath = path.join(folderPath, file);
      
          // Remove each file
          fs.unlink(filePath, (error: NodeJS.ErrnoException | null) => {
            if (error) {
              console.error('Error removing file:', error);
            } else {
              console.log('File removed successfully:', filePath);
            }
          });
        });
      });
    res.status(204).send();
};