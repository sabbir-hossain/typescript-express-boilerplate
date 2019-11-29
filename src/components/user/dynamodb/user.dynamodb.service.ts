import {injectable} from "inversify";

import {IUserModel} from "../user.model.interface";
import {IUserMethods} from "../user.methods.interface";

import { uuid, todayISOString, removeEmptyObject } from "../../../helpers";
import { userDynamoDbTbl } from "../../../config";
import { docClient } from "../../../database";

@injectable()
export class UserDynamoDbService  implements IUserDynamoDbService  {

  create(data:IUserModel):Promise<any> {

    const userData = removeEmptyObject(data);
    userData["id"] = uuid();
    userData["createAt"] = `${todayISOString()}`;
    userData["updatedAt"] = `${todayISOString()}`;

    const params = {
      TableName: userDynamoDbTbl,
      Item: {...userData}
    }

    return new Promise( (resolve, reject) => {
      docClient.put(params, (error, resp) => {
        if(error) {
          return reject(error);
        }
        return resolve(userData);
      })
    })
  }
}

export interface IUserDynamoDbService  extends IUserMethods {

}


/*
var params = {
    TableName: 'user',
    KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
        { // Required HASH type attribute
            AttributeName: 'id',
            KeyType: 'HASH',
        }
    ],
    AttributeDefinitions: [ // The names and types of all primary and index key attributes only
        {
            AttributeName: 'id',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        }
    ],
    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1, 
    }
};
dynamodb.createTable(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response

});
*/
