import { userStatus } from './../../config';

export interface IUserModel {
  id?:string;
  name: string;
  status: string;
  startDate?:Date;
  endDate?:Date;
  ref?: string;
  user?:string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const userRules = {
  name: "string|required",
  status: `string|in:${userStatus.COMPLETE},${userStatus.IN_COMPLETE},${userStatus.IN_PROGRESS}`,
  ref: "string",
  startDate: "date",
  endDate: "date",
  user: "string"
}