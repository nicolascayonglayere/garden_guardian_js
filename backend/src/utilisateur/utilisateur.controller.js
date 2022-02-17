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
  ajouterNouveauCalendrier,
  inscriptionUtilisateur,
  modificationUtilisateur,
  trouverCalendriersPourUtilisateur,
  trouverUtilisateurParId,
  trouverUtilisateurParMail,
} from "./utilisateur.service.js";
import { trouverCalendrierParAuteur } from "../calendrier/calendrier.service.js";
import { debug } from "console";

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
export async function getUserById(req, res) {
  try {
    const utilisateur = await trouverUtilisateurParId(req.params.id);
    if (utilisateur) {
      return res.status(200).json({
        status: 200,
        data: utilisateur,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: "La ressource n'existe pas",
      });
    }
  } catch (e) {
    console.log("ERROR GET USER CONTROLLER", e);
    debug("ERROR GET USER CONTROLLER", e);
    return res
      .status(e.response.data.code)
      .json({ status: e.response.data.code, message: e.response.data.error });
  }
}

export async function getUserByMail(req, res) {
  try {
    const utilisateur = await trouverUtilisateurParMail(req.query.email);
    if (utilisateur) {
      return res.status(200).json({
        status: 200,
        data: utilisateur,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: `L'utilisateur ${req.query.email} n'existe pas`,
      });
    }
  } catch (e) {
    console.log("ERROR GET USER CONTROLLER", e);
    debug("ERROR GET USER CONTROLLER", e);
    return res
      .status(e.response.data.code)
      .json({ status: e.response.data.code, message: e.response.data.error });
  }
}

export async function getCalendarsByAuthorId(req, res) {
  try {
    const calendrier = await trouverCalendrierParAuteur(req.params.id);
    if (calendrier) {
      return res.status(200).json({
        status: 200,
        data: calendrier,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: "La ressource n'existe pas",
      });
    }
  } catch (e) {
    console.log("ERROR GET CALENDRIER CONTROLLER", e);
    debug("ERROR GET CALENDRIER CONTROLLER", e);
    return res
      .status(e.response.data.code)
      .json({ status: e.response.data.code, message: e.response.data.error });
  }
}

export async function getCalendarsForUser(req, res) {
  try {
    const calendrier = await trouverCalendriersPourUtilisateur(req.params.id);
    if (calendrier) {
      return res.status(200).json({
        status: 200,
        data: calendrier,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: "La ressource n'existe pas",
      });
    }
  } catch (e) {
    console.log("ERROR GET CALENDRIER CONTROLLER", e);
    debug("ERROR GET CALENDRIER CONTROLLER", e);
    return res
      .status(e.response.data.code)
      .json({ status: e.response.data.code, message: e.response.data.error });
  }
}

export async function inscription(req, res) {
  try {
    const utilisateur = await inscriptionUtilisateur(req.body);
    if (utilisateur) {
      return res.status(200).json({
        status: 200,
        data: utilisateur,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: "La ressource n'existe pas",
      });
    }
  } catch (e) {
    console.log("ERROR CREATE USER CONTROLLER", e);
    debug("ERROR CREATE USER CONTROLLER", e);
    return res
      .status(e.response.data.code)
      .json({ status: e.response.data.code, message: e.response.data.error });
  }
}

export async function modificationProfil(req, res) {
  try {
    const utilisateur = await modificationUtilisateur(req.body);
    if (utilisateur) {
      return res.status(200).json({
        status: 200,
        data: utilisateur,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: "La ressource n'existe pas",
      });
    }
  } catch (e) {
    console.log("ERROR CREATE USER CONTROLLER", e);
    debug("ERROR CREATE USER CONTROLLER", e);
    return res
      .status(e.response.data.code)
      .json({ status: e.response.data.code, message: e.response.data.error });
  }
}

export async function addNewCalendar(req, res) {
  try {
    const idUser = req.params.id;
    const date = req.query.date;

    const calendrier = await ajouterNouveauCalendrier(req.body, idUser, date);
    debug("create cal", calendrier);
    if (calendrier) {
      return res.status(200).json({
        status: 200,
        data: calendrier,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: "La ressource n'existe pas",
      });
    }
  } catch (e) {
    console.log("ERROR GET CALENDRIER CONTROLLER", e);
    debug("ERROR GET CALENDRIER CONTROLLER", e);
    return res
      .status(e.response.data.code)
      .json({ status: e.response.data.code, message: e.response.data.error });
  }
}
