import { getTransportationPrice } from "../../calculator/carry";
import * as CARRY from '../../constants/carry';

var chai = require("chai");
var expect = chai.expect;
describe("Calculator Carry Price Test", function() {
  it("far from bkk register price", () => {
    const province = "อุตรดิตถ์";
    const type = CARRY.THAILAND_POST.REGISTER.type
    const price = getTransportationPrice(type, province)
    expect(price).to.equal(30);
  });
  it("far from bkk ems price", () => {
    const province = "อุตรดิตถ์";
    const type = CARRY.THAILAND_POST.EMS.type
    const price = getTransportationPrice(type, province)
    expect(price).to.equal(50);
  });
  it("near bkk ems price", () => {
    const province = "กรุงเทพมหานคร";
    const type = CARRY.THAILAND_POST.EMS.type
    const price = getTransportationPrice(type, province)
    expect(price).to.equal(50);
  });
  it("near bkk ems price", () => {
    const province = "กรุงเทพมหานคร";
    const type = CARRY.THAILAND_POST.REGISTER.type
    const price = getTransportationPrice(type, province)
    expect(price).to.equal(30);
  });

  it("near bkk quantiam price", () => {
    const province = "กรุงเทพมหานคร";
    const type = CARRY.QUANTIAM.type
    const price = getTransportationPrice(type, province)
    expect(price).to.equal(50);
  });


});

  