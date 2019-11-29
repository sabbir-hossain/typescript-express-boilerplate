import {configENV} from "../../config";
import {driver} from "./connect";
import { encrypt, decrypt } from "../../helpers";

export function run<T>(query: string, data: any = {}): Promise<any> {
  const dbSession = driver.session();

  return dbSession.run(query, data)
    .then(response => {
      dbSession.close();
      let result = response.records.map(
        record => record['_fields'][0]
          ? record['_fields'].length ? record['_fields'][0] : {}
          : {}
      );
      return result;
    })
    .catch(error => {
      dbSession.close();
      throw error;
    })
}

export function execute<T>(query: string, data: any = {}): Promise<any> {
  const dbSession = driver.session();
  return dbSession.run(query, data)
    .then(response => {
      dbSession.close();
      return response;
    })
    .catch(err => {
      dbSession.close();
      return new Error(err);
    });
}

export function runWithPagination<T>(query: string, data: any = {}, limit, pageToken): Promise<any> {
  limit = limit || configENV['dataLimit'];
  let next = pageToken ? decrypt(pageToken) : null;

  const skip = Number.parseInt(next) && Number.parseInt(next) >= 0 ? Number.parseInt(next) : 0;
  const prevPage = encrypt(skip - limit);
  const nextPage = encrypt(skip + +limit);

  query += ` SKIP ${skip} LIMIT ${limit}`;

  const dbSession = driver.session();
  return dbSession.run(query, data)
    .then(response => {
      dbSession.close();
      return {
        paging: {
          next: nextPage,
          previous: prevPage
        },
        data: response.records.map(
          record => record['_fields'][0]
            ? record['_fields'].length ? record['_fields'][0] : {}
            : {})
      };
    })
    .catch(err => {
      dbSession.close();
      return new Error(err);
    });
}
