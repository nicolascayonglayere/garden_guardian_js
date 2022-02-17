import { trouverCalendrierParId } from "./calendrier.service.js";
import { debug } from "console";

export async function getCalendarById(req, res) {
  try {
    const calendrier = await trouverCalendrierParId(req.params.id);
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
