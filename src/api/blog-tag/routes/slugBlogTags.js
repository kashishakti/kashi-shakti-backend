module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/blog-tags/slug/:slug',
            handler: 'blog-tag.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};
