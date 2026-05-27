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
                    "Slug"
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
            amavasyas: {
                populate: {
                    FeaturedImage: media,
                    AmavasyaTimings: true,
                },
            },
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
            festivals: {
                populate: {
                    FeaturedImage: media,
                },
            },
        },
    },

    relatedPujaVidhi: {
        populate: {
            puja_vidhis: {
                populate: {
                    FeaturedImage: media,
                },
            },
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
            pradoshes: {
                populate: {
                    FeaturedImage: media,
                },
            },
        },
    },

    relatedPurnima: {
        populate: {
            purnimas: {
                populate: {
                    FeaturedImage: media,
                    PurnimaMonth: true,
                },
            },
        },
    },

    relatedBlogs: {
        populate: {
            blogs: {
                populate: {
                    FeaturedImage: media,
                },
            },
        },
    },

};