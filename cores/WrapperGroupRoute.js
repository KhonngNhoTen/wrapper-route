/**
 * @typedef {Object} WrapperRouteSchema
 * @property {string|null} description
 * @property {string} path
 * @property {Array<string>} authorization
 * @property {Object|null} request
 * @property {Object} requestBodies
 * @property {Array<string>} requestQueries
 * @property {Promise} handler
 * @property {Object} response
 */

/**
 * @typedef {Object} WrapperGropRouteSchema
 * @property {string} tag
 * @property {string} descriptionGroupRoute
 * @property {string} baseUrl
 * @property {Array<WrapperRouteSchema>} routes
 */

class WrapperGroupRoute {
  /** @param {WrapperGropRouteSchema} schema*/
  constructor(schema) {
    this.tag = schema.tag;
    this.descriptionGroupRoute = schema.descriptionGroupRoute;
    this.routes = schema.routes;
  }
}

module.exports = WrapperGroupRoute;
