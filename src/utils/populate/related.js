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
                fields: [
                    "id",
                    "documentId",
                    "Title",
                    "Slug",
                    "ShortDescription",
                    "VikramSamvataYear",
                    "AmavasyaDate",
                    "Notes",
                ],
                populate: {
                    FeaturedImage: media,
                    Deity: true,
                    AmavasyaMonth: true,
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
                fields: [
                    "id",
                    "documentId",
                    "Title",
                    "Slug",
                    "ShortDescription",
                    "VikramSamvataYear",
                    "TrayodashiPaksha",
                    "Date",
                    "Notes",
                ],
                populate: {
                    FeaturedImage: media,
                    Deity: true,
                    HinduMonth: true,
                    Muhurat: true,
                    DayPradoshaTime: true,
                    TrayodashiTithi: true,
                },
            },
        },
    },

    relatedPurnima: {
        populate: {
            purnimas: {
                fields: [
                    "id",
                    "documentId",
                    "Title",
                    "Slug",
                    "ShortDescription",
                    "VikramSamvataYear",
                    "PurnimaDate",
                    "MoonriseTime",
                    "Notes",
                ],
                populate: {
                    FeaturedImage: media,
                    Deity: true,
                    PurnimaMonth: true,
                    PurnimaTimings: true,
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