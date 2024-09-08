"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaRouter = void 0;
// import { exceptionHandler } from "@src/middlewares";
const classes_1 = require("@src/classes");
// import { Guard } from "@src/middlewares";
class MediaRouter extends classes_1.RouterClass {
    constructor() {
        super();
    }
    define() {
        this.router.route("/single");
    }
}
exports.MediaRouter = MediaRouter;
//to use the guard middleware
// .post(
//     exceptionHandler(Guard.grant),
// );
//# sourceMappingURL=demoRoutes.js.map