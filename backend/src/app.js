import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { router } from "./routes/index.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { cookieProps } from "./shared/constants.js";
import cors from "cors";
import dotenv from "dotenv";
import commandLineArgs from "command-line-args";

const __dirname = path.resolve();

// Setup command line options
const options = commandLineArgs([
  {
    name: "env",
    alias: "e",
    defaultValue: "development",
    type: String,
  },
]);
// Set the env file
const result2 = dotenv.config({
  path: path.join(__dirname, `src/pre-start/env/development.env`),
});
if (result2.error) {
  throw result2.error;
}

export const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookieProps.secret));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", router);

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Garden guardian API with Swagger",
//       version: "0.1.0",
//       description: "Garden calendar generator",
//       contact: {
//         name: "yogj",
//         email: "info@email.com",
//       },
//     },
//     servers: [
//       {
//         url: "http://localhost:8181/",
//       },
//     ],
//   },
//   apis: ["./routes/*.js", "./utilisateur/utilisateur.controller.js"],
// };

// const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
