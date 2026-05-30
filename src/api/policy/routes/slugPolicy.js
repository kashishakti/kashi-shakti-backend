module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/policies/slug/:slug',
            handler: 'policy.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};
