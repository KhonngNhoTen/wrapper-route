const joi2Swagger = require("joi-to-swagger");
/**
 *
 * @param {Object} router
 * @param {import("./WrapperGroupRoute").WrapperGropRouteSchema} configRouter
 * @param {BasicSwaggerSchema} swagger
 */
async function registry(router, configRouter, swagger) {
  // insert tags
  const tag = configRouter.tag;
  insertTagIfNoExists(configRouter, swagger);

  // config paths:
  for (let i = 0; i < configRouter.routes.length; i++) {
    const route = configRouter.routes[i];
    let [method, url] = route.path.split(" ");
    url = `${configRouter.baseUrl ? configRouter.baseUrl : ""}${url}`;
    method = method.toLocaleLowerCase();

    // config swagger

    // init params into swagger
    const params = url.match(/:\w+/);
    let parameters = [];
    for (let i = 0; params && i < params.length; i++) {
      parameters.push({
        name: params[i],
        in: "path",
        schema: {
          type: "string",
        },
      });
    }

    // init query swagger
    for (
      let i = 0;
      route.requestQueries && i < route.requestQueries.length;
      i++
    ) {
      const query = route.requestQueries[i];
      parameters.push({
        name: query,
        in: "query",
        schema: {
          type: "string",
        },
      });
    }

    const bodySwagger = {
      description: route.description,
      //   security: ["auth_api"],

      parameters,
      tags: [tag],
    };

    if (route.requestBodies) {
      console.log(joi2Swagger(route.requestBodies).swagger);
      bodySwagger.requestBody = {
        content: {
          "application/json": {
            schema: joi2Swagger(route.requestBodies).swagger,
          },
        },
      };
    }
    swagger.paths[url] = { [method]: bodySwagger };
    router[`${method}`](url, () => {});
  }
}

function insertTagIfNoExists(configRouter, swagger) {
  let isExists = false;
  for (let i = 0; i < swagger.tags.length; i++) {
    if (swagger.tags[i].name === configRouter.tag) {
      isExists = true;
      break;
    }
  }

  if (!isExists) {
    swagger.tags.push({
      name: configRouter.tag,
      description: configRouter.descriptionGroupRoute
        ? configRouter.descriptionGroupRoute
        : "",
    });
  }
}

module.exports = registry;
