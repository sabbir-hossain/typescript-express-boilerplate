export function uuid(): string {
  const uuid = require('uuid');

  return uuid.v4();
}

export function toBoolean(value) {
  return (
    value === true ||
    value === 1 ||
    value === "1" ||
    value === "true"
  );
}

export const throwError = (name="") => {
  throw `missing parameter value for ${name}`;
};

export const randomNumberGenerator = (max = 0, min = 0) => {
  return max
    ? Math.round(Math.random() * (+max - +min)) + min
    : Math.round(Math.random());
};

/**
 * @method uInvoke
 * @param obj
 * @param func
 * @param args
 * @returns {any}
 */
export function uInvoke(obj, func, ...args) {
  return obj[func](...args)
}

export function ValidateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;

  if ( email == '' || !re.test( email ) ) {
    return false;
  } else {
    return true;
  }

}

//noinspection TypeScriptUnresolvedVariable
/**
 * @method invoke
 * @param name
 * @param args
 * @returns {any}
 */
// Object.prototype['invoke'] = function(name, ...args) {
//   console.log("args : ", args);
//   console.log("name : ", name);
//   return this[name](...args)
// };

export const genImgUrl = (url: string): string => url.toString().replace(/_[0-9]*x[0-9]*_[a-zA-Z0-9_]*/, '__');
