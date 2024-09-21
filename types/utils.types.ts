export interface ImageData {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  image: ImageData;
}
