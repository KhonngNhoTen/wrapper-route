const path = require("path");
class Mocks {
  /**
   * @param {string} fileMock
   */
  constructor(fileMock) {
    this.mocks = require(path.join(__dirname, fileMock));
  }
}
