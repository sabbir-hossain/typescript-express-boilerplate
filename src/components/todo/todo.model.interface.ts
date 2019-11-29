import { todoStatus } from './../../config';

export interface ITodoModel {
  id?:string;
  name: string;
  status: string;
  startDate?:Date;
  endDate?:Date;
  ref?: string;
  user?:string;
  db?:string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const todoRules = {
  name: "string|required",
  status: `string|in:${todoStatus.COMPLETE},${todoStatus.IN_COMPLETE},${todoStatus.IN_PROGRESS}`,
  ref: "string",
  startDate: "date",
  endDate: "date",
  user: "string"
}