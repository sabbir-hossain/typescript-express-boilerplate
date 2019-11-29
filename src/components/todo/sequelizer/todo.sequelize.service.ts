import {injectable, inject} from "inversify";
import { DataTypes, Model   } from "sequelize";

import {TYPES} from "../../../types";
import {ITodoModel} from "../todo.model.interface";
import {ITodoMethods} from "../todo.methods.interface";
import { ISequelize } from "../../../database/sequelize/sequelize.interface";

import { sequelize } from "../../../database";
import { todoSequelizeTbl, todoStatus } from "../../../config";

@injectable()
export class TodoSequelizeService  implements ITodoSequelizeService  {

  private _sequelize:ISequelize;
  private _todoSchema:any;

  constructor( @inject(TYPES.ISequelize) typeSequelize ) {
    this._sequelize = typeSequelize;

    this._todoSchema = sequelize.define(todoSequelizeTbl, {
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      status: {
        type: new DataTypes.ENUM( todoStatus.COMPLETE, todoStatus.IN_COMPLETE, todoStatus.IN_PROGRESS )
      },
      startDate: {
        type: new DataTypes.DATE,
        allowNull: true
      },
      endDate: {
        type: new DataTypes.DATE,
        allowNull: true
      },
      ref: {
        type: new DataTypes.STRING(128),
        allowNull: true
      },
      user: {
        type: new DataTypes.STRING(128),
        allowNull: true
      },
      createdAt: {
        type: new DataTypes.DATE,
        field: "created_at"
      },
      updatedAt: {
        type:  new DataTypes.DATE,
        field: "modified_at"
      }
    })
  }

  create(data:ITodoModel):Promise<ITodoModel> {

    return new Promise( (resolve, reject) => {
      this._todoSchema
          .create(data)
          .then(resp => resolve(resp))
          .catch(error => reject(error));
    })
  }
}

export interface ITodoSequelizeService  extends ITodoMethods {

}

/* mysql */

/*

CREATE TABLE `tododb`.`todoes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(245) NULL,
  `status` VARCHAR(245) NULL,
  `startDate` DATE NULL,
  `endDate`  DATE NULL,
  `ref` VARCHAR(245) NULL,
  `user` VARCHAR(245) NULL,
  `created_at` DATE NULL,
  `modified_at` DATE NULL,
  PRIMARY KEY (`id`)
);

*/