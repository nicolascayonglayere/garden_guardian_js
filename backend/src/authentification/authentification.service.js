import {
  modificationUtilisateur,
  trouverUtilisateurParToken,
} from "../utilisateur/utilisateur.service.js";

export async function saveTokenInSession(token, user) {
  const userPayload = {
    id: user.id,
    email: user.email,
    token: token,
    token_created_date: new Date(),
  };
  await modificationUtilisateur(userPayload);
}

export async function logout(token) {
  // const token = authorizationHeader.split(" ")[1];
  // const token = req.headers["x-access-token"];
  const user = await trouverUtilisateurParToken(token);
  console.log(user, token);
  //   await revokeToken(token);
  user.token = "";

  await modificationUtilisateur(user);
}
