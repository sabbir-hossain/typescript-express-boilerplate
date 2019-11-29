import { ITodoMethods } from './todo.methods.interface';

export interface ITodoList extends ITodoMethods {
  TodoList: ITodoMethods[];
}
