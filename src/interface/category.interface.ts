import { Meta } from "./generic.interface";

export interface ICategory {
  _id: string;
  name: string;
  route: string;
}

export interface ICategoryResponse {
  data: ICategory[];
  meta: Meta;
}
