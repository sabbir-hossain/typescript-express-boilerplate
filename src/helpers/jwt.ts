import * as jwt from "jsonwebtoken";
import { config } from "../config";

export const authVerify = (accessToken) => {
  if (!accessToken)
    return Promise.reject({status: 404, msg: []});

  return new Promise( (resolve, reject) => {
    jwt.verify(accessToken, config["secret"], function(err, decoded) {
      if(err) {
        reject({
          status: 401,
          title:  'Invalid authentication token provided. Please login again.'
        })
        return;
      }
      return resolve( decoded );
    });
  } )

};

export const generateToken = (payload, expires = config['expires'], secret = config['secret'] ) => {

  return new Promise( (resolve, reject) => {
    jwt.sign({
      payload, 
      expires: Math.floor(Date.now() / 1000) + ( parseInt(expires) * 24 * 60 * 60)
    }, secret, (err, token) => {
      if(err) {
        reject({
          status: 401,
          title:  'Cannot generate token. Please login again.'
        })
        return;
      }

      return resolve(token );
    });
  } )
};