module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/aartis/slug/:slug',
            handler: 'aarti.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};
