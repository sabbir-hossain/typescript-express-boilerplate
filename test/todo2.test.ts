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
import { TodoController, ITodoController } from "../src/components/todo/todo.controller";

import { ITodoRoute } from "../src/components/todo/todo.routes";
import { TodoService, ITodoService } from './../src/components/todo/todo.service';

// nyc mocha -r ts-node/register test/**/*
describe.only("Todo Spec 2", () => {

  let todoData, todoRouteUrl, todoController, todoRoute;
  
  let todoService = container.get<ITodoService>(TYPES.ITodoService);
  todoRouteUrl = '/todo/create';
  let insertStub : sinon.SinonStub<any, any>;
  beforeEach((done) => {
    // let warriors = new ContainerModule((bind: Bind) => {
    //   bind<ITodoController>(TYPES.ITodoController).to(Ninja);
    // });
  
    // const thisContainer = new Container();
    // thisContainer.load(todoController);
    // todoRoute = bindDependencies(route.create, [TYPES.ITodoController]);

    insertStub = sandbox.stub(TodoService.prototype, 'create');

    todoData = {
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

  it("Should call todo route url", async done => {
    // console.log({todoRoute});
    todoController  = container.get<ITodoController>(TYPES.ITodoController);
    // let todoService = container.get<ITodoService>(TYPES.ITodoService);
    const stub =  insertStub.returns( { name: "test xyz", code: "test abc"});
    const req = {
      decoded: { payload: {}},
      data: todoData.validData
    }
    const result = await todoController.create(req.decoded, req.data);
    console.log({result})
    expect(stub).to.have.been.called;
    done();
  });

});