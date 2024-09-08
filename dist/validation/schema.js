"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbiddenSchema = exports.booleanSchema = exports.arraySchema = exports.dateAndTimeSchema = exports.timeSchema = exports.dateSchema = exports.urlSchema = exports.phoneSchema = exports.emailSchema = exports.positiveIntegerSchema = exports.numberSchema = exports.stringSchema = void 0;
const date_1 = __importDefault(require("@joi/date"));
const joi_1 = __importDefault(require("joi"));
const Joi = joi_1.default;
const JoiDate = Joi.extend(date_1.default);
const stringSchema = Joi.string();
exports.stringSchema = stringSchema;
const numberSchema = Joi.number();
exports.numberSchema = numberSchema;
const booleanSchema = Joi.boolean();
exports.booleanSchema = booleanSchema;
const positiveIntegerSchema = Joi.number().integer().min(1);
exports.positiveIntegerSchema = positiveIntegerSchema;
const emailSchema = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase();
exports.emailSchema = emailSchema;
const phoneSchema = Joi.string()
    .min(7)
    .max(14)
    .pattern(/^([+]|[00]{2})([0-9]|[ -])*/);
exports.phoneSchema = phoneSchema;
const urlSchema = Joi.string().uri();
exports.urlSchema = urlSchema;
const dateSchema = JoiDate.date().format([
    "YYYY/MM/DD",
    "YYYY-MM-DD",
    "YYYY/MM/DD HH:mm",
    "HH:mm"
]);
exports.dateSchema = dateSchema;
const timeSchema = JoiDate.date().format(["HH:mm:ss"]);
exports.timeSchema = timeSchema;
const dateAndTimeSchema = JoiDate.date();
exports.dateAndTimeSchema = dateAndTimeSchema;
const arraySchema = Joi.array();
exports.arraySchema = arraySchema;
const forbiddenSchema = Joi.forbidden();
exports.forbiddenSchema = forbiddenSchema;
//# sourceMappingURL=schema.js.map