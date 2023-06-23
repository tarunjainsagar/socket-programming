import Parent from "./Parent.js";

export default class Child extends Parent {
  constructor() {
    super();
    this.name = "Samvar";
  }

  getName() {
    return `Child Name is ${this.name}`;
  }

  getParentName() {
    return `Parent Name is ${this.getPlainName()}`;
  }
}
