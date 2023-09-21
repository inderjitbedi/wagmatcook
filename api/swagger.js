const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Wagmatcook',
            version: '1.0.0',
            description: 'Documentation for Wagmatcook API',
        },
    },
    apis: [
        'app.js',
        './routes/auth.js',
        './routes/benefit.js',

    ],
};

module.exports = swaggerJSDoc(swaggerOptions);

