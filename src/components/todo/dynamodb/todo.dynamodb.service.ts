import {injectable} from "inversify";

import {ITodoModel} from "../todo.model.interface";
import {ITodoMethods} from "../todo.methods.interface";

import { uuid, todayISOString, removeEmptyObject } from "../../../helpers";
import { todoDynamoDbTbl } from "../../../config";
import { docClient } from "../../../database";

@injectable()
export class TodoDynamoDbService  implements ITodoDynamoDbService  {

  create(data:ITodoModel):Promise<any> {

    const todoData = removeEmptyObject(data);
    todoData["id"] = uuid();
    todoData["createAt"] = `${todayISOString()}`;
    todoData["updatedAt"] = `${todayISOString()}`;
    todoData["dbName"] = "dynamodb";

    const params = {
      TableName: todoDynamoDbTbl,
      Item: {...todoData}
    }

    return new Promise( (resolve, reject) => {
      docClient.put(params, (error, resp) => {
        if(error) {
          return reject(error);
        }
        return resolve(todoData);
      })
    })
  }
}

export interface ITodoDynamoDbService  extends ITodoMethods {

}


/*
var params = {
    TableName: 'todo',
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
        },
        {
            AttributeName: 'ref',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'status',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'user',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        }
    ],
    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1, 
    },
    GlobalSecondaryIndexes: [ // optional (list of GlobalSecondaryIndex)
        { 
            IndexName: 'user_status_index', 
            KeySchema: [
                { // Required HASH type attribute
                    AttributeName: 'status',
                    KeyType: 'HASH',
                },
                { // Optional RANGE key type for HASH + RANGE secondary indexes
                    AttributeName: 'user', 
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
            IndexName: 'ref_status_index', 
            KeySchema: [
                { // Required HASH type attribute
                    AttributeName: 'ref',
                    KeyType: 'HASH',
                },
                { // Optional RANGE key type for HASH + RANGE secondary indexes
                    AttributeName: 'status', 
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
