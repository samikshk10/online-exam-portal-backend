"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoSecretKey = exports.AdminCredentials = exports.LeetCodeEndPoint = exports.baseUrl = exports.leetcode = exports.db = exports.environment = exports.appName = exports.port = void 0;
const dotenv = __importStar(require("dotenv"));
const environmentEnum_1 = require("../enums/environmentEnum");
const mustExist = (value, name) => {
    if (!value) {
        console.error(`Missing Config: ${name} !!!`);
        process.exit(1);
    }
    return value;
};
dotenv.config();
exports.port = mustExist(+process.env.PORT, "PORT"), exports.appName = mustExist(process.env.APP_NAME, "APP_NAME"), exports.environment = process.env.ENVIRONMENT || environmentEnum_1.EnvironmentEnum.DEVELOPMENT, exports.db = {
    username: mustExist(process.env.DB_USER, "DB_USER"),
    password: mustExist(process.env.DB_PASSWORD, "DB_PASSWORD"),
    name: mustExist(process.env.DB_NAME, "DB_NAME"),
    host: mustExist(process.env.DB_HOST, "DB_HOST"),
    dialect: mustExist(process.env.DB_DIALECT, "DB_DIALECT"),
    port: mustExist(+process.env.DB_PORT, "DB_PORT"),
    logging: false,
    timezone: "utc",
    dialectOptions: {
        ssl: {
            require: process.env.DB_SSL === "true" ? true : false,
        }
    }
}, 
// Providers base url
exports.leetcode = {
    baseUrl: mustExist(process.env.LEETCODE_BASE_URL, "LEETCODE_BASE_URL"),
}, exports.baseUrl = {
    Url: mustExist(process.env.CLIENT_BASE_URL, "CLIENT_BASE_URL"),
}, exports.LeetCodeEndPoint = {
    url: mustExist(process.env.LEETCODE_GRAPHQL_URL, "LEETCODE_GRAPHQL_URL"),
    cookie: mustExist(process.env.LEETCODE_COOKIE, "LEETCODE_COOKIE"),
}, exports.AdminCredentials = {
    email: mustExist(process.env.ADMIN_EMAIL, "ADMIN_EMAIL"),
    password: mustExist(process.env.ADMIN_PASSWORD, "ADMIN_PASSWORD"),
}, exports.CryptoSecretKey = {
    secret: mustExist(process.env.CRYPTO_SECRET_KEY, "CRYPTO_SECRET_KEY"),
};
__exportStar(require("./instance"), exports);
//# sourceMappingURL=index.js.map