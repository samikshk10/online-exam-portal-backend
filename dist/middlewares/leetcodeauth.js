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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leetCodeAuthCheck = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const leetcode_api_typescript_1 = __importStar(require("leetcode-api-typescript"));
async function leetCodeAuthCheck(req, res, next) {
    try {
        const response = await leetcode_api_typescript_1.default.build(leetcode_api_typescript_1.EndPoint.US, {
            cookie: process.env.LEETCODE_COOKIE,
        });
        console.log("response :", response);
        req.leetcode = response;
        next();
    }
    catch (error) {
        console.log(error, "errororoor");
        throw boom_1.default.unauthorized("Auth Failed Leetcode", "", {
            message: "AUTH FAILED",
        });
    }
}
exports.leetCodeAuthCheck = leetCodeAuthCheck;
//# sourceMappingURL=leetcodeauth.js.map