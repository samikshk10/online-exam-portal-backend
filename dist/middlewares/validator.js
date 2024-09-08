"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
class Validator {
    static instance;
    constructor() { }
    static get() {
        if (!Validator.instance) {
            Validator.instance = new Validator();
        }
        return Validator.instance;
    }
    check = (schema, input) => {
        const { value, error } = schema.validate(input, {
            abortEarly: false,
        });
        if (error) {
            throw error;
        }
        else
            return value;
    };
}
const validator = Validator.get();
exports.Validator = validator;
//# sourceMappingURL=validator.js.map