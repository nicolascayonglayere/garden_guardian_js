import { debug } from "console";
import { create, findById, update } from "./operation_culturale.repository.js";

export async function trouverOperationCulturaleParId(id) {
  return findById(parseInt(id));
}

export async function creerOperationCulturale(operationCulturale) {
  return create(operationCulturale);
}

export async function modifierOperationCulturale(operationCulturale) {
  return update(operationCulturale);
}
