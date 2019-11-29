export enum status {
  ACTIVE="ACTIVE",
  IN_ACTIVE="IN_COMPLETE",
  DELETED="DELETED"
}

export enum role {
  ADMIN="ADMIN",
  CLIENT="CLIENT"
}

export const mongoTbl = "user";

export const sequelizeTbl = "user";

export const neo4jTbl = "user";

export const dynamoDbTbl = "user";