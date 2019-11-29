import "reflect-metadata";
import * as mocha from "mocha";
import * as chai from "chai";
import * as request from "supertest";
const expect = chai.expect;

import {app} from "../src/app";

describe("Demo Spec", () => {

  let todoData, todoRouteUrl;

  beforeEach((done) => {
    todoRouteUrl = '/todo/create';

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

   
  it("Should call todo route url", done => {
    request( app )
      .post( todoRouteUrl )
      .send( todoData['validData'] )
      .set('Accept', 'application/json')
      .expect(200)
      .end( (err, resp) =>  {
        expect(err).to.be.null;
        expect(resp.body).to.be.deep.equal(todoData["validData"])
        expect(resp.body).to.have.property('name');
        expect(resp.body).to.have.property('code');
      })
      done();
  });

  it("Should call todo route url with error response", done => {
    request( app )
      .post( todoRouteUrl )
      .send( todoData['validData'] )
      .set('Accept', 'application/json')
      .expect(400)
      .end( (err, resp) =>  {
        expect(err).to.be.not.null;
      })
      done();
  });

});