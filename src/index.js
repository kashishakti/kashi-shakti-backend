'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    try {
      // 1. Seed Author if none exists
      const authorsCount = await strapi.entityService.count('api::author.author');
      let dummyAuthor;
      if (authorsCount === 0) {
        dummyAuthor = await strapi.entityService.create('api::author.author', {
          data: {
            Title: 'Dummy Author',
            Slug: 'dummy-author',
            ShortDescription: 'This is a dummy author description.',
            Description: 'Detailed description of dummy author.',
            publishedAt: new Date(),
          },
        });
        console.log('Seeded dummy author');
      } else {
        const list = await strapi.entityService.findMany('api::author.author', { limit: 1 });
        dummyAuthor = list[0];
      }

      // 2. Seed Blog Tag if none exists
      const tagsCount = await strapi.entityService.count('api::blog-tag.blog-tag');
      let dummyTag;
      if (tagsCount === 0) {
        dummyTag = await strapi.entityService.create('api::blog-tag.blog-tag', {
          data: {
            Title: 'Dummy Tag',
            Slug: 'dummy-tag',
            ShortDescription: 'Dummy tag short description.',
            publishedAt: new Date(),
          },
        });
        console.log('Seeded dummy blog tag');
      } else {
        const list = await strapi.entityService.findMany('api::blog-tag.blog-tag', { limit: 1 });
        dummyTag = list[0];
      }

      // 3. Seed Mantra Card if none exists
      const mantraCardsCount = await strapi.entityService.count('api::mantra-card.mantra-card');
      let dummyMantra;
      if (mantraCardsCount === 0) {
        dummyMantra = await strapi.entityService.create('api::mantra-card.mantra-card', {
          data: {
            Title: 'Dummy Mantra Card',
            Slug: 'dummy-mantra-card',
            ShortDescription: 'Dummy mantra card short description.',
            Price: '101',
            publishedAt: new Date(),
          },
        });
        console.log('Seeded dummy mantra card');
      } else {
        const list = await strapi.entityService.findMany('api::mantra-card.mantra-card', { limit: 1 });
        dummyMantra = list[0];
      }

      // 4. Seed Pooja if none exists
      const poojasCount = await strapi.entityService.count('api::pooja.pooja');
      let dummyPooja;
      if (poojasCount === 0) {
        dummyPooja = await strapi.entityService.create('api::pooja.pooja', {
          data: {
            PoojaTitle: 'Dummy Pooja',
            Slug: 'dummy-pooja',
            ShortDescription: 'Dummy pooja short description.',
            Price: 501,
            publishedAt: new Date(),
          },
        });
        console.log('Seeded dummy pooja');
      } else {
        const list = await strapi.entityService.findMany('api::pooja.pooja', { limit: 1 });
        dummyPooja = list[0];
      }

      // 5. Seed Blog if none exists
      const blogsCount = await strapi.entityService.count('api::blog.blog');
      let dummyBlog;
      if (blogsCount === 0) {
        dummyBlog = await strapi.entityService.create('api::blog.blog', {
          data: {
            Title: 'Dummy Blog Post',
            Slug: 'dummy-blog-post',
            ShortDescription: 'This is a short description of the dummy blog post.',
            Description: 'Detailed content of the dummy blog post.',
            ReadTime: '5 mins',
            Author: {
              authors: dummyAuthor ? [dummyAuthor.id] : [],
            },
            BlogTags: [
              {
                blog_tags: dummyTag ? [dummyTag.id] : [],
              }
            ],
            LeftBlock: [
              {
                __component: 'shared.rich-text',
                RichText: 'This is some rich text component content inside the blog block.',
              },
              {
                __component: 'section.pooja-widget',
                ShowonSideBar: true,
                poojas: dummyPooja ? [dummyPooja.id] : [],
              },
              {
                __component: 'section.mantra-card-widget',
                ShowonSideBar: false,
                mantra_cards: dummyMantra ? [dummyMantra.id] : [],
              }
            ],
            RightBlock: [
              {
                __component: 'shared.rich-text',
                RichText: 'This is some rich text component content inside the blog block.',
              },
              {
                __component: 'section.pooja-widget',
                ShowonSideBar: true,
                poojas: dummyPooja ? [dummyPooja.id] : [],
              },
              {
                __component: 'section.mantra-card-widget',
                ShowonSideBar: false,
                mantra_cards: dummyMantra ? [dummyMantra.id] : [],
              }
            ],
            publishedAt: new Date(),
          },
        });
        console.log('Seeded dummy blog with components and relations');
      } else {
        const list = await strapi.entityService.findMany('api::blog.blog', { limit: 1 });
        dummyBlog = list[0];
      }

      // 6. Seed Blog Page (Single Type) if none exists
      const blogPageCount = await strapi.entityService.count('api::blog-page.blog-page');
      if (blogPageCount === 0) {
        await strapi.entityService.create('api::blog-page.blog-page', {
          data: {
            Title: 'Kashi Shakti Blog Page',
            ShortDescription: 'Welcome to the blogs page.',
            FeaturedBlog: {
              blogs: dummyBlog ? [dummyBlog.id] : [],
            },
            EditorsPicks: {
              blogs: dummyBlog ? [dummyBlog.id] : [],
            },
            PopularThisWeek: {
              blogs: dummyBlog ? [dummyBlog.id] : [],
            },
            publishedAt: new Date(),
          },
        });
        console.log('Seeded dummy blog page single type');
      }
    } catch (err) {
      console.error('Error seeding dummy data:', err);
    }
  },
};
