import { login, logout } from "../../actions/auth";
var chai = require("chai");
var expect = chai.expect;

describe("Action Auth", function() {
  it("should generate login action object", () => {
    const uid = "abc123";
    const action = login(uid);
    expect(action).to.deep.equal({
      type: "LOGIN",
      uid
    });
  });

  it("should generate logout action object", () => {
    const action = logout();
    expect(action).to.deep.equal({
      type: "LOGOUT"
    });
  });
});
