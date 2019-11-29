import {injectable, inject} from "inversify";
import {TodoMongooseModel} from "./todo.mongoose.model.interface";
import {ITodoModel} from "../todo.model.interface";
import {ITodoMethods} from "../todo.methods.interface";

@injectable()
export class TodoMongooseService  implements ITodoMongooseService  {

  create(data:ITodoModel):Promise<ITodoModel> {
    const newTodo =  new TodoMongooseModel(data);

    return new Promise( (resolve, reject) => {
        newTodo
          .save()
          .then( resp => resolve(resp))
          .catch(error => reject(error))
    })
  }
}

export interface ITodoMongooseService  extends ITodoMethods {

}
