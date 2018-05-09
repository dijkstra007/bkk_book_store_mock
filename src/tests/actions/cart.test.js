import {
  addToCart,
  removeFromCart,
  addFromCartByOne,
  removeFromCartByOne,
  productDefaultObject
} from "../../actions/cart";
var chai = require("chai");
var expect = chai.expect;

describe("Action Cart", function() {
  it("should setup remove cart action object", () => {
    const action = removeFromCart("abc", "champ");
    expect(action).to.deep.equal({
      type: "REMOVE_FROM_CART",
      id: "abc",
      user: "champ"
    });
  });

  it("should setup add to cart action object", () => {
    const product = {
      id: "abc",
      name: "bnk-shirt",
      price: 100,
      tag: {},
      image: "",
      createdAt: 0
    };
    const action = addToCart(product, 1, "champ");
    expect(action).to.deep.equal({
      type: "ADD_TO_CART",
      product: {
        ...productDefaultObject,
        ...product,
        createdAt: action.product.createdAt,
        quantity: 1
      },
      user: "champ"
    });
  });
  it("should setup add to cart action object with defautl value", () => {
    const product = {
      id: "",
      name: "",
      price: 0,
      image: "",
      tag: "",
      createdAt: expect.any
    };
    const action = addToCart();
    expect(action).to.deep.equal({
      type: "ADD_TO_CART",
      product: {
        ...productDefaultObject,
        createdAt: action.product.createdAt,
        quantity: 0
      },
      user: undefined
    });
  });
  it("should setup addFromCaryByOne to cart action object", () => {
      const action = addFromCartByOne("abc","champ");
      expect(action).to.deep.equal({
        type: "ADD_FROM_CART_BY_ONE",
        id: "abc",
        user: "champ"
      });
    });

    it("should setup removeFromCartByOne to cart action object", () => {
      const action = removeFromCartByOne("abc","champ");
      expect(action).to.deep.equal({
        type: "REMOVE_FROM_CART_BY_ONE",
        id: "abc",
        user: "champ"
      });
    });
});
