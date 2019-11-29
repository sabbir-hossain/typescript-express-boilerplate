import {injectable, inject} from "inversify";
import {TYPES} from "../../types";

import {ITodoMethods} from "./todo.methods.interface";
import {ITodoModel, todoRules} from "./todo.model.interface";
import { ITodoService} from "./todo.service";
import { todoStatus } from "../../config";
import { validation } from './../../helpers/validator';

@injectable()
export class TodoController implements ITodoController {
  private _todoService:ITodoService;
  constructor( @inject(TYPES.ITodoService) todoService:ITodoService ) {
    this._todoService = todoService;
  }

  create(data:ITodoModel):any {
    try {
      const {name, status=todoStatus.IN_PROGRESS, ref, startDate, endDate} = data;
      validation(data, todoRules);
      return this._todoService.create({name, status, ref, startDate, endDate })
        .catch(error => Promise.reject(error))
    } catch (err) {
      return Promise.reject(err);
    }
  }

}

export interface ITodoController extends ITodoMethods{

}
