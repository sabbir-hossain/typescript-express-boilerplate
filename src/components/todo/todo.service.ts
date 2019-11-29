import {injectable, inject} from "inversify";

import {TYPES} from "../../types";
import {ITodoModel} from "./todo.model.interface";
import {ITodoMethods} from "./todo.methods.interface";

import { ITodoMongooseService } from "./mongoose/todo.mongoose.service";

@injectable()
export class TodoService  implements ITodoService  {

  private _todoMongooseService:ITodoMongooseService;

  constructor( @inject(TYPES.ITodoMongooseService) todoMongooseService:ITodoMongooseService ) {
    this._todoMongooseService = todoMongooseService;
  }

  create(data:ITodoModel):Promise<ITodoModel> {
    return this._todoMongooseService.create(data);
  }
}

export interface ITodoService  extends ITodoMethods {

}
