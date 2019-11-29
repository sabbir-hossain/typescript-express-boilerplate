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

    return new Promise( (resolve, reject) => {
      const query = `CREATE (td:${userNeo4jTbl} ${Neo4j.insertQuery(userData)})
      RETURN properties(td)`;

      return Neo4j.db.run(query, userData)
        .then(resp => resolve(resp))
        .catch(error => reject(error));
    })
  }
}

export interface IUserNeo4jService  extends IUserMethods {

}
