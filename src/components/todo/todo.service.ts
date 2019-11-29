import { injectable, inject } from "inversify";

import { TYPES } from "../../types";
import { ITodoModel } from "./todo.model.interface";

import { ITodoMongooseService } from "./mongoose/todo.mongoose.service";
import { ITodoSequelizeService } from "./sequelizer/todo.sequelize.service";
import { ITodoDynamoDbService } from "./dynamodb/todo.dynamodb.service";
import { ITodoNeo4jService } from "./neo4j/todo.neo4j.service";

@injectable()
export class TodoService  implements ITodoService  {

  private _todoMongooseService:ITodoMongooseService;
  private _todoSequelizeService:ITodoSequelizeService;
  private _todoDynamoDbService:ITodoDynamoDbService;
  private _todoNeo4jService:ITodoNeo4jService;

  constructor( 
    @inject(TYPES.ITodoMongooseService) todoMongooseService:ITodoMongooseService,
    @inject(TYPES.ITodoSequelizeService) todoSequelizeService:ITodoSequelizeService,
    @inject(TYPES.ITodoDynamoDbService) todoDynamoDbService:ITodoDynamoDbService,
    @inject(TYPES.ITodoNeo4jService) todoNeo4jService:ITodoNeo4jService
    ) {
    this._todoMongooseService = todoMongooseService;
    this._todoSequelizeService = todoSequelizeService;
    this._todoDynamoDbService = todoDynamoDbService;
    this._todoNeo4jService = todoNeo4jService;
  }

  create(data:ITodoModel):Promise<ITodoModel[]> {
    const result = [ 
      this._todoMongooseService.create(data),
      this._todoSequelizeService.create(data),
      this._todoDynamoDbService.create(data),
      this._todoNeo4jService.create(data)
    ];

    return Promise.all(result)
      .catch(error => Promise.reject(error))
  }
}

export interface ITodoService {
  create(data:ITodoModel):Promise<ITodoModel[]>;
}
