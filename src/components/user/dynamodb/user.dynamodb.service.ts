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
            AttributeName: 'email',
            KeyType: 'HASH',
        },
        { // Optional RANGE key type for HASH + RANGE tables
            AttributeName: 'encryptedPassword', 
            KeyType: 'RANGE', 
        }
    ],
    AttributeDefinitions: [ // The names and types of all primary and index key attributes only
        {
            AttributeName: 'email',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'encryptedPassword',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'id',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'createdAt',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'status',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'role',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        }
    ],
    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1, 
    },
    GlobalSecondaryIndexes: [ // optional (list of GlobalSecondaryIndex)
        { 
            IndexName: 'id_createdAt_index', 
            KeySchema: [
                { // Required HASH type attribute
                    AttributeName: 'id',
                    KeyType: 'HASH',
                },
                { // Optional RANGE key type for HASH + RANGE secondary indexes
                    AttributeName: 'createdAt', 
                    KeyType: 'RANGE', 
                }
            ],
            Projection: { // attributes to project into the index
                ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)
            },
            ProvisionedThroughput: { // throughput to provision to the index
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
        },
        { 
            IndexName: 'status_createdAt_index', 
            KeySchema: [
                { // Required HASH type attribute
                    AttributeName: 'status',
                    KeyType: 'HASH',
                },
                { // Optional RANGE key type for HASH + RANGE secondary indexes
                    AttributeName: 'createdAt', 
                    KeyType: 'RANGE', 
                }
            ],
            Projection: { // attributes to project into the index
                ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)
            },
            ProvisionedThroughput: { // throughput to provision to the index
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
        },
        { 
            IndexName: 'role_createdAt_index', 
            KeySchema: [
                { // Required HASH type attribute
                    AttributeName: 'role',
                    KeyType: 'HASH',
                },
                { // Optional RANGE key type for HASH + RANGE secondary indexes
                    AttributeName: 'createdAt', 
                    KeyType: 'RANGE', 
                }
            ],
            Projection: { // attributes to project into the index
                ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)
            },
            ProvisionedThroughput: { // throughput to provision to the index
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
        },
    ]
};
dynamodb.createTable(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response

});
*/
