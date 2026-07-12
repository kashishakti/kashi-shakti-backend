module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/mantra-cards/slug/:slug',
            handler: 'mantra-card.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};
