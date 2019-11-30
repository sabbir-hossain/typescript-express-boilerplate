declare namespace Express {
  interface Request {
    decoded: IPayload | any;
  }
}

interface IPayload {
  mongodb_id: string
  mysql_id: string
  dynamodb_id: string
  neo4j_id: string
  name: string
  email: string
  status: string
  role: string
  created: string
  updated: string
}
