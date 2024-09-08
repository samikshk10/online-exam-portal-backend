import * as dotenv from "dotenv";
import * as sequelize from "sequelize";
import { EnvironmentEnum } from "../enums/environmentEnum";

const mustExist = <T>(value: T | undefined, name: string): T => {
  if (!value) {
    console.error(`Missing Config: ${name} !!!`);
    process.exit(1);
  }
  return value;
};

dotenv.config();

export const port = mustExist(+process.env.PORT!, "PORT") as number,
  appName = mustExist(process.env.APP_NAME!, "APP_NAME") as string,
  environment = process.env.ENVIRONMENT || (EnvironmentEnum.DEVELOPMENT as EnvironmentEnum),
  db = {
    username: mustExist(process.env.DB_USER!, "DB_USER"),
    password: mustExist(process.env.DB_PASSWORD!, "DB_PASSWORD"),
    name: mustExist(process.env.DB_NAME!, "DB_NAME"),
    host: mustExist(process.env.DB_HOST!, "DB_HOST"),
    dialect: mustExist(process.env.DB_DIALECT!, "DB_DIALECT"),
    port: mustExist(+process.env.DB_PORT!, "DB_PORT"),
    logging: false,
    timezone: "utc",
    dialectOptions: {
      ssl: {
        require: process.env.DB_SSL === "true" ? true : false,
      }
    }
  } as {
    username: string;
    password: string;
    name: string;
    host: string;
    dialect: sequelize.Dialect;
    port: number;
    logging: boolean;
    timezone: string;
    dialectOptions: {
      ssl: {
        require: boolean
      }
    }
  },
  // Providers base url
  leetcode = {
    baseUrl: mustExist(process.env.LEETCODE_BASE_URL!, "LEETCODE_BASE_URL"),
  } as {
    baseUrl: string;
  },
  baseUrl = {
    Url: mustExist(process.env.CLIENT_BASE_URL!, "CLIENT_BASE_URL"),
  } as {
    Url: string;
  },
  LeetCodeEndPoint = {
    url: mustExist(process.env.LEETCODE_GRAPHQL_URL!, "LEETCODE_GRAPHQL_URL"),
    cookie: mustExist(process.env.LEETCODE_COOKIE!, "LEETCODE_COOKIE"),
  } as {
    url: string;
    cookie: string;
  },
  AdminCredentials = {
    email: mustExist(process.env.ADMIN_EMAIL!, "ADMIN_EMAIL"),
    password: mustExist(process.env.ADMIN_PASSWORD!, "ADMIN_PASSWORD"),
  } as {
    email: string;
    password: string;
  },
  CryptoSecretKey = {
    secret: mustExist(process.env.CRYPTO_SECRET_KEY!, "CRYPTO_SECRET_KEY"),
  } as {
    secret: string;
  }



export * from "./instance";
