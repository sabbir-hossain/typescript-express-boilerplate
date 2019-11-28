import {injectable, inject} from "inversify";
import {TYPES} from "../../types";

import {IDemoMethods} from "./demo.methods.interface";
import {IDemoModel, demoRules} from "./demo.model.interface";

import { validation } from './../../helpers/validator';

@injectable()
export class DemoController implements IDemoController {

  constructor( ) {}

  create(data:IDemoModel):any {
    try {
      validation(data, demoRules);
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

}

export interface IDemoController extends IDemoMethods{

}
