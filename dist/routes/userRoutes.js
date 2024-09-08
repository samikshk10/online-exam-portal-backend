"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const guard_1 = __importDefault(require("../middlewares/guard"));
const classes_1 = require("../classes");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
class UserRouter extends classes_1.RouterClass {
    constructor() {
        super();
    }
    define() {
        this.router.route("/add").post((0, middlewares_1.exceptionHandler)(controllers_1.UserController.addUsers));
        this.router.route("/get").get((0, middlewares_1.exceptionHandler)(controllers_1.UserController.getUsers));
        this.router.route("/search").post((0, middlewares_1.exceptionHandler)(controllers_1.UserController.searchUsers));
        this.router.route("/admin/login").post((0, middlewares_1.exceptionHandler)(controllers_1.UserController.LoginAdmin));
        this.router.route("/verify").get(guard_1.default, (0, middlewares_1.exceptionHandler)(controllers_1.UserController.verifyUser));
        this.router.route("/create/admin").post(guard_1.default, (0, middlewares_1.exceptionHandler)(controllers_1.UserController.createAdmin));
    }
}
exports.UserRouter = UserRouter;
//# sourceMappingURL=userRoutes.js.map