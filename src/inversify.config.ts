import {Container, ContainerModule } from "inversify";
import * as sequelize from "sequelize";
import { ISequelize } from "./database/sequelize/sequelize.interface";
import {TYPES} from "./types";

import {ComponentRoutes, IComponentRoutes} from "./components/components.routes";

// Todo Component
import {TodoRoute, ITodoRoute} from "./components/todo/todo.routes";
import {TodoController, ITodoController} from "./components/todo/todo.controller";
import {TodoService, ITodoService} from "./components/todo/todo.service";
import {ITodoMongooseService, TodoMongooseService } from "./components/todo/mongoose/todo.mongoose.service";
import {ITodoSequelizeService, TodoSequelizeService} from "./components/todo/sequelizer/todo.sequelize.service";
import {ITodoNeo4jService, TodoNeo4jService } from "./components/todo/neo4j/todo.neo4j.service";
import {ITodoDynamoDbService, TodoDynamoDbService } from "./components/todo/dynamodb/todo.dynamodb.service";

// User Component
import {UserRoute, IUserRoute} from "./components/user/user.routes";
import {UserController, IUserController} from "./components/user/user.controller";
import {UserService, IUserService} from "./components/user/user.service";
import {IUserMongooseService, UserMongooseService } from "./components/user/mongoose/user.mongoose.service";
import {IUserSequelizeService, UserSequelizeService} from "./components/user/sequelizer/user.sequelize.service";
import {IUserNeo4jService, UserNeo4jService } from "./components/user/neo4j/user.neo4j.service";
import {IUserDynamoDbService, UserDynamoDbService } from "./components/user/dynamodb/user.dynamodb.service";

const container = new Container();

const thirdPartyDependencies = new ContainerModule((bind) => {
  bind<ISequelize>(TYPES.ISequelize).toConstantValue(sequelize);
  // ..
});

const applicationDependencies = new ContainerModule((bind) => {
  bind<ITodoSequelizeService>(TYPES.ITodoSequelizeService).to(TodoSequelizeService);
  bind<ITodoSequelizeService>(TYPES.IUserSequelizeService).to(UserSequelizeService);
  // ..
});

container.load(thirdPartyDependencies, applicationDependencies);

container.bind<IComponentRoutes>(TYPES.IComponentRoutes).to(ComponentRoutes);

// Todo Component
container.bind<ITodoRoute>(TYPES.ITodoRoute).to(TodoRoute);
container.bind<ITodoController>(TYPES.ITodoController).to(TodoController);
container.bind<ITodoService>(TYPES.ITodoService).to(TodoService);
container.bind<ITodoMongooseService>(TYPES.ITodoMongooseService).to(TodoMongooseService);
container.bind<ITodoNeo4jService>(TYPES.ITodoNeo4jService).to(TodoNeo4jService);
container.bind<ITodoDynamoDbService>(TYPES.ITodoDynamoDbService).to(TodoDynamoDbService);

// User Component
container.bind<IUserRoute>(TYPES.IUserRoute).to(UserRoute);
container.bind<IUserController>(TYPES.IUserController).to(UserController);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IUserMongooseService>(TYPES.IUserMongooseService).to(UserMongooseService);
container.bind<IUserNeo4jService>(TYPES.IUserNeo4jService).to(UserNeo4jService);
container.bind<IUserDynamoDbService>(TYPES.IUserDynamoDbService).to(UserDynamoDbService);

function bindDependencies(func, dependencies) {
  let injections = dependencies.map((dependency) => {
      return container.get(dependency);
  });
  return func.bind(func, ...injections);
}

export {container, bindDependencies};
