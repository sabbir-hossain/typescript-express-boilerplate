import * as crypto from "crypto";

import {config} from "../config";

export const encrypt = (text, secret = config['secret']) => {
  const algorithm = 'aes-128-cbc';
  let cipher = crypto.createCipher(algorithm, secret);
  try {
    let crypted = cipher.update(text.toString(), 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  } catch (e) {
    return null;
  }
};

export const decrypt = (text, secret = config['secret']) => {
  const algorithm = 'aes-128-cbc';
  let decipher = crypto.createDecipher(algorithm, secret);
  try {
    let dec = decipher.update(text.toString(), 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  } catch (e) {
    return null;
  }
};
