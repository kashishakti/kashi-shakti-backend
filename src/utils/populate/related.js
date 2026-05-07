module.exports = {

    relatedEkadashi: {
        populate: {
            ekadashis: true,
        },
    },

    relatedAmavasya: {
        populate: {
            amavasyas: true,
        },
    },

    relatedTemples: {
        populate: {
            temples: true,
        },
    },

    relatedFestivals: {
        populate: {
            festivals: true,
        },
    },

    relatedPujaVidhi: {
        populate: {
            puja_vidhis: true,
        },
    },

    relatedVratKatha: {
        populate: {
            vrat_kathas: true,
        },
    },

};