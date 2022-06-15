import { Dialect, Sequelize } from "sequelize";
import { getEnv } from "../helpers/getEnv"

export const db = new Sequelize(getEnv('DBNAME','example'), getEnv('DBUSER','admin'),getEnv('DBPASSWORD','admin'),{
    host: process.env.DBHOST,
    dialect: getEnv('DBDIALECT','postgres') as Dialect
})
