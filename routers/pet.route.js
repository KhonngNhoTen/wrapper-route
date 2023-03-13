const Joi = require("joi");
const { WrapperGroupRoute } = require("../cores");
module.exports = new WrapperGroupRoute({
  baseUrl: "/pet",
  descriptionGroupRoute: "Every api for pet",
  tag: "Pet",
  routes: [
    {
      path: "GET /",
      description: "Get list pet",
      requestQueries: ["page", "limit", "name"],
      response: {
        name: "Pet's name",
        age: 11,
      },
    },

    {
      path: "POST /",
      description: "Create new pet",
      requestBodies: Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
      }),
      example: {},
      response: {
        name: "Pet's name",
        age: 11,
      },
    },
    {
      path: "GET /:id",
      description: "Detail new pet",
      example: {},
      response: {
        name: "Pet's name",
        age: 11,
      },
    },
  ],
});
