import { Meta } from "./generic.interface";

export interface IProductResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: IProduct[];
}

export interface IProduct {
  _id: string;
  image: string;
  name: string;
  price: number;
  description: string;
  category: string;
  status: string;
  keyfeature: string;
  individiualRating: number;
  avgRating: number;
  featured: boolean;
  reviews: IReview[];
}

export interface IReview {
  _id: string;
  name: string;
  review: string;
}
