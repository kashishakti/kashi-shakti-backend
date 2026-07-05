const related = require('./related');
const logoLink = require('./logoLink');
const media = require('./media');

module.exports = {

    commonDynamicZone: {
        on: {

            // 🔹 Shared Components
            'shared.link': {
                populate: '*',
            },
            'shared.logo-link': logoLink,
            'shared.fa-qs': {
                populate: '*',
            },
            'shared.related-ekadashi': related.relatedEkadashi,
            'shared.related-amavasya': related.relatedAmavasya,
            'shared.related-vrat-katha': related.relatedVratKatha,
            'shared.related-temples': related.relatedTemples,
            'shared.related-puja-vidhi': related.relatedPujaVidhi,
            'shared.related-festivals': related.relatedFestivals,
            'shared.related-pradosh': related.relatedPradosh,
            'shared.related-purnima': related.relatedPurnima,
            'shared.related-blogs': related.relatedBlogs,
            'shared.related-aarti': related.relatedAarti,

            // 🔹 Section Components
            'section.hero': {
                populate: {
                    HeroImage: media,
                    HeroLink: true,
                },
            },
            'section.trust-badges': {
                populate: {
                    image: media,
                    Link: true,
                },
            },
            'section.featured-temples': {
                populate: {
                    ...related.relatedTemples.populate,
                    Link: true,
                },
            },
            'section.featured-vrat': {
                populate: {
                    ...related.relatedVratKatha.populate,
                    VratLink: true,
                },
            },
            'section.featured-puja-vidhi': {
                populate: {
                    ...related.relatedPujaVidhi.populate,
                    PujaVidhiLink: true,
                },
            },
            'section.pooja-widget': {
                populate: {
                    poojas: {
                        populate: {
                            FeaturedImage: media,
                        },
                    },
                },
            },
            'section.mantra-card-widget': {
                populate: {
                    mantra_cards: true,
                },
            },
            'shared.rich-text': {
                populate: '*',
            },

        },
    },

};