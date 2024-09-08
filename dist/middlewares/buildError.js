"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const enums_1 = require("../enums");
/**
 * Build error response for validation errors.
 */
function buildError(err) {
    // Validation errors
    if (err.isJoi) {
        return {
            success: false,
            code: enums_1.HttpStatusEnum.BAD_REQUEST,
            message: "BAD REQUEST",
            details: err.details &&
                err.details.map((err) => {
                    return {
                        message: err.message,
                        param: err.path.join("."),
                    };
                }),
        };
    }
    else if (err instanceof Error && err.message.startsWith("Validation error")) {
        return {
            success: false,
            code: enums_1.HttpStatusEnum.BAD_REQUEST,
            message: "BAD REQUEST",
            details: [
                {
                    message: err.message,
                },
            ],
        };
    }
    // HTTP errors
    else if (err.isBoom) {
        return {
            success: false,
            code: err.output.statusCode,
            message: err.output.payload.message || err.output.payload.error,
            ...(err.data && {
                details: err.data.map((err) => {
                    return {
                        message: err.message,
                        param: err.path.join("."),
                    };
                }),
            }),
        };
    }
    else if (err.constructor.name === "FirebaseAuthError") {
        return {
            success: false,
            code: enums_1.HttpStatusEnum.UNAUTHORIZED,
            message: "Invalid access token",
            ...(err.data && {
                details: err.data.map((err) => {
                    return {
                        message: "Invalid access token",
                        param: err.path.join("."),
                    };
                }),
            }),
        };
    }
    // Sequelize errors
    else if (err instanceof sequelize_1.UniqueConstraintError) {
        return {
            success: false,
            code: enums_1.HttpStatusEnum.CONFLICT,
            message: "CONFLICT",
            details: [
                {
                    message: err.message,
                },
            ],
        };
    }
    else if (err instanceof sequelize_1.ForeignKeyConstraintError) {
        return {
            success: false,
            code: enums_1.HttpStatusEnum.CONFLICT,
            message: "CONFLICT",
            details: [
                {
                    message: err.message,
                },
            ],
        };
    }
    else if (err instanceof sequelize_1.ValidationError) {
        return {
            success: false,
            code: enums_1.HttpStatusEnum.BAD_REQUEST,
            message: "BAD REQUEST",
            details: err.errors.map((item) => {
                return {
                    message: item.message,
                    path: item.path,
                };
            }),
        };
    }
    // Return INTERNAL_SERVER_ERROR for all other cases
    else {
        return {
            success: false,
            code: enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR,
            message: "INTERNAL SERVER ERROR",
        };
    }
}
exports.default = buildError;
//# sourceMappingURL=buildError.js.map