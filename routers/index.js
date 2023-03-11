const { SwaggerCreator, RegistryRoute } = require("../cores");
const router = require("express").Router();
const glob = require("glob");

const swagger = SwaggerCreator.initSwagger({
  info: {
    title: "Test",
    description: "TEST DES",
    version: "1.0.3",
  },
  servers: [
    {
      url: "TEST",
    },
  ],
  openapi: "3.0.3",
});

const routes = glob
  .globSync("routers/*.route.js")
  .map((e) => e.split("/").pop());
for (let i = 0; i < routes.length; i++) {
  const route = routes[i];
  const wrapperRoute = require(`./${route}`);
  RegistryRoute(router, wrapperRoute, swagger);
}

SwaggerCreator.saveSwagger(swagger);
