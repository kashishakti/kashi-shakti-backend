module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/festivals/slug/:slug',
            handler: 'festival.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};