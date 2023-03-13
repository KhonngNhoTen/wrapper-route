const joi2Swagger = require("joi-to-swagger");
/**
 *
 * @param {Object} router
 * @param {import("./WrapperGroupRoute").WrapperGropRouteSchema} configRouter
 * @param {BasicSwaggerSchema} swagger
 */
async function registry(router, configRouter, swagger) {
  // insert tags

  // config paths:
  for (let i = 0; i < configRouter.routes.length; i++) {
    loadSwagger(router, configRouter, swagger, i);
  }
}

//#region  Load Swagger
/**
 *
 * @param {Object} router
 * @param {import("./WrapperGroupRoute").WrapperGropRouteSchema} configRouter
 * @param {BasicSwaggerSchema} swagger
 * @param {number} index
 */
function loadSwagger(router, configRouter, swagger, index) {
  // If index == 9 (start), we config swagger
  let tag = configRouter.tag;
  if (index === 0) {
    insertTagIfNoExists(configRouter, swagger);
  }

  const route = configRouter.routes[index];
  let [method, url] = route.path.split(" ");
  url = `${configRouter.baseUrl ? configRouter.baseUrl : ""}${url}`;
  method = method.toLocaleLowerCase();

  // config swagger

  // init params into swagger
  const params = [...url.matchAll(/:\w+/g)];
  let parameters = [];
  for (let i = 0; params && i < params.length; i++) {
    parameters.push({
      name: params[i][0].split(":").pop(),
      in: "path",
      schema: {
        type: "string",
      },
      required: true,
    });

    url = url.replace(
      `${params[i][0]}${i == params.length - 1 ? "" : "/"}`,
      `{${params[i][0].split(":").pop()}}${i == params.length - 1 ? "" : "/"}`
    );
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
  swagger.paths[url] = !swagger.paths[url]
    ? { [method]: bodySwagger }
    : { ...swagger.paths[url], [method]: bodySwagger };
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

//#endregion

module.exports = registry;
