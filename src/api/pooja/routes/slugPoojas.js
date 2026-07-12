module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/poojas/slug/:slug',
            handler: 'pooja.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};
