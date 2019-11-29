import {injectable, inject} from "inversify";
import * as crypto from "crypto";
import {TYPES} from "../../types";

import {IUserMethods} from "./user.methods.interface";
import {IUserModel, IUserSignUpModel, userRules} from "./user.model.interface";
import { IUserService} from "./user.service";
import { userStatus, userRole } from "../../config";
import { validation } from './../../helpers/validator';

@injectable()
export class UserController implements IUserController {
  private _userService:IUserService;
  constructor( @inject(TYPES.IUserService) userService:IUserService ) {
    this._userService = userService;
  }

  create(data:IUserSignUpModel):Promise<IUserModel[]> {
    try {
      const {
        name, 
        email, 
        password, 
        status=userStatus.ACTIVE, 
        role=userRole.CLIENT
      } = data;

      validation(data, userRules);

      let salt, encryptedPassword = ';'

      if (password !== undefined || password !== null || password !== "") {
        salt = crypto.randomBytes(512).toString('base64');
  
        encryptedPassword = crypto.pbkdf2Sync(
          password, new Buffer(salt), 10000, 64, 'sha512').toString('base64');
      } else {
        salt = null;
      }
      
      return this._userService.create({name, email, salt, encryptedPassword, status, role })
        .catch(error => Promise.reject(error))
    } catch (err) {
      return Promise.reject(err);
    }
  }

}

export interface IUserController {
  create(data:IUserSignUpModel):Promise<IUserModel[]>
}
