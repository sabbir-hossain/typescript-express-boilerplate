import { userStatus, userRole } from './../../config';

export interface IUserModel {
  id?:string;
  name: string;
  email: string;
  salt: string;
  encryptedPassword: string;
  status: string;
  role?:string;
  dbName?:string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserSignUpModel {
  id?:string;
  name: string;
  email: string;
  password: string;
  status: string;
  role?:string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserSignInModel {
  email: string;
  password: string;
}

export const userRules = {
  name: "string",
  email: "email|required",
  password: "required",
  status: `string|in:${userStatus.ACTIVE},${userStatus.IN_ACTIVE},${userStatus.DELETED}`,
  role: `string|in:${userRole.ADMIN},${userRole.CLIENT}`
}