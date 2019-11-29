import {injectable, inject} from "inversify";
import * as crypto from "crypto";
import {TYPES} from "../../types";

import {IUserMethods} from "./user.methods.interface";
import {IUserModel, IUserSignUpModel, IUserSignInModel, userRules} from "./user.model.interface";
import { IUserService} from "./user.service";
import { userStatus, userRole } from "../../config";
import { validation, generateToken } from './../../helpers';

@injectable()
export class UserController implements IUserController {
  private _userService:IUserService;
  constructor( @inject(TYPES.IUserService) userService:IUserService ) {
    this._userService = userService;
  }

  public create(data:IUserSignUpModel):Promise<IUserModel[]> {
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

  private _validatePassword(password,  loginUser):boolean {

    if( loginUser === undefined || typeof  loginUser['salt'] === 'undefined' || loginUser['salt'] === ''  ) {
      throw({status: 401, msg: "Invalid email/password"})
    }

    const { salt, encryptedPassword } = loginUser;

    let userEncryptedPassword =  crypto.pbkdf2Sync(password, new Buffer( salt ), 10000, 64, 'sha512').toString('base64');

    if ( userEncryptedPassword === encryptedPassword ) {
      return true;
    } else {
      throw({status: 400, msg: "Invalid email/password"});
    }
  }

  private _generateAuthLogin(response) {
    try {
      return generateToken({...response})
        .then(token => {
          return Promise.resolve({
            authData: response,
            token
          })
        })
        .catch(error => Promise.reject(error) );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public userAuth(data:IUserSignInModel):Promise<any> {
    try {
      const {
        email, 
        password
      } = data;

      validation(data, userRules);

    return this._userService.findByEmail(email)
      .then(response => {
        return response.reduce(( total, loginUser) => {
          this._validatePassword(password, loginUser)
          const { id, name, dbName, email, status, role } = loginUser;
          // return { id, name, email, salt, encryptedPassword, status, role };
          total[`${dbName}_id`] = id;
          total[`name`] = name;
          total[`email`] = email;
          total[`status`] = status;
          total[`role`] = role;
          return total;
        }, {})
      })
      .then(resp => this._generateAuthLogin(resp))
      .catch(error => {
        return Promise.reject(error);
      })
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export interface IUserController {
  create(data:IUserSignUpModel):Promise<IUserModel[]>;
  userAuth(data:IUserSignInModel):Promise<any>
}
