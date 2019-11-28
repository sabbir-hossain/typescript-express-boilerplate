import {Request, Response, NextFunction} from "express";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";

import {IDemoController} from "./demo.controller";

@injectable()
class DemoRoute implements IDemoRoute {

  private _demoController:IDemoController;

  constructor( @inject(TYPES.IDemoController) demoController:IDemoController ) {
    this._demoController = demoController;
  }

  create(req: Request, res: Response, next: NextFunction) {

    return  this._demoController.create(req.body)
      .then(resp => {
        return res.send(resp);
      })
      .catch(error => {
        return res.send(error);
      })
  }
}

export {DemoRoute};

export interface IDemoRoute {
  create(req: Request, res: Response, next: NextFunction);
}
