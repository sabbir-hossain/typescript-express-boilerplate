import {injectable, inject} from "inversify";
import {TYPES} from "../../types";

import {IDemoMethods} from "./demo.methods.interface";
import {IDemoModel, demoRules} from "./demo.model.interface";

import { validation } from './../../helpers/validator';

@injectable()
export class DemoController implements IDemoController {

  constructor( ) {}

  // create(data:IDemoModel):Promise<IDemoModel> {
  //   return Promise.resolve(data);
  // }

  create(data:IDemoModel):any {
    validation(data, demoRules);
    return Promise.resolve(data);
  }

}

export interface IDemoController extends IDemoMethods{

}
