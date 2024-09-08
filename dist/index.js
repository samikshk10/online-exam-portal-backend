"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const index_1 = require("./middlewares/index");
const routes_1 = require("./routes");
class Server {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.configuration();
    }
    configuration() {
        this.app.set("port", config_1.port);
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({ origin: config_1.baseUrl.Url }));
        this.app.get("/", (req, res) => res.send(`Server running at port ${this.app.get("port")}`));
        //API Routes
        this.app.get("*", (req, res) => {
            res.send("Welcome to the API");
        });
        this.app.use("/api", routes_1.ProxyRouter.map());
        //Error Handler
        this.app.use(index_1.methodNotAllowed);
        this.app.use(index_1.notFound);
        this.app.use(index_1.genericErrorHandler);
    }
    async connectDB() {
        await config_1.Database.connection();
    }
    start() {
        this.connectDB();
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server running on PORT ${this.app.get("port")}`);
        });
    }
}
const server = new Server();
server.start();
//# sourceMappingURL=index.js.map