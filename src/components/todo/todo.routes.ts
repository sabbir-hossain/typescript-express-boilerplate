import {Request, Response, NextFunction} from "express";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";

import {ITodoController} from "./todo.controller";

import { errorHandler } from "../../helpers";

@injectable()
class TodoRoute implements ITodoRoute {

  private _todoController:ITodoController;

  constructor( @inject(TYPES.ITodoController) todoController:ITodoController ) {
    this._todoController = todoController;
  }

  create(req: Request, res: Response, next: NextFunction) {
    return this._todoController.create(req.body)
      .then(resp => {
        return res.send(resp);
      })
      .catch(error => {
        console.error({error})
        return errorHandler(res, error);
      })
  }
}

export {TodoRoute};

export interface ITodoRoute {
  create(req: Request, res: Response, next: NextFunction);
}
