import * as configInfo from "../../config.json";
import * as todoTable from "./todo.table";
import * as userTable from "./user.table";

export const config = configInfo;

export const ENV = process.env["NODE_ENV"] === "prod" ? "prod" : "dev";
export const DB_ENV = process.env["DB_ENV"] || "neo4j";

export const configENV = config[ENV];

export const configDB = configENV[DB_ENV];

export const todoMongoTbl = todoTable.todoMongoTbl;
export const todoStatus = todoTable.todoStatus;

export const todoSequelizeTbl = todoTable.todoSequelizeTbl;

export const todoNeo4jTbl = todoTable.todoNeo4jTbl;
export const todoDynamoDbTbl = todoTable.todoDynamoDbTbl;

export const userMongoTbl = userTable.userMongoTbl;
export const userStatus = userTable.userStatus;

export const userSequelizeTbl = userTable.userSequelizeTbl;

export const userNeo4jTbl = userTable.userNeo4jTbl;
export const userDynamoDbTbl = userTable.userDynamoDbTbl;