"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const boom_1 = require("@hapi/boom");
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            throw (0, boom_1.conflict)("Invalid token");
        }
        req.user = decoded;
        next();
    });
};
exports.default = verifyToken;
//# sourceMappingURL=guard.js.map