import * as Q from "q";
import {IDemoModel} from "./demo.model.interface";

export interface IDemoMethods {
  create(data:IDemoModel):Promise<IDemoModel>;
}
