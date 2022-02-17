import {
  createUser,
  findByEmail,
  findById,
  updateUser,
  addCalendar,
  findByToken,
} from "./utilisateur.repository.js";
import { debug } from "console";
import {
  creerCalendrier,
  trouverCalendrierParId,
} from "../calendrier/calendrier.service.js";

export async function trouverUtilisateurParId(id) {
  const utilisateur = await findById(parseInt(id));
  // for (const cal of utilisateur.calendriers) {
  //   cal.calendrier = trouverCalendrierParId(cal.calendrier_id);
  // }

  return utilisateur;
}

export async function trouverUtilisateurParMail(email) {
  return findByEmail(email);
}

export async function trouverUtilisateurParToken(token) {
  return findByToken(token);
}

export async function trouverCalendriersPourUtilisateur(id) {
  const utilisateur = await trouverUtilisateurParId(id);
  return utilisateur.calendriers;
}

export async function inscriptionUtilisateur(utilisateur) {
  return createUser(utilisateur);
}

export async function modificationUtilisateur(utilisateur) {
  const utilisateurToUp = {};
  utilisateurToUp.email = utilisateur.email;
  utilisateurToUp.token = utilisateur.token;
  utilisateurToUp.mot_de_passe = utilisateur.mot_de_passe;
  utilisateurToUp.nom = utilisateur.nom;
  utilisateurToUp.prenom = utilisateur.prenom;
  utilisateurToUp.mot_secret = utilisateur.mot_secret;
  if (
    utilisateur.calendriers_crees &&
    utilisateur.calendriers_crees.length > 0
  ) {
    utilisateurToUp.calendriers_crees = utilisateur.calendriers_crees;
  }
  return updateUser(utilisateurToUp, utilisateur.id);
}

export async function ajouterNouveauCalendrier(calendrier, idUser, date) {
  const utilisateur = await trouverUtilisateurParId(idUser);
  calendrier.auteur = utilisateur;
  const calendrierSaved = await creerCalendrier(calendrier, new Date(date));
  if (!utilisateur.calendriers) {
    utilisateur.calendriers = [];
  }
  utilisateur.calendriers.push({
    utilisateur: utilisateur,
    utilisateur_id: utilisateur.id,
    calendrier: calendrierSaved,
    calendrier_id: calendrierSaved.id,
    date_utilisation: new Date(date),
  });
  if (!utilisateur.calendriers_crees) {
    utilisateur.calendriers_crees = [];
  }
  utilisateur.calendriers_crees.push(calendrier);
  await addCalendar(utilisateur, new Date(date), calendrierSaved);
  return calendrierSaved;
}
