import {injectable, inject} from "inversify";
import {TYPES} from "../../types";

import {ITodoMethods} from "./todo.methods.interface";
import {ITodoModel, todoRules} from "./todo.model.interface";

import { validation } from './../../helpers/validator';

@injectable()
export class TodoController implements ITodoController {

  constructor( ) {}

  create(data:ITodoModel):any {
    try {
      validation(data, todoRules);
      return Promise.resolve({...data, a: "aaaa"});
    } catch (err) {
      return Promise.reject(err);
    }
  }

}

export interface ITodoController extends ITodoMethods{

}
