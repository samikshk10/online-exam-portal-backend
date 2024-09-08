"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyRouter = void 0;
const express_1 = require("express");
const problemRoutes_1 = require("./problemRoutes");
const questionRoutes_1 = require("./questionRoutes");
const userRoutes_1 = require("./userRoutes");
const examRoutes_1 = require("./examRoutes");
class ProxyRouter {
    static instance;
    router = (0, express_1.Router)();
    routes = [
        {
            segment: "/problems",
            provider: problemRoutes_1.ProblemRouter,
        },
        {
            segment: "/questions",
            provider: questionRoutes_1.QuestionRouter,
        },
        {
            segment: "/users",
            provider: userRoutes_1.UserRouter,
        },
        {
            segment: "/exams",
            provider: examRoutes_1.ExamRouter,
        },
    ];
    constructor() { }
    static get() {
        if (!ProxyRouter.instance)
            ProxyRouter.instance = new ProxyRouter();
        return ProxyRouter.instance;
    }
    map() {
        this.routes.forEach((route) => {
            const instance = new route.provider();
            this.router.use(route.segment, instance.router);
        });
        return this.router;
    }
}
const proxyRouter = ProxyRouter.get();
exports.ProxyRouter = proxyRouter;
//# sourceMappingURL=index.js.map