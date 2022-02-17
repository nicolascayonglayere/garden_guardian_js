import { debug } from "console";
import {
  creerOperationCulturale,
  trouverOperationCulturaleParId,
} from "../operation_culturale/operation_culturale.service.js";
import {
  addOperationCulturale,
  create,
  findAllByName,
  findAllInConstruction,
  findById,
  update,
} from "./culture_recommandee.repository.js";

export async function creerCultureRecommandee(culture) {
  const cultureToSave = {};
  cultureToSave.nom = culture.nom;
  cultureToSave.en_construction = culture.en_construction;
  cultureToSave.recommandation_basse = culture.recommandation_basse;
  cultureToSave.recommandation_haute = culture.recommandation_haute;
  cultureToSave.nom_latin = culture.nom_latin;
  cultureToSave.duree_cycle = culture.duree_cycle;
  cultureToSave.produit = culture.produit;
  const cultureSaved = await create(cultureToSave);
  if (culture.operations_culturales.length > 0) {
    cultureSaved.operations_culturales = [];
    for (const oc of culture.operations_culturales) {
      const operationCulturaleSaved = await creerOperationCulturale(
        oc.operation_culturale
      );
      await addOperationCulturale(
        oc,
        cultureSaved.id,
        operationCulturaleSaved.id
      );
      oc.operation_culturale = operationCulturaleSaved;
      cultureSaved.operations_culturales.push(oc);
    }
  }
  return cultureSaved;
}

export async function trouverParNom(nom) {
  const cultures = await findAllByName(nom);
  for (const c of cultures) {
    await ajoutOperationCulturaleToCulture(c);
  }
  return cultures;
}

export async function trouverToutesEnConstruction() {
  const cultures = await findAllInConstruction();
  for (const c of cultures) {
    await ajoutOperationCulturaleToCulture(c);
  }
  return cultures;
}

export async function modifierCultureRecommandee(culture) {
  return update(culture);
}

export async function trouverCultureRecommandeeParId(id) {
  const culture = await findById(parseInt(id));
  await ajoutOperationCulturaleToCulture(culture);
  return culture;
}

async function ajoutOperationCulturaleToCulture(culture) {
  for (const oc of culture.operations_culturales) {
    oc.operation_culturale = await trouverOperationCulturaleParId(
      oc.operation_id
    );
  }
  return culture;
}
