import * as configInfo from "../../config.json";
import * as todoCollecton from "./todo.collection";

export const config = configInfo;

export const ENV = process.env["NODE_ENV"] === "prod" ? "prod" : "dev";
export const DB_ENV = process.env["DB_ENV"] || "neo4j";

export const configENV = config[ENV];

export const configDB = configENV[DB_ENV];

export const todoMongoTbl = todoCollecton.todoMongoTbl;
export const todoStatus = todoCollecton.todoStatus;

export const todoSequelizeTbl = todoCollecton.todoSequelizeTbl;

export const todoNeo4jTbl = todoCollecton.todoNeo4jTbl;
export const todoDynamoDbTbl = todoCollecton.todoDynamoDbTbl;