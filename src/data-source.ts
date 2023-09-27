import "reflect-metadata"
import { DataSource } from "typeorm"
import { Cat } from "./entities/Cat"
import { Hooman } from "./entities/Hooman"
import dotenv from 'dotenv';
dotenv.config()
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Cat,Hooman],
    migrations: [],
    subscribers: [],
})
