import {injectable} from "inversify";

import {ITodoModel} from "../todo.model.interface";
import {ITodoMethods} from "../todo.methods.interface";

import { uuid, todayISOString, removeEmptyObject } from "../../../helpers";
import { Neo4j } from "../../../database";
import { todoNeo4jTbl, userNeo4jTbl } from "../../../config";

@injectable()
export class TodoNeo4jService  implements ITodoNeo4jService  {

  create(decoded:IPayload, data:ITodoModel):Promise<ITodoModel> {
    const {neo4j_id="" } = decoded || {};

    const todoData = removeEmptyObject(data);
    todoData["id"] = uuid();
    todoData["createAt"] = `${todayISOString()}`;
    todoData["updatedAt"] = `${todayISOString()}`;
    todoData["dbName"] = "neo4j";

    const query = `CREATE (td:${todoNeo4jTbl} ${Neo4j.insertQuery(todoData)})
        WITH td
          MATCH (usr:${userNeo4jTbl} { id: "${neo4j_id}" }) 
        WITH td, usr
          CREATE (usr)-[r:USER_TODO]->(td)

      RETURN properties(td)`;

    return new Promise( (resolve, reject) => {
      return Neo4j.db.run(query, todoData)
        .then(resp => resp[0])
        .then(resp => resolve(resp))
        .catch(error => reject(error));
    })
  }

  list(decoded:IPayload):Promise<any> {
    const {neo4j_id="" } = decoded || {};

    const query = `MATCH (usr:${userNeo4jTbl} { id: "${neo4j_id}" })-[r:USER_TODO]->(td:${todoNeo4jTbl})
      RETURN properties(td)`;

    return new Promise( (resolve, reject) => {
      return Neo4j.db.run(query)
        .then(resp => resolve({ neo4j: resp }))
        .catch(error => reject(error));
    })
  }
}

export interface ITodoNeo4jService  extends ITodoMethods {

}
