import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { CustomFile } from 'multer';

export default async function (imageInfo: CustomFile): Promise<void> {
  const {
    resizedname: image,
    path: imagePath,
    destination: imageDestination,
  } = imageInfo;

  const [imagePrefix] = image.split('.');
  const imageName = `${imagePrefix}.jpg`;

  await sharp(imagePath)
    .resize(500)
    .jpeg({ quality: 70 })
    .toFile(path.resolve(imageDestination, imageName));

  fs.unlinkSync(imagePath);
}
