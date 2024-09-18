const TodoErrors = {
  INVALID_OFFSET: 'invalid offset',
  INVALID_LIMIT: 'invalid limit',
  NO_ITEMS: 'no items',
  MISSING_FIELDS: 'missing required fields'
}

class CustomError extends Error {
  #code
  #message

  constructor(message, code) {
    super(message);
    this.setCode(code);
    this.setMessage(message)
  }

  getCode() {
    return this.#code
  }
  getMessage() {
    return this.#message
  }

  setCode(code) { this.#code = code; }
  setMessage(msg) { this.#message = msg; }
}


class InvalidOffsetError extends CustomError {
  constructor(message = TodoErrors.INVALID_OFFSET, code = 400) {
    super(message, code);
  }
}


class InvalidLimitError extends CustomError {
  constructor(message = TodoErrors.INVALID_LIMIT, code = 400) {
    super(message, code);
  }
}


class NoItemsError extends CustomError {
  constructor(message = TodoErrors.NO_ITEMS, code = 404) {
    super(message, code);
  }
}

class MissingFieldsError extends CustomError {
  constructor(message = TodoErrors.MISSING_FIELDS, code = 400) {
    super(message, code)
  }
}



module.exports = {
  CustomError,
  InvalidLimitError,
  InvalidOffsetError,
  NoItemsError,
  MissingFieldsError
};

