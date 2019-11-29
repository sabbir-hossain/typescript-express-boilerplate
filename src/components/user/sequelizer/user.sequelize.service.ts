import {injectable, inject} from "inversify";
import { DataTypes, Model   } from "sequelize";

import {TYPES} from "../../../types";
import {IUserModel} from "../user.model.interface";
import {IUserMethods} from "../user.methods.interface";
import { ISequelize } from "../../../database/sequelize/sequelize.interface";

import { sequelize } from "../../../database";
import { userSequelizeTbl, userStatus, userRole } from "../../../config";

@injectable()
export class UserSequelizeService  implements IUserSequelizeService  {

  private _sequelize:ISequelize;
  private _userSchema:any;

  constructor( @inject(TYPES.ISequelize) typeSequelize ) {
    this._sequelize = typeSequelize;

    this._userSchema = sequelize.define(userSequelizeTbl, {
      name: {
        type: new DataTypes.STRING(128)
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      salt: {
        type: new DataTypes.TEXT,
        allowNull: false,
      },
      encryptedPassword: {
        type: new DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: new DataTypes.ENUM( userStatus.ACTIVE, userStatus.IN_ACTIVE, userStatus.DELETED )
      },
      role: {
        type: new DataTypes.ENUM( userRole.ADMIN, userRole.CLIENT )
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

CREATE TABLE `tododb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(245) NULL,
  `email` VARCHAR(245) NOT NULL,
  `salt` TEXT NOT NULL,
  `encryptedPassword` VARCHAR(245) NOT NULL,
  `status` VARCHAR(245) NULL,
  `role` VARCHAR(245) NULL,
  `created_at` DATE NULL,
  `modified_at` DATE NULL,
  PRIMARY KEY (`id`)
);

*/