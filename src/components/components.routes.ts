// Library Imports
import { inject, injectable } from "inversify";
import * as express from "express";
import { Router } from "express";
import { TYPES } from "../types";
// Common

import { ITodoRoute } from './todo/todo.routes';

@injectable()
export class ComponentRoutes implements IComponentRoutes {
  private router: Router;

  constructor(
    @inject(TYPES.ITodoRoute) private classRoute:ITodoRoute
  ) {
    this.router = express.Router();
  }

  setupRoutes(app): any {
    // Todo
    this.router.post("/todo/create", this.classRoute.create.bind(this.classRoute))

    return this.router;
  }
}

export interface IComponentRoutes {
  setupRoutes(app): any;
}
