import ValidatorString from './String.js';

export default class Validator {
  obj = {};

  string() {
    this.obj = new ValidatorString();
    return this.obj;
  }
}
