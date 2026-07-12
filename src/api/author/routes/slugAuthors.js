module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/authors/slug/:slug',
            handler: 'author.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};
