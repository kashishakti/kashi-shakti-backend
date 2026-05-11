'use strict';

const media = require('../../../utils/populate/media');
const lightweightPopulate = {
    FeaturedImage: media,
    Deity: true,
};

module.exports = {
    async find(ctx) {
        try {
            // Get current date (start of today)
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Format to YYYY-MM-DD for Strapi date comparison
            const dateStr = today.toISOString().split('T')[0];

            // 1. Fetch Amavasya
            const amavasyaPromise = strapi.entityService.findMany('api::amavasya.amavasya', {
                filters: { AmavasyaDate: { $gte: dateStr } },
                sort: { AmavasyaDate: 'asc' },
                limit: 1,
                populate: lightweightPopulate
            });

            // 2. Fetch Ekadashi
            const ekadashiPromise = strapi.entityService.findMany('api::ekadashi.ekadashi', {
                filters: { Date: { $gte: dateStr } },
                sort: { Date: 'asc' },
                limit: 1,
                populate: lightweightPopulate
            });

            // 3. Fetch Pradosh
            const pradoshPromise = strapi.entityService.findMany('api::pradosh.pradosh', {
                filters: { Date: { $gte: dateStr } },
                sort: { Date: 'asc' },
                limit: 1,
                populate: lightweightPopulate
            });

            // 4. Fetch Purnima
            const purnimaPromise = strapi.entityService.findMany('api::purnima.purnima', {
                filters: { PurnimaDate: { $gte: dateStr } },
                sort: { PurnimaDate: 'asc' },
                limit: 1,
                populate: lightweightPopulate
            });

            // 5. Fetch Festival
            const festivalPromise = strapi.entityService.findMany('api::festival.festival', {
                filters: { Date: { $gte: dateStr } },
                sort: { Date: 'asc' },
                limit: 1,
                populate: lightweightPopulate
            });

            // Execute all queries concurrently
            const [amavasyaData, ekadashiData, pradoshData, purnimaData, festivalData] = await Promise.all([
                amavasyaPromise,
                ekadashiPromise,
                pradoshPromise,
                purnimaPromise,
                festivalPromise
            ]);

            // Combine into a single response object
            ctx.body = {
                upcomingAmavasya: amavasyaData.length > 0 ? amavasyaData[0] : null,
                upcomingEkadashi: ekadashiData.length > 0 ? ekadashiData[0] : null,
                upcomingPradosh: pradoshData.length > 0 ? pradoshData[0] : null,
                upcomingPurnima: purnimaData.length > 0 ? purnimaData[0] : null,
                upcomingFestival: festivalData.length > 0 ? festivalData[0] : null,
            };

        } catch (err) {
            ctx.throw(500, err);
        }
    }
};
