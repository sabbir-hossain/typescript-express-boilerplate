let TYPES = {
  IComponentRoutes: Symbol("IComponentRoutes"),

  ISequelize: Symbol.for("ISequelize"),

  ITodoRoute: Symbol("ITodoRoute"),
  ITodoController: Symbol("ITodoController"),
  ITodoService: Symbol("ITodoService"),
  ITodoMongooseService: Symbol("ITodoMongooseService"),
  ITodoSequelizeService: Symbol("ITodoSequelizeService"),
  ITodoNeo4jService: Symbol("ITodoNeo4jService"),
  ITodoDynamoDbService: Symbol("ITodoDynamoDbService"),
};

export { TYPES };
