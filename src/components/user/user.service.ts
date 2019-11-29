import {injectable, inject} from "inversify";

import {TYPES} from "../../types";
import {IUserModel} from "./user.model.interface";

import { IUserMongooseService } from "./mongoose/user.mongoose.service";
import { IUserSequelizeService } from "./sequelizer/user.sequelize.service";
import { IUserDynamoDbService } from "./dynamodb/user.dynamodb.service";
import { IUserNeo4jService } from "./neo4j/user.neo4j.service";

@injectable()
export class UserService  implements IUserService  {

  private _userMongooseService:IUserMongooseService;
  private _userSequelizeService:IUserSequelizeService;
  private _userDynamoDbService:IUserDynamoDbService;
  private _userNeo4jService:IUserNeo4jService;

  constructor( 
    @inject(TYPES.IUserMongooseService) userMongooseService:IUserMongooseService,
    @inject(TYPES.IUserSequelizeService) userSequelizeService:IUserSequelizeService,
    @inject(TYPES.IUserDynamoDbService) userDynamoDbService:IUserDynamoDbService,
    @inject(TYPES.IUserNeo4jService) userNeo4jService:IUserNeo4jService
    ) {
    this._userMongooseService = userMongooseService;
    this._userSequelizeService = userSequelizeService;
    this._userDynamoDbService = userDynamoDbService;
    this._userNeo4jService = userNeo4jService;
  }

  create(data:IUserModel):Promise<IUserModel[]> {
    const result = [ 
      this._userMongooseService.create(data),
      this._userSequelizeService.create(data),
      this._userDynamoDbService.create(data),
      this._userNeo4jService.create(data)
    ];

    return Promise.all(result)
      .catch(error => Promise.reject(error))
  }

  findByEmail(email):Promise<any> {
    const result = [ 
      this._userMongooseService.findByEmail(email),
      this._userSequelizeService.findByEmail(email),
      this._userDynamoDbService.findByEmail(email),
      this._userNeo4jService.findByEmail(email)
    ];

    return Promise.all(result)
      .catch(error => Promise.reject(error))
  }
}

export interface IUserService {
  create(data:IUserModel):Promise<IUserModel[]>;
  findByEmail(email):Promise<any>;
}
