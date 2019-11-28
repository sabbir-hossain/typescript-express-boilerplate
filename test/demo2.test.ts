import "reflect-metadata";
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
import {container} from "../src/inversify.config";
import { IDemoController } from "../src/components/demo/demo.controller";
import { IDemoRoute } from "../src/components/demo/demo.routes";

describe.only("Demo Spec 2", () => {

  let demoData, demoRouteUrl, demoController, demoRoute, insertStub;

  beforeEach((done) => {
    demoRouteUrl = '/demo/create';
    demoRoute = container.get<IDemoRoute>(TYPES.IDemoRoute);
    demoController = container.get<IDemoController>(TYPES.IDemoController);
   
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
  });

  it("Should call demo route url", async done => {
    const stub = insertStub.resolves({ body: { name: "test xyz", code: "test abc"} });
    demoController.create(demoData.validData)
    expect(stub).to.have.been.called;
    done();
  });

});