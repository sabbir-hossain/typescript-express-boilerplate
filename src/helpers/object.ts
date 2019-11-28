export function checkObject(obj1, obj2) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  let isEqual = false;
  for (let i = 0, len = obj1Keys.length; i < len; i++) {
    const key1 = obj1Keys[i] || "";
    const key2 = obj2Keys[obj2Keys.indexOf(key1) || 0] || "";
    if (key2 === "" || key1 === "") {
      return false;
    } else if (
      typeof obj2[key2] === "undefined" ||
      typeof obj1[key1] === "undefined"
    ) {
      return false;
    } else if (typeof obj1[key1] === "object") {
      isEqual = checkObject(obj1[key1], obj2[key2]);
      if (!isEqual) {
        return false;
      }
    } else if (typeof obj1[key1] === "function") {
      if (obj1[key1].toString() !== obj2[key2].toString()) {
        return false;
      } else {
        isEqual = true;
      }
    } else if (obj1[key1] === obj2[key2]) {
      isEqual = true;
    } else {
      return false;
    }
  }

  if (isEqual) {
    return true;
  } else {
    return false;
  }
}



export function stringToArray(data: string) {
  let result = null;
  if( data && typeof data === 'object' ) {
    result = data;
  } else {
    try {
      result = JSON.parse(data + "");
    } catch (e) {
      result = [];
    }
  }

  return typeof result === 'boolean' ? [] : result;
}

export function stringToInt(str) {
  let number = parseInt(str, 10);
  return isNaN(number) ? 0 : number;
}

export function removeEmptyObject(data) {
  return Object.keys(data).reduce((result, key) => {
    if (data[key]) {
      result[key] = data[key];
    }
    return result;
  }, {})
}
