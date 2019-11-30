import * as Q from "q";
import {ITodoModel} from "./todo.model.interface";

export interface ITodoMethods {
  create(decoded:IPayload,  data:ITodoModel):Promise<ITodoModel>;
  list(decoded:IPayload):Promise<ITodoModel[]>;
}
