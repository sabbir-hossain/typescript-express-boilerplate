Object.prototype['generalize'] = function(obj) {
  const data = {};
  const process = (value) => {
    const keyList = Object.keys(value);
    for(let key of keyList) {
      if(
        obj[`${key}`] === "true"
      ) {
        data[`${key}`] = true;
      }
      else if(obj[`${key}`] === "false") {
        data[`${key}`] = false;
      } else if( obj[`${key}`] && obj[`${key}`] !== "" ) {
        data[`${key}`] = obj[`${key}`];
      }
    }
  }

  process(obj);

  return data;
};

Array.prototype["random"] = function() {
  return this[Math.round(Math.random() * (this.length - 1))];
};
