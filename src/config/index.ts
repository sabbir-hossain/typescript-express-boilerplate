import * as configInfo from "../../config.json";
import * as todoTable from "./todo.table";
import * as userTable from "./user.table";

export const config = configInfo;

export const ENV = process.env["NODE_ENV"] === "prod" ? "prod" : "dev";
export const DB_ENV = process.env["DB_ENV"] || "neo4j";

export const configENV = config[ENV];

export const configDB = configENV[DB_ENV];

// Todo Table
export const todoMongoTbl = todoTable.mongoTbl;
export const todoStatus = todoTable.status;
export const todoSequelizeTbl = todoTable.sequelizeTbl;
export const todoNeo4jTbl = todoTable.neo4jTbl;
export const todoDynamoDbTbl = todoTable.dynamoDbTbl;

// User Table
export const userMongoTbl = userTable.mongoTbl;
export const userStatus = userTable.status;
export const userSequelizeTbl = userTable.sequelizeTbl;
export const userNeo4jTbl = userTable.neo4jTbl;
export const userDynamoDbTbl = userTable.dynamoDbTbl;
export const userRole = userTable.role;