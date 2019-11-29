import { userStatus, userRole } from './../../config';

export interface IUserModel {
  id?:string;
  name: string;
  email: string;
  salt: string;
  encryptedPassword: string;
  status: string;
  role?:string;
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

export const userRules = {
  name: "string|required",
  email: "email|required",
  password: "required",
  status: `string|in:${userStatus.ACTIVE},${userStatus.IN_ACTIVE},${userStatus.DELETED}`,
  role: `string|in:${userRole.ADMIN},${userRole.CLIENT}`
}