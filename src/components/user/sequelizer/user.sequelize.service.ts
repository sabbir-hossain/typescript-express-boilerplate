import {injectable, inject} from "inversify";
import { DataTypes, Model   } from "sequelize";

import {TYPES} from "../../../types";
import {IUserModel} from "../user.model.interface";
import {IUserMethods} from "../user.methods.interface";
import { ISequelize } from "../../../database/sequelize/sequelize.interface";

import { sequelize } from "../../../database";
import { userSequelizeTbl, userStatus } from "../../../config";

@injectable()
export class UserSequelizeService  implements IUserSequelizeService  {

  private _sequelize:ISequelize;
  private _userSchema:any;

  constructor( @inject(TYPES.ISequelize) typeSequelize ) {
    this._sequelize = typeSequelize;

    this._userSchema = sequelize.define(userSequelizeTbl, {
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      status: {
        type: new DataTypes.ENUM( userStatus.COMPLETE, userStatus.IN_COMPLETE, userStatus.IN_PROGRESS )
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

  create(data:IUserModel):Promise<IUserModel> {

    return new Promise( (resolve, reject) => {
      this._userSchema
          .create(data)
          .then(resp => resolve(resp))
          .catch(error => reject(error));
    })
  }
}

export interface IUserSequelizeService  extends IUserMethods {

}

/* mysql */

/*

CREATE TABLE `userdb`.`useres` (
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