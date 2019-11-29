import * as Q from "q";
import {IUserModel} from "./user.model.interface";

export interface IUserMethods {
  create(data:IUserModel):Promise<IUserModel>;
  findByEmail(email):Promise<IUserModel>;
}
