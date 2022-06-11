import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const fs = require('fs');

export class FileStorageService {
  static getSaveImageToStorage = (destination: string): MulterOptions => {
    return {
      storage: diskStorage({
        destination,
        filename: (req, file, cb) => {
          const fileExtension: string = path.extname(file.originalname);
          const fileName: string = uuidv4() + fileExtension;
          cb(null, fileName);
        },
      }),
    };
  };

  static deleteFileFromStorage = (filePath: string) => {
    fs.unlinkSync(filePath);
  };
}
