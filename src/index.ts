import Cors from "cors";
import express, { Request, Response } from "express";
import { Database, baseUrl } from "./config";
import { genericErrorHandler, methodNotAllowed, notFound } from "./middlewares/index";
import { ProxyRouter } from "./routes";

// 


// Initialize Express app
const app = express();

// Middleware configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(Cors({ origin: baseUrl.Url }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send(`Server running at port ${process.env.PORT || 5000}`);
});

app.use("/api", ProxyRouter.map());

// Fallback route
app.get("*", (req: Request, res: Response) => {
  res.send("Welcome to the API");
});

// Error handlers
app.use(methodNotAllowed);
app.use(notFound);
app.use(genericErrorHandler);

// Export the serverless function
export default async (req: Request, res: Response) => {
  try {
    await Database.connection(); // Ensure DB connection
    app(req, res); // Delegate request handling to Express app
  } catch (error) {
    console.error('Error during request handling:', error);
    res.status(500).send("Internal Server Error");
  }
};
