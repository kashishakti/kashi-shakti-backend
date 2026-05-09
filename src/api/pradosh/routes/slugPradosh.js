module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/pradoshes/slug/:slug',
            handler: 'pradosh.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};