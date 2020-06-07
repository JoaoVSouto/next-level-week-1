import 'multer';

declare module 'multer' {
  export interface CustomFile extends Express.Multer.File {
    resizedname: string;
  }
}
