import {injectable} from "inversify";

import {IUserModel} from "../user.model.interface";
import {IUserMethods} from "../user.methods.interface";

import { uuid, todayISOString, removeEmptyObject } from "../../../helpers";
import { Neo4j } from "../../../database";
import { userNeo4jTbl } from "../../../config";

@injectable()
export class UserNeo4jService  implements IUserNeo4jService  {

  create(data:IUserModel):Promise<IUserModel> {

    const userData = removeEmptyObject(data);
    userData["id"] = uuid();
    userData["createAt"] = `${todayISOString()}`;
    userData["updatedAt"] = `${todayISOString()}`;
    userData["dbName"] = "neo4j";

    return new Promise( (resolve, reject) => {
      const query = `CREATE (usr:${userNeo4jTbl} ${Neo4j.insertQuery(userData)})
      RETURN properties(usr)`;

      return Neo4j.db.run(query, userData)
        .then(resp => resp[0])
        .then(resp => resolve(resp))
        .catch(error => reject(error));
    })
  }

  findByEmail(email:string):Promise<IUserModel> {
    const query = `MATCH (usr:${userNeo4jTbl} { email: "${email.toLowerCase()}" })
      RETURN PROPERTIES(usr) LIMIT 1`;

    return new Promise( (resolve, reject) => {
      return Neo4j.db.run(query)
        .then(resp => resp[0])
        .then(resp => resolve( resp))
        .catch(error => reject(error));
    })

  }
}

export interface IUserNeo4jService  extends IUserMethods {

}
