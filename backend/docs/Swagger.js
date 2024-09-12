const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "AI-Powered Personal Mentor for Career Growth",
            version: '1.0.0',
            description: 'The AI-Powered Personal Mentor for Career Growth is a platform that leverages artificial intelligence to provide personalized career guidance and development.'
        },
        servers: [
            {
                url: 'http://localhost:8081/'
            }
        ]
    },
    apis: [path.join(__dirname, '../Routes/Route.js')],
    apis: [path.join(__dirname, '../SwaggerDocs/UserDocs.js')]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
