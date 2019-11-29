import * as Validator from "validatorjs";

const errorMessage = {
  required: "missing/invalid :attribute",
  required_if: ":attribute cannot be empty string"
};

Validator.register(
  "mustBeEmpty",
  function() {
    const req = this.getParameters();
    const len = req.length;
    for (let i = 0; i < len; i++) {
      if (this.validator.input[req[1]]) {
        return false;
      }
    }
    return true;
  },
  ":attribute must be empty"
);

Validator.register(
  "required_true",
  function() {
    const req = this.getParameters();
    return (
      this.validator.input[req[0]] === true ||
      this.validator.input[req[0]] === 1 ||
      this.validator.input[req[0]] === "1" ||
      this.validator.input[req[0]] === "true"
    );
  },
  ":attribute is invalid"
);

export const validation = (data, rules) => {
  const validator = new Validator(data, rules, errorMessage);

  if (validator.fails()) {
    throw {
      status: 400,
      title: "Invalid Parameter(s)",
      invalidParams: validator.errors.all()
    };
  }

  return validator.passes();
};
