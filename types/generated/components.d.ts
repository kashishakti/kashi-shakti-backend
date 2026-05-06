import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutBanner extends Struct.ComponentSchema {
  collectionName: 'components_layout_banners';
  info: {
    displayName: 'Banner';
  };
  attributes: {
    description: Schema.Attribute.Text;
    isVisible: Schema.Attribute.Boolean;
    Link: Schema.Attribute.Component<'shared.link', false>;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    BrandInformation: Schema.Attribute.Text;
    CopyrightText: Schema.Attribute.Text;
    Logo: Schema.Attribute.Component<'shared.logo-link', false>;
    menus: Schema.Attribute.Relation<'oneToMany', 'api::menu.menu'>;
    SocialLinks: Schema.Attribute.Component<'shared.logo-link', true>;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    Logo: Schema.Attribute.Component<'shared.logo-link', false>;
    menu: Schema.Attribute.Relation<'oneToOne', 'api::menu.menu'>;
  };
}

export interface SectionFeaturedPujaVidhi extends Struct.ComponentSchema {
  collectionName: 'components_section_featured_puja_vidhis';
  info: {
    displayName: 'Featured Puja Vidhi';
  };
  attributes: {
    description: Schema.Attribute.Text;
    Heading: Schema.Attribute.String;
    puja_vidhis: Schema.Attribute.Relation<
      'oneToMany',
      'api::puja-vidhi.puja-vidhi'
    >;
    PujaVidhiLink: Schema.Attribute.Component<'shared.link', false>;
  };
}

export interface SectionFeaturedTemples extends Struct.ComponentSchema {
  collectionName: 'components_section_featured_temples';
  info: {
    displayName: 'Featured Temples';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    Link: Schema.Attribute.Component<'shared.link', false>;
    temples: Schema.Attribute.Relation<'oneToMany', 'api::temple.temple'>;
  };
}

export interface SectionFeaturedVrat extends Struct.ComponentSchema {
  collectionName: 'components_section_featured_vrats';
  info: {
    displayName: 'Featured Vrat';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    vrat_kathas: Schema.Attribute.Relation<
      'oneToMany',
      'api::vrat-katha.vrat-katha'
    >;
    VratLink: Schema.Attribute.Component<'shared.link', false>;
  };
}

export interface SectionHero extends Struct.ComponentSchema {
  collectionName: 'components_section_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    Description: Schema.Attribute.RichText;
    Heading: Schema.Attribute.String;
    HeroImage: Schema.Attribute.Media<'images'>;
    HeroLink: Schema.Attribute.Component<'shared.link', true>;
    SubHeading: Schema.Attribute.Text;
  };
}

export interface SectionTrustBadges extends Struct.ComponentSchema {
  collectionName: 'components_section_trust_badges';
  info: {
    displayName: 'TrustBadges';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    Link: Schema.Attribute.Component<'shared.link', false>;
  };
}

export interface SharedFaQs extends Struct.ComponentSchema {
  collectionName: 'components_shared_fa_qs';
  info: {
    displayName: 'FAQs';
  };
  attributes: {
    Answer: Schema.Attribute.Text;
    Question: Schema.Attribute.Text;
  };
}

export interface SharedHinduMonth extends Struct.ComponentSchema {
  collectionName: 'components_shared_hindu_months';
  info: {
    displayName: 'HinduMonth';
  };
  attributes: {
    Month: Schema.Attribute.Enumeration<
      [
        'Chaitra',
        'Vaishakha',
        'Jyeshtha',
        'Ashadha',
        'Shravana',
        'Bhadrapada',
        'Ashwin',
        'Kartika',
        'Margashirsha',
        'Pausha',
        'Magha',
        'Phalguna',
      ]
    >;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    Button_Style: Schema.Attribute.Enumeration<['PRIMARY', 'SECONDARY']>;
    href: Schema.Attribute.String;
    isButton: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
  };
}

export interface SharedLogoLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_logo_links';
  info: {
    displayName: 'LogoLink';
  };
  attributes: {
    href: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
  };
}

export interface SharedMuhuratTimings extends Struct.ComponentSchema {
  collectionName: 'components_shared_muhurat_timings';
  info: {
    displayName: 'MuhuratTimings';
  };
  attributes: {
    EndTime: Schema.Attribute.Time;
    StartTime: Schema.Attribute.Time;
  };
}

