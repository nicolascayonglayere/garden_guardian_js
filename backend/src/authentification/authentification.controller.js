import { logout, saveTokenInSession } from "./authentification.service.js";
import { decodeJwt, getJwt } from "../shared/JwtService.js";
import { debug } from "console";
import { trouverUtilisateurParMail } from "../utilisateur/utilisateur.service.js";

export async function authenticate(req, res, next) {
  // Validate request parameters, queries using express-validator
  try {
    if (req.body.email) {
      const user = await trouverUtilisateurParMail(req.body.email);
      if (user) {
        const token = await getJwt({
          id: user.id,
          email: user.email,
        });
        await saveTokenInSession(token, user);
        const tokenDecoded = await decodeJwt(token, { complete: true });
        debug("user ", user);
        return res.render("pages/profile", {
          status: 200,
          token: token,
          expiresIn: tokenDecoded.exp,
          currentUser: user,
        });
        // return res.status(200).json({
        //   status: 200,
        //   token: token,
        //   expiresIn: tokenDecoded.exp,
        // });
      } else {
        return res.status("401").json({
          status: "401",
          message: "L'utilisateur n'existe pas. Merci de vous inscrire.",
        });
      }
    } else {
      return res.status("401").json({
        status: "401",
        message: "Merci de saisir votre email.",
      });
    }
  } catch (e) {
    debug("ERROR LOGIN ", e);
    return res
      .status(e.response.data.code)
      .json({ status: e.response.data.code, message: e.response.data.error });
  }
}

export async function logoutController(req, res) {
  const token = req.headers["x-access-token"];
  await logout(token);
  return res
    .status(200)
    .json({ status: 200, message: "Successfully logged out" });
}
