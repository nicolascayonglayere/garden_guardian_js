import randomString from "randomstring";
import jsonwebtoken from "jsonwebtoken";
// import { cookieProps } from "./constants.js";
import { debug } from "console";

export class IClientData {
  constructor(id, role) {
    this.id = id;
    this.role = role;
  }
}

// class IOptions {
//   constructor(expriesIn) {
//     this.expiresIn = expriesIn;
//   }
// }

// export class JwtService {
//   constructor() {
const secret = process.env.JWT_SECRET || randomString.generate(100);
const cookieProps = {
  key: "ExpressGeneratorTs",
  secret: process.env.COOKIE_SECRET,
  options: {
    httpOnly: true,
    signed: true,
    path: process.env.COOKIE_PATH,
    maxAge: process.env.COOKIE_EXP,
    domain: process.env.COOKIE_DOMAIN,
    secure: process.env.SECURE_COOKIE === "true",
  },
};

export async function getJwt(data) {
  const expire = { expiresIn: process.env.COOKIE_EXP };
  debug("get JWT ", process.env.COOKIE_EXP, cookieProps, expire);
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(data, process.env.COOKIE_SECRET, expire, (err, token) => {
      err ? reject(err) : resolve(token || "");
    });
  });
}

export async function decodeJwt(jwt) {
  const VALIDATION_ERROR = "JSON-web-token validation failed.";
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(jwt, process.env.COOKIE_SECRET, (err, decoded) => {
      return err ? reject(VALIDATION_ERROR) : resolve(decoded);
    });
  });
}
//   }
// }
