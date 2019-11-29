import {Container, ContainerModule } from "inversify";
import {TYPES} from "./types";

import {ComponentRoutes, IComponentRoutes} from "./components/components.routes";

import {DemoRoute, IDemoRoute} from "./components/demo/demo.routes";
import {DemoController, IDemoController} from "./components/demo/demo.controller";
// import {DemoService, IDemoService} from "./components/demo/demo.service";

const container = new Container();

// const thirdPartyDependencies = new ContainerModule((bind) => {
//   bind<ISequelize>(TYPES.ISequelize).toConstantValue(sequelize);
//   // ..
// });

// const applicationDependencies = new ContainerModule((bind) => {
//   bind<IDemoSequelizeService>(TYPES.IDemoSequelizeService).to(DemoSequelizeService);
//   // ..
// });

// container.load(thirdPartyDependencies, applicationDependencies);

container.bind<IComponentRoutes>(TYPES.IComponentRoutes).to(ComponentRoutes);

container.bind<IDemoRoute>(TYPES.IDemoRoute).to(DemoRoute);
container.bind<IDemoController>(TYPES.IDemoController).to(DemoController);
// container.bind<IDemoService>(TYPES.IDemoService).to(DemoService);

function bindDependencies(func, dependencies) {
  let injections = dependencies.map((dependency) => {
      return container.get(dependency);
  });
  return func.bind(func, ...injections);
}

export {container, bindDependencies};
