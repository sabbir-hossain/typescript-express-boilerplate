import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";

import { ITodoController } from "./todo.controller";
import { Authorize } from "../common"
import { errorHandler } from "../../helpers";

@injectable()
class TodoRoute implements ITodoRoute {

  private _todoController:ITodoController;

  constructor( @inject(TYPES.ITodoController) todoController:ITodoController ) {
    this._todoController = todoController;
  }

  @Authorize
  create(req: Request, res: Response, next: NextFunction) {
    return req.decoded && req.decoded.payload ? this._todoController.create(req.decoded.payload, req.body)
      .then(resp => {
        return res.send(resp);
      })
      .catch(error => {
        return errorHandler(res, error);
      })
      : errorHandler(res,  { status: 401 });
  }

  @Authorize
  list(req: Request, res: Response, next: NextFunction) {
    return req.decoded && req.decoded.payload ? this._todoController.list(req.decoded.payload)
      .then(resp => {
        return res.send(resp);
      })
      .catch(error => {
        return errorHandler(res, error);
      })
      :
      errorHandler(res,  { status: 401 });
  }
}

export {TodoRoute};

export interface ITodoRoute {
  create(req: Request, res: Response, next: NextFunction);
  list(req: Request, res: Response, next: NextFunction);
}
