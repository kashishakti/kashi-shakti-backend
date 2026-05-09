module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/purnimas/slug/:slug',
            handler: 'purnima.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};