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
// 
// Initialize Express app
const app = (0, express_1.default)();
// Middleware configuration
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: config_1.baseUrl.Url }));
// Routes
app.get("/", (req, res) => {
    res.send(`Server running at port ${process.env.PORT || 5000}`);
});
app.use("/api", routes_1.ProxyRouter.map());
// Fallback route
app.get("*", (req, res) => {
    res.send("Welcome to the API");
});
// Error handlers
app.use(index_1.methodNotAllowed);
app.use(index_1.notFound);
app.use(index_1.genericErrorHandler);
// Export the serverless function
exports.default = async (req, res) => {
    try {
        await config_1.Database.connection(); // Ensure DB connection
        app(req, res); // Delegate request handling to Express app
    }
    catch (error) {
        console.error('Error during request handling:', error);
        res.status(500).send("Internal Server Error");
    }
};
//# sourceMappingURL=index.js.map