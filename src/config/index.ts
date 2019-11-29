import * as configInfo from "../../config.json";
import * as collectionsList from "./collections.list";

export const config = configInfo;

export const ENV = process.env["NODE_ENV"] === "prod" ? "prod" : "dev";
export const DB_ENV = process.env["DB_ENV"] || "neo4j";

export const configENV = config[ENV];

export const configDB = configENV[DB_ENV];

export const todoMongoTbl = collectionsList.todoMongoTbl;
export const todoStatus = collectionsList.todoStatus;
