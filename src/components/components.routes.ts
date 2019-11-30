// Library Imports
import { inject, injectable } from "inversify";
import * as express from "express";
import { Router } from "express";
import { TYPES } from "../types";
// Common

import { ITodoRoute } from './todo/todo.routes';
import { IUserRoute } from "./user/user.routes";

@injectable()
export class ComponentRoutes implements IComponentRoutes {
  private router: Router;

  constructor(
    @inject(TYPES.ITodoRoute) private todoRoute:ITodoRoute,
    @inject(TYPES.IUserRoute) private userRoute:IUserRoute
  ) {
    this.router = express.Router();
  }

  setupRoutes(app): any {
    // Todo
    this.router.post("/todo/create", this.todoRoute.create.bind(this.todoRoute))
    this.router.get("/todo/list", this.todoRoute.list.bind(this.todoRoute))

    // User
    this.router.post("/signup", this.userRoute.create.bind(this.userRoute));
    this.router.post("/login", this.userRoute.login.bind(this.userRoute));

    return this.router;
  }
}

export interface IComponentRoutes {
  setupRoutes(app): any;
}
