export default class ValidatorString {
  options = {
    required: false,
    contains: null,
    minLength: null,
  };

  validationResult = {};

  #isRequired() {
    return this.options.required;
  }

  #isContains() {
    return this.options.contains !== null ? this.options.contains : false;
  }

  #isMinLength() {
    return this.options.minLength !== null ? this.options.minLength : false;
  }

  #testRequired(str) {
    const isRequired = this.#isRequired();

    if (typeof str === 'string') {
      return isRequired ? !!str.trim() : true;
    }

    if (typeof str === 'undefined' || str === null) {
      return !isRequired;
    }

    return false;
  }

  #testContains(str) {
    const contains = this.#isContains();
    if (!contains) {
      return true;
    }

    if (typeof str === 'undefined' || str === null) {
      return false;
    }

    if (typeof str === 'string' && str.includes(contains)) {
      return true;
    }

    return false;
  }

  #testMinLength(str) {
    const minLength = this.#isMinLength();
    if (!minLength) {
      return true;
    }

    if (typeof str === 'undefined' || str === null) {
      return false;
    }

    if (typeof str === 'string' && str.length >= minLength) {
      return true;
    }

    return false;
  }

  #test(key, str) {
    switch (key) {
      case 'required':
        return this.#testRequired(str);
      case 'contains':
        return this.#testContains(str);
      case 'minLength':
        return this.#testMinLength(str);
      default:
        return true;
    }
  }

  required() {
    this.options.required = true;
    return this;
  }

  contains(value = null) {
    const isNotString =
      value === null || typeof value !== 'string' || value?.trim() === '';
    if (isNotString) {
      this.options.contains = null;
      return this;
    }
    this.options.contains = value;
    return this;
  }

  minLength(value = null) {
    const isNotNumber = value === null || typeof value !== 'number';
    if (isNotNumber) {
      this.options.minLength = null;
      return this;
    }
    this.options.minLength = value;
    return this;
  }

  isValid(str) {
    const result = {};
    const options = Object.keys(this.options);

    for (let i = 0; i < options.length; i += 1) {
      const key = options[i];
      result[key] = this.#test(key, str);
    }

    this.validationResult = result;
    const set = new Set([...Object.values(result)]);
    if (set.has(false)) {
      return false;
    }

    return true;
  }
}
