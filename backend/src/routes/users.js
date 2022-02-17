/**
 *@swagger
 *components:
 *  schemas:
 *    Utilisateur:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: auto-generated id
 *        nom:
 *          type: string
 *          description: nom de l'utilisateur
 *        prenom:
 *          type: string
 *          description: prenom de l'utilisateur
 *        mot_de_passe:
 *          type: string
 *          description: mot de passe de connexion
 *        email:
 *          type: string
 *          description: email de l'utilisateur
 *        mot_secret:
 *          type: string
 *          description: cle de generation d'un token d'authentification
 *        calendriers
 *          type: array
 *          description: calendriers utilisés par l'utilisateur
 *        calendriers_crees:
 *          type: array
 *          description: calendriers crées par l'utilisateur
 */
import {
  addNewCalendar,
  getCalendarsByAuthorId,
  getCalendarsForUser,
  getUserById,
  getUserByMail,
  modificationProfil,
} from "../utilisateur/utilisateur.controller.js";
import express from "express";
import { calendriersRouter } from "./calendrier.js";

export const usersRouter = express.Router();
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Utilisateur'
 */
usersRouter.get("/:id", getUserById);
usersRouter.get("/", getUserByMail);
usersRouter.put("/", modificationProfil);
usersRouter.get("/:id/calendars_created", getCalendarsByAuthorId);
usersRouter.get("/:id/calendars_used", getCalendarsForUser);
usersRouter.post("/:id/calendars/", addNewCalendar);

usersRouter.use("/:id/calendars", calendriersRouter);
