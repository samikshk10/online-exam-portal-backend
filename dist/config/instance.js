"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const _1 = require(".");
class Database {
    sequelize;
    static instance;
    dialect;
    dbname;
    username;
    password;
    host;
    port;
    maxPool;
    minPool;
    dialectOptionsRequire;
    constructor() {
        this.dialect = _1.db.dialect;
        this.dbname = _1.db.name;
        this.username = _1.db.username;
        this.password = _1.db.password;
        this.host = _1.db.host;
        this.port = _1.db.port;
        this.maxPool = 10;
        this.minPool = 1;
        this.dialectOptionsRequire = _1.db.dialectOptions.ssl.require;
        this.sequelize = new sequelize_1.default.Sequelize(this.dbname, this.username, this.password, {
            host: this.host,
            dialect: this.dialect,
            dialectOptions: {
                encrypt: true,
                ssl: {
                    require: this.dialectOptionsRequire,
                    rejectUnauthorized: false,
                },
            },
            port: this.port,
            logging: true,
            timezone: "utc",
            pool: {
                max: this.maxPool,
                min: this.minPool,
                acquire: 30000,
                idle: 10000,
            },
            define: {
                timestamps: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    static get() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    async connection() {
        await this.sequelize
            .authenticate()
            .then(() => console.log(`${_1.db.dialect} database connected`))
            .catch((error) => console.error(error.message));
    }
}
const database = Database.get();
exports.Database = database;
//# sourceMappingURL=instance.js.map