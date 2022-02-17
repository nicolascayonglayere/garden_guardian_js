import express from "express";
import {
  creerOperationCulturaleController,
  trouverOperationCulturaleParIdController,
} from "../operation_culturale/operation_culturale.controller.js";

export const operationCulturaleRouter = express.Router();
operationCulturaleRouter.get("/:id", trouverOperationCulturaleParIdController);
operationCulturaleRouter.post("/", creerOperationCulturaleController);
