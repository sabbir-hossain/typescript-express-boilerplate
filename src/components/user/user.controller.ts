import {injectable, inject} from "inversify";
import {TYPES} from "../../types";

import {IUserMethods} from "./user.methods.interface";
import {IUserModel, userRules} from "./user.model.interface";
import { IUserService} from "./user.service";
import { userStatus } from "../../config";
import { validation } from './../../helpers/validator';

@injectable()
export class UserController implements IUserController {
  private _userService:IUserService;
  constructor( @inject(TYPES.IUserService) userService:IUserService ) {
    this._userService = userService;
  }

  create(data:IUserModel):any {
    try {
      const {name, status=userStatus.IN_PROGRESS, ref, startDate, endDate} = data;
      validation(data, userRules);
      return this._userService.create({name, status, ref, startDate, endDate })
        .catch(error => Promise.reject(error))
    } catch (err) {
      return Promise.reject(err);
    }
  }

}

export interface IUserController extends IUserMethods{

}
