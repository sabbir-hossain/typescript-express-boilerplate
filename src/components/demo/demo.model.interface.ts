import { mongoose } from "../../database";

const Schema = mongoose.Schema;

export const collection = "Demo";

export interface IDemoModel {
  id:string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}
