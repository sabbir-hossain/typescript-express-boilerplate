import {configENV} from "../../config";
const neo4j = require("neo4j-driver").v1;

const {protocol, username, password, host} = configENV["neo4j"].db;
// console.log(`${protocol}${host}`);
//noinspection TypeScriptUnresolvedFunction
export const driver = neo4j.driver(`${protocol}${host}`, neo4j.auth.basic(username, password));

