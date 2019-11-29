import {injectable, inject} from "inversify";
import {UserMongooseModel} from "./user.mongoose.model.interface";
import {IUserModel} from "../user.model.interface";
import {IUserMethods} from "../user.methods.interface";

@injectable()
export class UserMongooseService  implements IUserMongooseService  {

  create(data:IUserModel):Promise<IUserModel> {
    const newUser =  new UserMongooseModel(data);

    return new Promise( (resolve, reject) => {
        newUser
          .save()
          .then( resp => resolve(resp))
          .catch(error => reject(error))
    })
  }
}

export interface IUserMongooseService  extends IUserMethods {

}
