const media = require("./media");
module.exports = {

    relatedEkadashi: {
        populate: {
            ekadashis: {
                fields: [
                    "id",
                    "documentId",
                    "Title",
                    "ShortDescription",
                    "EkadashiPaksha",
                    "Date",
                ],
                populate: {
                    FeaturedImage: media,

                    EkadashiTime: true,
                    ParanaTime: true,

                    EkadashiMonth: {
                        fields: ["Month"],   // ✅ correct field
                    },
                },
            },
        },
    },

    relatedAmavasya: {
        populate: {
            amavasyas: true,
        },
    },

    relatedTemples: {
        populate: {
            temples: {
                fields: [
                    "id",
                    "documentId",
                    "Title",
                    "Slug",
                    "ShortDescription",
                    "Location",
                    "TempleTimings",
                ],
                populate: {
                    FeaturedImage: media,
                },
            },
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
            vrat_kathas: {
                fields: [
                    "id",
                    "documentId",
                    "Title",
                    "Slug",
                    "ShortDescription",
                ],
                populate: {
                    FeaturedImage: media,
                },
            },
        },
    },
    relatedPradosh: {
        populate: {
            pradoshes: true,
        },
    },

    relatedPurnima: {
        populate: {
            purnimas: true,
        },
    },

    relatedBlogs: {
        populate: {
            blogs: true,
        },
    },

};