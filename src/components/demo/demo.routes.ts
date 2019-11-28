import {Request, Response, NextFunction} from "express";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";

import {IDemoController} from "./demo.controller";

@injectable()
class DemoRoute implements IDemoRoute {

  private _classController:IDemoController;

  constructor( @inject(TYPES.IDemoController) classController:IDemoController ) {
    this._classController = classController;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._classController.create(req.body);
      return res.send(result);
    }
    catch(error) {
      console.log({error})
      return res.send(error);
    }
  }
}

export {DemoRoute};

export interface IDemoRoute {
  create(req: Request, res: Response, next: NextFunction);
}
