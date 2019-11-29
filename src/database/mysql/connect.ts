import { Sequelize } from 'sequelize';

import { toBoolean } from "../../helpers";
import { configENV } from "../../config";

const { database, host, port, username, password, log } = configENV["mysql"].db;

export const sequelize = new Sequelize(database, username, password, {
  host,
  logging: toBoolean(log),
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`MySQL ${database} Connection has been established successfully.`);
  })
  .catch(err => {
    console.error('Unable to connect to the MySQL database:', err);
  });
