import {injectable} from "inversify";

import {ITodoModel} from "../todo.model.interface";
import {ITodoMethods} from "../todo.methods.interface";

import { uuid, todayISOString, removeEmptyObject } from "../../../helpers";
import { Neo4j } from "../../../database";
import { todoNeo4jTbl } from "../../../config";

@injectable()
export class TodoNeo4jService  implements ITodoNeo4jService  {

  create(data:ITodoModel):Promise<ITodoModel> {

    const todoData = removeEmptyObject(data);
    todoData["id"] = uuid();
    todoData["createAt"] = `${todayISOString()}`;
    todoData["updatedAt"] = `${todayISOString()}`;

    return new Promise( (resolve, reject) => {
      const query = `CREATE (td:${todoNeo4jTbl} ${Neo4j.insertQuery(todoData)})
      RETURN properties(td)`;

      return Neo4j.db.run(query, todoData)
        .then(resp => resolve(resp))
        .catch(error => reject(error));
    })
  }
}

export interface ITodoNeo4jService  extends ITodoMethods {

}
