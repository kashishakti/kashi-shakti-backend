module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/puja-vidhis/slug/:slug',
            handler: 'puja-vidhi.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};