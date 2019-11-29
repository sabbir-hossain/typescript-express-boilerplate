import "reflect-metadata";
import {Container, ContainerModule } from "inversify";
import * as mocha from "mocha";
import * as chai from "chai";
import * as request from "supertest";
const expect = chai.expect;

import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
chai.use(sinonChai);
const sandbox = sinon.createSandbox();

import {TYPES} from "../src/types";
import {container, bindDependencies} from "../src/inversify.config";
import { IDemoController } from "../src/components/demo/demo.controller";
import { IDemoRoute } from "../src/components/demo/demo.routes";

describe.only("Demo Spec 2", () => {

  let demoData, demoRouteUrl, demoController, demoRoute, insertStub;
  
  demoController = container.get<IDemoController>(TYPES.IDemoController);
  demoRouteUrl = '/demo/create';

  beforeEach((done) => {
    
    
    
    // let warriors = new ContainerModule((bind: Bind) => {
    //   bind<IDemoController>(TYPES.IDemoController).to(Ninja);
    // });
  
    // const thisContainer = new Container();
    // thisContainer.load(demoController);
    // demoRoute = bindDependencies(route.create, [TYPES.IDemoController]);

    insertStub = sandbox.stub(demoController, 'create');

    demoData = {
      'validData': {
        "name": "test",
        "code": "test"
      },
      "invalidData": {
        "name": "test"
      }
    };

    done();
  });

  afterEach(() => {
    // Restore the default sandbox here
    sandbox.restore();
    // insertStub.restore();
  });

  it("Should call demo route url", async done => {
    // console.log({demoRoute});
    demoRoute  = container.get<IDemoRoute>(TYPES.IDemoRoute);
    const stub =  insertStub.returns( { name: "test xyz", code: "test abc"});
    const result = await demoRoute.create({body: demoData.validData}, {send: (params) => params});
    console.log({result})
    expect(stub).to.have.been.called;
    done();
  });

});