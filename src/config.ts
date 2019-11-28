import * as configInfo from "../config.json";

export const config = configInfo;

export const ENV = process.env["NODE_ENV"] === "prod" ? "prod" : "dev";
export const DB_ENV = process.env["DB_ENV"] || "neo4j";

export const configENV = config[ENV];

export const configDB = configENV[DB_ENV];
