import "reflect-metadata";
import * as mocha from "mocha";
import {expect} from "chai";
import * as request from "supertest";

import {TYPES} from "../src/types";
import {container} from "../src/inversify.config";

import {app} from "../src/app";

describe("Demo Spec", () => {

  let demoData, demoRoutegUrl;

  beforeEach((done) => {
    demoRoutegUrl = '/demo/create';

    demoData = {
      'validData': {
        "name": "test",
        "code": "test"
      }
    };

    done();
  });

   
  it("Should call demo route url", done => {
    request( app )
      .post( demoRoutegUrl )
      .send( demoData['validData'] )
      .set('Accept', 'application/json')
      .expect(200)
      .end( (err, resp) =>  {
        expect(err).to.be.null;
        expect(resp.body).to.be.deep.equal(demoData["validData"])
        expect(resp.body).to.have.property('name');
        expect(resp.body).to.have.property('code');
      })
      done();
  });

});