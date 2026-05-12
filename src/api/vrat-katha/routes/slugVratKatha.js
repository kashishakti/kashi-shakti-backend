module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/vrat-kathas/slug/:slug',
            handler: 'vrat-katha.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};