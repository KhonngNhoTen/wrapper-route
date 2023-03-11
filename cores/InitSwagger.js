const fs = require("fs");
/**
 * @typedef {Object} BasicSwaggerSchema
 * @property {string} openapi
 * @property {Object} info
 * @property {string} info.title
 * @property {string} info.description
 * @property {string} info.version
 * @property {Array<string>} servers
 * @property {Array<{name: "", description: ""}>} tags
 * @property {Object.<string, Object.<string,PathSwagger>>} paths
 * @property {Object} components
 */

/**
 * @typedef {Object} PathSwagger
 * @property {string} tags
 * @property {string} description
 * @property {Array<Object>} parameters
 * @property {string} parameters.name
 * @property {"query"|"path"} parameters.in
 * @property {string} parameters.description
 * @property {boolean} parameters.required
 * @property {Object} parameters.schema
 * @property {Array<Object>} parameters.schema.type
 * @property {Array<Object>} security
 * @property {Object} requestBody
 * @property {Object} requestBody.content
 */

/**
 * @param {BasicSwaggerSchema} options
 */
function initSwagger(options) {
  /** @type {BasicSwaggerSchema} */
  let swagger = options;
  swagger.tags = [];
  swagger.paths = {};
  return swagger;
}

function saveSwagger(swagger) {
  const _swagger = JSON.stringify(swagger);
  fs.writeFileSync("swagger-out.json", _swagger);
}

module.exports = {
  initSwagger,
  saveSwagger,
};
