import express from "express";
import { getCalendarById } from "../calendrier/calendrier.controller.js";

export const calendriersRouter = express.Router();
calendriersRouter.get("/:id", getCalendarById);
