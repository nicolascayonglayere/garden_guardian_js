import { debug } from "console";
import {
  creerCultureRecommandee,
  modifierCultureRecommandee,
  trouverParNom,
  trouverToutesEnConstruction,
  trouverCultureRecommandeeParId,
} from "./culture_recommandee.service.js";

export async function createCultureRecommandee(req, res) {
  try {
    const cultureRecommandee = await creerCultureRecommandee(req.body);
    if (cultureRecommandee) {
      return res.status(200).json({
        status: 200,
        data: cultureRecommandee,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: "La ressource n'existe pas",
      });
    }
  } catch (e) {
    console.log("ERROR POST CULTURE RECOMMANDEE CONTROLLER", e);
    debug("ERROR POST CULTURE RECOMMANDEE CONTROLLER", e);
    return res
      .status(e.response.data.code)
      .json({ status: e.response.data.code, message: e.response.data.error });
  }
}

export async function trouverCultureRecommandeeParNom(req, res) {
  try {
    const culturesRecommandees = await trouverParNom(req.query.nom);
    if (culturesRecommandees) {
      return res.status(200).json({
        status: 200,
        data: culturesRecommandees,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: "La ressource n'existe pas",
      });
    }
  } catch (e) {
    console.log("ERROR GET CULTURE RECOMMANDEE CONTROLLER", e);
    debug("ERROR GET CULTURE RECOMMANDEE CONTROLLER", e);
    return res
      .status(e.response.data.code)
      .json({ status: e.response.data.code, message: e.response.data.error });
  }
}

export async function trouverCultureRecommandeeEnConstruction(req, res) {
  try {
    const culturesRecommandees = await trouverToutesEnConstruction();
    if (culturesRecommandees) {
      return res.status(200).json({
        status: 200,
        data: culturesRecommandees,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: "La ressource n'existe pas",
      });
    }
  } catch (e) {
    console.log("ERROR GET CULTURE RECOMMANDEE CONTROLLER", e);
    debug("ERROR GET CULTURE RECOMMANDEE CONTROLLER", e);
    return res
      .status(e.response.data.code)
      .json({ status: e.response.data.code, message: e.response.data.error });
  }
}

export async function mettreAjourCultureRecommandee(req, res) {
  try {
    const cultureRecommandee = await modifierCultureRecommandee(req.body);
    if (cultureRecommandee) {
      return res.status(200).json({
        status: 200,
        data: cultureRecommandee,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: "La ressource n'existe pas",
      });
    }
  } catch (e) {
    console.log("ERROR PUT CULTURE RECOMMANDEE CONTROLLER", e);
    debug("ERROR PUT CULTURE RECOMMANDEE CONTROLLER", e);
    return res
      .status(e.response.data.code)
      .json({ status: e.response.data.code, message: e.response.data.error });
  }
}

export async function trouverCultureRecommandeeParIdController(req, res) {
  try {
    debug("get culture by id ", req.params);
    const cultureRecommandee = await trouverCultureRecommandeeParId(
      req.params.id
    );
    if (cultureRecommandee) {
      return res.status(200).json({
        status: 200,
        data: cultureRecommandee,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: "La ressource n'existe pas",
      });
    }
  } catch (e) {
    console.log("ERROR GET CULTURE RECOMMANDEE CONTROLLER", e);
    debug("ERROR GET CULTURE RECOMMANDEE CONTROLLER", e);
    return res
      .status(e.response.data.code)
      .json({ status: e.response.data.code, message: e.response.data.error });
  }
}
