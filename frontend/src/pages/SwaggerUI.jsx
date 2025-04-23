import React from 'react';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import SwaggerDoc from "../assets/swagger.json";

/**
 * The SwaggerPage displays the Swagger UI for the API documentation.
 */
const SwaggerPage = () => {
  return (
    <div className="page-contents" style={{ height: "100vh" }}>
      <SwaggerUI spec={SwaggerDoc} />
      <a href="https://app.swaggerhub.com/apis/zulu-1bf/Zulu_urban_planning_API/1.0.0">https://app.swaggerhub.com/apis/zulu-1bf/Zulu_urban_planning_API/1.0.0</a>
    </div>
  );
};

export default SwaggerPage;
