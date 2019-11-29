import * as db from "./db";
import { todayISOString } from "../../helpers"

/**
 * @method findById
 * @param id
 * @returns {any}
 */
export function findById(lebel: string, id: string): Promise<any> {
  const query = `MATCH (a:${lebel})
          WHERE a.id = '${id}'
        RETURN properties(a)`;

  return db.run(query)
}

/**
 * @method deleteById
 * @param id
 * @returns {any}
 */
export function deleteById(lebel: string, id: string): Promise<any> {
  const query = `MATCH (a:${lebel} {id: {id}})
        OPTIONAL MATCH (a)-[r]-(n)
        DELETE a
        DELETE r
        RETURN a, r`;

  return db.run(query)
  .then(response => {
    let stat = response.summary.updateStatistics._stats;

    return {
      nodesDeleted: stat.nodesDeleted,
      relationshipsDeleted: stat.relationshipsDeleted
    }
  })
  .catch(error => {
    return new Error(error);
  })
}

/**
 * @method updateById
 * @param id
 * @returns {any}
 */
export function updateById(lebel: string, id: string, data: any): Promise<any> {
  const query = `
        UNWIND {data} as data
        MATCH (a:${lebel} {id: {id}})
        SET
            a += data,
            a.updated = '${todayISOString()}'
        RETURN a`;

  return db.run(query)
    .catch(error => {
      return new Error(error);
    })
}


export function insertQuery(data, param = ''): string {
  let insertQuery = '{';
  param ?
    Object.keys(data).map((k, i) => {
      insertQuery +=
        i === 0 ? `${k}: {${param}.${k}}`
          : `, ${k}: {${param}.${k}}`;
    })
    : Object.keys(data).map((k, i) => {
      insertQuery +=
        i === 0 ? `${k}: {${k}}`
          : `, ${k}: {${k}}`;
    });

  insertQuery += '}';

  return insertQuery;
}

export function insertQueries(bulkData): string[] {
  let insertQueries = [];

  bulkData.map(data => {
    let insertQuery = '{';
    Object.keys(data).map((k, i) => {
      insertQuery +=
        i === 0 ? `${k}: {${k}}`
          : `, ${k}: {${k}}`;
    });
    insertQuery += '}';

    insertQueries.push(insertQuery);
  });

  return insertQueries;
}
