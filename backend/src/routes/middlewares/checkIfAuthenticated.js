// import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import jsonwebtoken from "jsonwebtoken";
import { debug } from "console";

export async function checkIfAuthenticated(req, res, next) {
  try {
    debug("MIDDLEWARE headers", req.headers);
    const { authorization } = req.headers;
    // const token = authorization.split(" ")[1];
    const token = req.headers["x-access-token"];
    jsonwebtoken.decode(token, { complete: true });
    next();
  } catch (err) {
    debug("ERROR CHECK AUTH", err);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: err.message,
    });
  }
}
