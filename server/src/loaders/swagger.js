export default {
    definition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'The Webster API',
            description: 'Documentation of the Webster API',
        },
        servers: [{ url: process.env.SERVER_URL }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./docs/*.yaml'],
};