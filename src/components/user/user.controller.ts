import {injectable, inject} from "inversify";
import {TYPES} from "../../types";

import {IUserMethods} from "./user.methods.interface";
import {IUserModel, userRules} from "./user.model.interface";
import { IUserService} from "./user.service";
import { userStatus, userRole } from "../../config";
import { validation } from './../../helpers/validator';

@injectable()
export class UserController implements IUserController {
  private _userService:IUserService;
  constructor( @inject(TYPES.IUserService) userService:IUserService ) {
    this._userService = userService;
  }

  create(data:IUserModel):any {
    try {
      const {
        name, 
        email, 
        password, 
        status=userStatus.ACTIVE, 
        role=userRole.CLIENT
      } = data;

      validation(data, userRules);
      
      return this._userService.create({name, email, password, status, role })
        .catch(error => Promise.reject(error))
    } catch (err) {
      return Promise.reject(err);
    }
  }

}

export interface IUserController extends IUserMethods{

}
