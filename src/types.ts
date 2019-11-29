let TYPES = {
  IComponentRoutes: Symbol("IComponentRoutes"),

  ISequelize: Symbol.for("ISequelize"),

  // Todo Component
  ITodoRoute: Symbol("ITodoRoute"),
  ITodoController: Symbol("ITodoController"),
  ITodoService: Symbol("ITodoService"),
  ITodoMongooseService: Symbol("ITodoMongooseService"),
  ITodoSequelizeService: Symbol("ITodoSequelizeService"),
  ITodoNeo4jService: Symbol("ITodoNeo4jService"),
  ITodoDynamoDbService: Symbol("ITodoDynamoDbService"),

  // User Component
  IUserRoute: Symbol("IUserRoute"),
  IUserController: Symbol("IUserController"),
  IUserService: Symbol("IUserService"),
  IUserMongooseService: Symbol("IUserMongooseService"),
  IUserSequelizeService: Symbol("IUserSequelizeService"),
  IUserNeo4jService: Symbol("IUserNeo4jService"),
  IUserDynamoDbService: Symbol("IUserDynamoDbService"),
};

export { TYPES };
