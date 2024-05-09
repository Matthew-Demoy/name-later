import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'API documentation generated using Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000', // Update the URL to match your server address
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/app.ts'], // Path to the file containing your Express routes
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
