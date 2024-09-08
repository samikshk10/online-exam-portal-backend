import express from "express";
import { Database, baseUrl, port } from "./config";
import { genericErrorHandler, methodNotAllowed, notFound } from "./middlewares/index";
import { ProxyRouter } from "./routes";
import Cors from "cors";
class Server {
  app: express.Application;

  constructor() {
    this.app = express();
    this.configuration();
  }

  private configuration() {
    this.app.set("port", port);

    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(express.json());

    this.app.use(Cors({ origin: baseUrl.Url }));

    this.app.get("/", (req, res) => res.send(`Server running at port ${this.app.get("port")}`));

    //API Routes
    this.app.use("/api", ProxyRouter.map());

    //Error Handler
    this.app.use(methodNotAllowed);
    this.app.use(notFound);
    this.app.use(genericErrorHandler);
  }

  private async connectDB() {
    await Database.connection();
  }

  public start() {
    this.connectDB();
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server running on PORT ${this.app.get("port")}`);
    });
  }
}

const server = new Server();
server.start();
