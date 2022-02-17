import { debug } from "console";
import {
  creerOperationCulturale,
  trouverOperationCulturaleParId,
} from "./operation_culturale.service.js";

export async function trouverOperationCulturaleParIdController(req, res) {
  try {
    const operationCulturale = await trouverOperationCulturaleParId(
      req.params.id
    );
    if (operationCulturale) {
      return res.status(200).json({
        status: 200,
        data: operationCulturale,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: "La ressource n'existe pas",
      });
    }
  } catch (e) {
    console.log("ERROR GET OPERATION CULTURALE CONTROLLER", e);
    debug("ERROR GET OPERATION CULTURALE CONTROLLER", e);
    return res
      .status(e.response.data.code)
      .json({ status: e.response.data.code, message: e.response.data.error });
  }
}

export async function creerOperationCulturaleController(req, res) {
  try {
    const operationCulturale = await creerOperationCulturale(req.body);
    if (operationCulturale) {
      return res.status(200).json({
        status: 200,
        data: operationCulturale,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: "La ressource n'existe pas",
      });
    }
  } catch (e) {
    console.log("ERROR GET OPERATION CULTURALE CONTROLLER", e);
    debug("ERROR GET OPERATION CULTURALE CONTROLLER", e);
    return res
      .status(e.response.data.code)
      .json({ status: e.response.data.code, message: e.response.data.error });
  }
}
