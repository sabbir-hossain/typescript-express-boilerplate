import { Request, Response } from 'express';
import { authVerify, errorHandler } from "../../helpers";

export const Authorize = (target, property, descriptor): any => {
  return {
    get(this) {
      const orgFunc = descriptor.value.bind(this);
      return descriptor.value = function (...args) {
        const req: Request = args[0];
        let res: Response = args[1];
        let token = req.headers['x-access-token'];

        if (token) {
          return authVerify(token)
            .then(payload => {
              req['decoded'] = payload;
              if ((Date.now() / 1000) > Number(payload['expires'])) {
                return errorHandler(res, {status: 401, title: "token expire"})
              } else {
                return Promise.resolve(payload);
              }
            })
            .then(payload => {
              req['decoded'] = payload;
              orgFunc(...args)
            })
            .catch(error => {
              return errorHandler(res, error);
            });
        } else {
          return errorHandler(res, {status: 401, title:'Unauthorized! No access token provided.'  })
        }
      }
    }
  }
}