export interface SharedRelatedAmavasya extends Struct.ComponentSchema {
  collectionName: 'components_shared_related_amavasyas';
  info: {
    displayName: 'RelatedAmavasya';
  };
  attributes: {
    amavasyas: Schema.Attribute.Relation<'oneToMany', 'api::amavasya.amavasya'>;
  };
}

export interface SharedRelatedEkadashi extends Struct.ComponentSchema {
  collectionName: 'components_shared_related_ekadashis';
  info: {
    displayName: 'RelatedEkadashi';
  };
  attributes: {
    ekadashis: Schema.Attribute.Relation<'oneToMany', 'api::ekadashi.ekadashi'>;
  };
}

export interface SharedRelatedFestivals extends Struct.ComponentSchema {
  collectionName: 'components_shared_related_festivals';
  info: {
    displayName: 'RelatedFestivals';
  };
  attributes: {
    festivals: Schema.Attribute.Relation<'oneToMany', 'api::festival.festival'>;
  };
}

export interface SharedRelatedPradosh extends Struct.ComponentSchema {
  collectionName: 'components_shared_related_pradoshes';
  info: {
    displayName: 'RelatedPradosh';
  };
  attributes: {
    pradoshes: Schema.Attribute.Relation<'oneToMany', 'api::pradosh.pradosh'>;
  };
}

export interface SharedRelatedPujaVidhi extends Struct.ComponentSchema {
  collectionName: 'components_shared_related_puja_vidhis';
  info: {
    displayName: 'RelatedPujaVidhi';
  };
  attributes: {
    puja_vidhis: Schema.Attribute.Relation<
      'oneToMany',
      'api::puja-vidhi.puja-vidhi'
    >;
  };
}

export interface SharedRelatedPurnima extends Struct.ComponentSchema {
  collectionName: 'components_shared_related_purnimas';
  info: {
    displayName: 'RelatedPurnima';
  };
  attributes: {
    purnimas: Schema.Attribute.Relation<'oneToMany', 'api::purnima.purnima'>;
  };
}

export interface SharedRelatedTemples extends Struct.ComponentSchema {
  collectionName: 'components_shared_related_temples';
  info: {
    displayName: 'RelatedTemples';
  };
  attributes: {
    temples: Schema.Attribute.Relation<'oneToMany', 'api::temple.temple'>;
  };
}

export interface SharedRelatedVratKatha extends Struct.ComponentSchema {
  collectionName: 'components_shared_related_vrat_kathas';
  info: {
    displayName: 'RelatedVratKatha';
  };
  attributes: {
    vrat_kathas: Schema.Attribute.Relation<
      'oneToMany',
      'api::vrat-katha.vrat-katha'
    >;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    MetaDescription: Schema.Attribute.Text;
    MetaImage: Schema.Attribute.Media<'images'>;
    MetaRobots: Schema.Attribute.Enumeration<
      ['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow']
    > &
      Schema.Attribute.DefaultTo<'index,follow'>;
    MetaTitle: Schema.Attribute.String;
    Open_Graph_Description: Schema.Attribute.Text;
    Open_Graph_Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layout.banner': LayoutBanner;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'section.featured-puja-vidhi': SectionFeaturedPujaVidhi;
      'section.featured-temples': SectionFeaturedTemples;
      'section.featured-vrat': SectionFeaturedVrat;
      'section.hero': SectionHero;
      'section.trust-badges': SectionTrustBadges;
      'shared.fa-qs': SharedFaQs;
      'shared.hindu-month': SharedHinduMonth;
      'shared.link': SharedLink;
      'shared.logo-link': SharedLogoLink;
      'shared.muhurat-timings': SharedMuhuratTimings;
      'shared.related-amavasya': SharedRelatedAmavasya;
      'shared.related-ekadashi': SharedRelatedEkadashi;
      'shared.related-festivals': SharedRelatedFestivals;
      'shared.related-pradosh': SharedRelatedPradosh;
      'shared.related-puja-vidhi': SharedRelatedPujaVidhi;
      'shared.related-purnima': SharedRelatedPurnima;
      'shared.related-temples': SharedRelatedTemples;
      'shared.related-vrat-katha': SharedRelatedVratKatha;
      'shared.seo': SharedSeo;
    }
  }
}
