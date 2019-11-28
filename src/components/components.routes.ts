// Library Imports
import { inject, injectable } from "inversify";
import * as express from "express";
import { Router } from "express";
import { TYPES } from "../types";
// Common

import { IDemoRoute } from './demo/demo.routes';


@injectable()
export class ComponentRoutes implements IComponentRoutes {
  private router: Router;

  constructor(
    @inject(TYPES.IDemoRoute) private classRoute:IDemoRoute
  ) {
    this.router = express.Router();
  }

  setupRoutes(app): any {

    // Demo
    this.router.post("/demo/create", this.classRoute.create.bind(this.classRoute))

    return this.router;
  }
}

export interface IComponentRoutes {
  setupRoutes(app): any;
}
