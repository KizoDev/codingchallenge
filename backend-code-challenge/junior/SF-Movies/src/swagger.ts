import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'SF MOVIES API',
            version: '1.0.0',
            description: 'API that shows on a map where movies have been filmed in San Francisco',
        },
        basePath: '/',
    },
    apis: ['./src/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
