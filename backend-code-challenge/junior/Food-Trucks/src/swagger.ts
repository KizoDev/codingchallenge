import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Food Trucks API',
            version: '1.0.0',
            description: 'API for finding food trucks near a specific location on a map',
        },
        basePath: '/',
    },
    apis: ['./src/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
