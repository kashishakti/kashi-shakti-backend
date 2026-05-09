const media = require('./media');
const menu = require('./menu');

module.exports = {
    populate: {

        Logo: {
            populate: {
                image: media,
            },
        },

        menu,

    },
};