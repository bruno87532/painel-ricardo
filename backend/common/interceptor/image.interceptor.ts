import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { UnsupportedMediaTypeException } from "@nestjs/common";

export const ImageInterceptor = (fieldName: string) =>
  FileInterceptor(fieldName, {
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req: Request, file, cb) => {
      const allowed = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/heic',
        'image/heif',
        'image/avif'
      ];
      const isValid = allowed.includes(file.mimetype.toLowerCase());
      if (isValid) cb(null, true);
      else cb(new UnsupportedMediaTypeException("Only image files are allowed."), false);
    }
  });
