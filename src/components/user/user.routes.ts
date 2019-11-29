import {Request, Response, NextFunction} from "express";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";

import {IUserController} from "./user.controller";

import { errorHandler } from "../../helpers";

@injectable()
class UserRoute implements IUserRoute {

  private _userController:IUserController;

  constructor( @inject(TYPES.IUserController) userController:IUserController ) {
    this._userController = userController;
  }

  create(req: Request, res: Response, next: NextFunction) {
    return this._userController.create(req.body)
      .then(resp => {
        return res.send(resp);
      })
      .catch(error => {
        return errorHandler(res, error);
      })
  }

  login(req: Request, res: Response, next: NextFunction) {
    return this._userController.userAuth(req.body)
      .then(resp => {
        return res.send(resp);
      })
      .catch(error => {
        console.log({error})
        return errorHandler(res, error);
      })
  }
}

export {UserRoute};

export interface IUserRoute {
  create(req: Request, res: Response, next: NextFunction);
  login(req: Request, res: Response, next: NextFunction);
}
