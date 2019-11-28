import "reflect-metadata";
import * as mocha from "mocha";
import * as chai from "chai";
import * as request from "supertest";

const expect = chai.expect;

import {TYPES} from "../src/types";
import {container} from "../src/inversify.config";

describe('chai test', () => {

  it('should compare some values', () => {
    expect(1).to.equal(1);
  })
})