export default class Parent {
  constructor() {
    this.parentname = "Tarun";
  }

  getPlainName() {
    return this.parentname;
  }

  getName() {
    return `My name is ${this.parentname}`;
  }
}
