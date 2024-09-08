"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChatMessage = void 0;
const joi_1 = __importDefault(require("joi"));
const index_1 = require("./index");
const createChatMessage = joi_1.default.object({
    chatSessionId: index_1.numberSchema.label("Chat Session Id").required(),
    senderId: index_1.numberSchema.label("Sender Id").required(),
    content: index_1.stringSchema.label("Content").required(),
    messageType: index_1.stringSchema.label("Message Type").required(),
    ownerId: index_1.numberSchema.label("Owner Id").required(),
    direction: index_1.stringSchema.label("Direction").optional(),
});
exports.createChatMessage = createChatMessage;
//# sourceMappingURL=problemValidation.js.map