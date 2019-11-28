export interface IDemoModel {
  id:string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

export const demoRules = {
  name: "string|required",
  code: "string|required"
}