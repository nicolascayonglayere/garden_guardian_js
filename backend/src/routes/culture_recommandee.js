import express from "express";
import {
  createCultureRecommandee,
  mettreAjourCultureRecommandee,
  trouverCultureRecommandeeEnConstruction,
  trouverCultureRecommandeeParIdController,
  trouverCultureRecommandeeParNom,
} from "../culture_recommandee/culture_recommandee.controller.js";

export const cultureRecommandeeRouter = express.Router();
cultureRecommandeeRouter.post("/", createCultureRecommandee);
cultureRecommandeeRouter.get("/", trouverCultureRecommandeeParNom);
cultureRecommandeeRouter.get(
  "/construction",
  trouverCultureRecommandeeEnConstruction
);
cultureRecommandeeRouter.put("/", mettreAjourCultureRecommandee);
cultureRecommandeeRouter.get("/:id", trouverCultureRecommandeeParIdController);
