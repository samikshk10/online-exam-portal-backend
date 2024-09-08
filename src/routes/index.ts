import { Router } from "express";
import { ProblemRouter } from "./problemRoutes";
import { IRouteInterface } from "../interfaces";
import { QuestionRouter } from "./questionRoutes";
import { UserRouter } from "./userRoutes";
import { ExamRouter } from "./examRoutes";

class ProxyRouter {
  private static instance: ProxyRouter;
  private router: Router = Router();
  private readonly routes = [
    {
      segment: "/problems",
      provider: ProblemRouter,
    },
    {
      segment: "/questions",
      provider: QuestionRouter,
    },
    {
      segment: "/users",
      provider: UserRouter,
    },
    {
      segment: "/exams",
      provider: ExamRouter,
    },
  ];

  private constructor() {}

  public static get(): ProxyRouter {
    if (!ProxyRouter.instance) ProxyRouter.instance = new ProxyRouter();
    return ProxyRouter.instance;
  }

  public map(): Router {
    this.routes.forEach((route: IRouteInterface) => {
      const instance = new route.provider() as { router: Router };
      this.router.use(route.segment, instance.router);
    });
    return this.router;
  }
}

const proxyRouter = ProxyRouter.get();
export { proxyRouter as ProxyRouter };
