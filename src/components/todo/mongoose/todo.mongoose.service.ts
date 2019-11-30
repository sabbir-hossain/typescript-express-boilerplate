import {injectable, inject} from "inversify";
import {TodoMongooseModel} from "./todo.mongoose.model.interface";
import {ITodoModel} from "../todo.model.interface";
import {ITodoMethods} from "../todo.methods.interface";
import { ObjectId } from "../../../database";

@injectable()
export class TodoMongooseService  implements ITodoMongooseService  {

  create(decoded:IPayload, data:ITodoModel):Promise<any> {
    const { mongodb_id="" } = decoded || {};

    data['dbName'] = "mongodb";
    data['user'] = mongodb_id;
    const newTodo =  new TodoMongooseModel(data);

    return new Promise( (resolve, reject) => {
        newTodo
          .save()
          .then( resp => resolve( resp))
          .catch(error => reject(error))
    })
  }

  list(decoded:IPayload):Promise<any> {
    const { mongodb_id="" } = decoded || {};

    return new Promise( (resolve, reject) => {
      TodoMongooseModel
        .find({user: new ObjectId(mongodb_id)  })
        .then(resp => resolve({ mongodb: resp }))
        .catch(error => reject(error));
    })
  }
}

export interface ITodoMongooseService  extends ITodoMethods {

}
