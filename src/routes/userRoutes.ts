import verifyToken from "../middlewares/guard";
import { RouterClass } from "../classes";
import { UserController } from "../controllers";
import { exceptionHandler } from "../middlewares";

export class UserRouter extends RouterClass {
  constructor() {
    super();
  }

  public define(): void {
    this.router.route("/add").post(exceptionHandler(UserController.addUsers));

    this.router.route("/get").get(verifyToken, exceptionHandler(UserController.getUsers));


    this.router.route("/search").post(exceptionHandler(UserController.searchUsers));
    this.router.route("/admin/login").post(exceptionHandler(UserController.LoginAdmin));
    this.router.route("/verify").get(verifyToken, exceptionHandler(UserController.verifyUser));
    this.router.route("/create/admin").post(verifyToken, exceptionHandler(UserController.createAdmin));
  }
}
