import {injectable, inject} from "inversify";

import {TYPES} from "../../types";
import {ITodoModel} from "./todo.model.interface";

import { ITodoMongooseService } from "./mongoose/todo.mongoose.service";
import { ITodoSequelizeService } from "./sequelizer/todo.sequelize.service";

@injectable()
export class TodoService  implements ITodoService  {

  private _todoMongooseService:ITodoMongooseService;
  private _todoSequelizeService:ITodoSequelizeService;

  constructor( 
    @inject(TYPES.ITodoMongooseService) todoMongooseService:ITodoMongooseService,
    @inject(TYPES.ITodoSequelizeService) todoSequelizeService:ITodoSequelizeService
    ) {
    this._todoMongooseService = todoMongooseService;
    this._todoSequelizeService = todoSequelizeService;
  }

  create(data:ITodoModel):Promise<ITodoModel[]> {
    const result = [ 
      this._todoMongooseService.create(data),
      this._todoSequelizeService.create(data)
    ];

    return Promise.all(result)
      .catch(error => Promise.reject(error))
  }
}

export interface ITodoService {
  create(data:ITodoModel):Promise<ITodoModel[]>;
}
