"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericErrorHandler = exports.methodNotAllowed = exports.notFound = void 0;
const index_1 = require("../enums/index");
const buildError_1 = __importDefault(require("./buildError"));
/**
 * Error response middleware for 404 not found.
 */
function notFound(req, res) {
    res.status(index_1.HttpStatusEnum.NOT_FOUND).json({
        success: false,
        code: index_1.HttpStatusEnum.NOT_FOUND,
        message: "Page Not Found",
    });
}
exports.notFound = notFound;
/**
 * Method not allowed error middleware. This middleware should be placed at
 */
function methodNotAllowed(req, res) {
    res.status(index_1.HttpStatusEnum.METHOD_NOT_ALLOWED).json({
        success: false,
        code: index_1.HttpStatusEnum.METHOD_NOT_ALLOWED,
        message: "Method Not Allowed",
    });
}
exports.methodNotAllowed = methodNotAllowed;
function genericErrorHandler(err, req, res, _) {
    const error = (0, buildError_1.default)(err);
    res.status(error.code).json({ ...error });
}
exports.genericErrorHandler = genericErrorHandler;
//# sourceMappingURL=errorHandler.js.map