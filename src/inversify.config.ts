import {Container, ContainerModule } from "inversify";
import {TYPES} from "./types";

import {ComponentRoutes, IComponentRoutes} from "./components/components.routes";

import {TodoRoute, ITodoRoute} from "./components/todo/todo.routes";
import {TodoController, ITodoController} from "./components/todo/todo.controller";
import {TodoService, ITodoService} from "./components/todo/todo.service";
import { ITodoMongooseService, TodoMongooseService } from "./components/todo/mongoose/todo.mongoose.service";

const container = new Container();

// const thirdPartyDependencies = new ContainerModule((bind) => {
//   bind<ISequelize>(TYPES.ISequelize).toConstantValue(sequelize);
//   // ..
// });

// const applicationDependencies = new ContainerModule((bind) => {
//   bind<ITodoSequelizeService>(TYPES.ITodoSequelizeService).to(TodoSequelizeService);
//   // ..
// });

// container.load(thirdPartyDependencies, applicationDependencies);

container.bind<IComponentRoutes>(TYPES.IComponentRoutes).to(ComponentRoutes);

container.bind<ITodoRoute>(TYPES.ITodoRoute).to(TodoRoute);
container.bind<ITodoController>(TYPES.ITodoController).to(TodoController);
container.bind<ITodoService>(TYPES.ITodoService).to(TodoService);
container.bind<ITodoMongooseService>(TYPES.ITodoMongooseService).to(TodoMongooseService);

function bindDependencies(func, dependencies) {
  let injections = dependencies.map((dependency) => {
      return container.get(dependency);
  });
  return func.bind(func, ...injections);
}

export {container, bindDependencies};
