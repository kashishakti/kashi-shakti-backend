module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/temples/slug/:slug',
            handler: 'temple.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};