export interface ITodoModel {
  id:string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

export const todoRules = {
  name: "string|required",
  code: "string|required"
}