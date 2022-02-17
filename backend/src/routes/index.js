import express from "express";
import { usersRouter } from "./users.js";
import { cultureRecommandeeRouter } from "./culture_recommandee.js";
import { operationCulturaleRouter } from "./operation_culturale.js";
import { checkIfAuthenticated } from "./middlewares/checkIfAuthenticated.js";
import {
  authenticate,
  logoutController,
} from "../authentification/authentification.controller.js";
import { inscription } from "../utilisateur/utilisateur.controller.js";
// Auth router
const authRouter = express.Router();
authRouter.get("/login", function (req, res, next) {
  res.render("pages/login.ejs");
});
authRouter.post("/login", authenticate);
authRouter.post("/inscription", inscription);
authRouter.get("/logout", checkIfAuthenticated, logoutController);

export const router = express.Router();

// export function getHomePageRoute(){
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/", authRouter);
router.use("/users", checkIfAuthenticated, usersRouter);
router.use(
  "/cultures_recommandees",
  checkIfAuthenticated,
  cultureRecommandeeRouter
);
router.use(
  "/operations_culturales",
  checkIfAuthenticated,
  operationCulturaleRouter
);
