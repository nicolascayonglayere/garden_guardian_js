import {
  createCalendar,
  findAllByAuthorId,
  findById,
  updateCalendrier,
} from "./calendrier.repository.js";
import { trouverCultureRecommandeeParId } from "../culture_recommandee/culture_recommandee.service.js";
import { debug } from "console";

export async function trouverCalendrierParId(id) {
  const calendrier = await findById(parseInt(id));
  for (const c of calendrier.cultures) {
    const cultureRecom = await trouverCultureRecommandeeParId(c.culture_id);
    c.culture = cultureRecom;
  }
  return calendrier;
}

export async function trouverCalendrierParAuteur(id) {
  return findAllByAuthorId(parseInt(id));
}

export async function modifierCalendrier(calendrier) {
  return updateCalendrier(calendrier);
}

export async function creerCalendrier(calendrier, date) {
  return createCalendar(calendrier, date);
}
