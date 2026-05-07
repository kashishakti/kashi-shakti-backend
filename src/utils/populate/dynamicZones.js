const related = require('./related');

module.exports = {

    commonDynamicZone: {
        on: {

            'shared.link': {
                populate: '*',
            },

            'shared.fa-qs': {
                populate: '*',
            },

            'shared.related-ekadashi': related.relatedEkadashi,

            'shared.related-amavasya': related.relatedAmavasya,

            'shared.related-vrat-katha': related.relatedVratKatha,

            'shared.related-temples': related.relatedTemples,

            'shared.related-puja-vidhi': related.relatedPujaVidhi,

            'shared.related-festivals': related.relatedFestivals,

        },
    },

};