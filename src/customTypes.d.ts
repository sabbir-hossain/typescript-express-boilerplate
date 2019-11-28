declare namespace Express {
  interface Request {
    decoded: Ipayload | any;
  }
}

interface IPayload {
  id: string
  fullName: string
  email: string
  phone: string
  created: string
  updated: string
}

interface Ipayload {
  payload: IPayload
  fbToken: string
  iat: number
}
