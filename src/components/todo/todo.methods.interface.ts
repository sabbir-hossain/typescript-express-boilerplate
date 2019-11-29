import * as Q from "q";
import {ITodoModel} from "./todo.model.interface";

export interface ITodoMethods {
  create(data:ITodoModel):Promise<ITodoModel>;
}
