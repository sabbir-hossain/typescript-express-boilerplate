import { IUserMethods } from './user.methods.interface';

export interface IUserList extends IUserMethods {
  UserList: IUserMethods[];
}
