import {injectable, inject} from "inversify";
import {UserMongooseModel} from "./user.mongoose.model.interface";
import {IUserModel} from "../user.model.interface";
import {IUserMethods} from "../user.methods.interface";

@injectable()
export class UserMongooseService  implements IUserMongooseService  {

  create(data:IUserModel):Promise<IUserModel> {
    data['dbName'] = "mongodb";
    const newUser =  new UserMongooseModel(data);

    return new Promise( (resolve, reject) => {
        newUser
          .save()
          .then( resp => resolve(resp))
          .catch(error => reject(error))
    })
  }

  findByEmail(email:string):Promise<IUserModel> {
    return new Promise( (resolve, reject) => {
      // UserMongooseModel.findOne({
      //   email
      // })
      // .then(resp => resolve(resp))
      // .catch(error => reject(error));

      UserMongooseModel.aggregate([
        {
          "$match": { email }
        },
        {
          "$project": {
            "id": "$_id",
            "email": "$email",
            "salt": "$salt",
            "encryptedPassword": "$encryptedPassword",
            "status": "$status",
            "role": "$role",
            "dbName": "$dbName",
            "_id": 0
          }
        }
      ])
      .then(resp => resp[0])
      .then(resp => resolve(resp))
      .catch(error => {
        return reject(error);
      });
    })
  }
}

export interface IUserMongooseService  extends IUserMethods {

}
