module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/amavasyas/slug/:slug',
            handler: 'amavasya.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};