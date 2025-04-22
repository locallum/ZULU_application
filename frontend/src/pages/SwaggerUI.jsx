import React from 'react';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const swaggerDefinition = {
  swagger: '2.0',  // OR 'swagger: "2.0"' for Swagger 2.0
  info: {
    title: 'My API',
    description: 'This is my API description.',
    version: '1.0.0',
  },
  paths: {
    '/example': {
      get: {
        summary: 'Get example data',
        responses: {
          200: {
            description: 'Success',
          },
        },
      },
    },
  },
};

/**
 * The SwaggerPage displays the Swagger UI for the API documentation.
 */
const SwaggerPage = () => {
  return (
    <div className="page-contents" style={{ height: "100vh" }} spec={swaggerDefinition}>
      <SwaggerUI url="/src/assets/swagger.json" />
      <a href="https://app.swaggerhub.com/apis/zulu-1bf/Zulu_urban_planning_API/1.0.0">https://app.swaggerhub.com/apis/zulu-1bf/Zulu_urban_planning_API/1.0.0</a>
    </div>
  );
};

export default SwaggerPage;
