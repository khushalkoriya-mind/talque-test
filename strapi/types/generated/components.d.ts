import type { Schema, Attribute } from '@strapi/strapi';

export interface BlogBlogDetail extends Schema.Component {
  collectionName: 'components_blog_details_blog_details';
  info: {
    displayName: 'Blog Data';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images'> & Attribute.Required;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    content: Attribute.RichText;
  };
}

export interface CareerCareerThreeBoxes extends Schema.Component {
  collectionName: 'components_carrer_career_three_boxes';
  info: {
    displayName: 'Career Three Boxes';
    description: '';
  };
  attributes: {
    box_title: Attribute.String & Attribute.Required;
    box_description: Attribute.Text & Attribute.Required;
    box_icon: Attribute.Media<'images'> & Attribute.Required;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
  };
}

export interface CareerLifeAtTalqueImages extends Schema.Component {
  collectionName: 'components_carrer_life_at_talque_images';
  info: {
    displayName: 'Life At Talque Images';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images'> & Attribute.Required;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
  };
}

export interface CareerTeam extends Schema.Component {
  collectionName: 'components_life_at_talque_teams';
  info: {
    displayName: 'Team';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    position: Attribute.Text & Attribute.Required;
    profile_picture: Attribute.Media<'images'> & Attribute.Required;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    full_profile_picture: Attribute.Media<'images'> & Attribute.Required;
  };
}

export interface CommonButton extends Schema.Component {
  collectionName: 'components_common_buttons';
  info: {
    displayName: 'Button';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    url: Attribute.String;
    image_optional: Attribute.Media<'images'>;
    target: Attribute.Enumeration<['_blank', '_parent', '_self']> &
      Attribute.Required &
      Attribute.DefaultTo<'_blank'>;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    type: Attribute.Enumeration<['Transparent', 'Colored']> &
      Attribute.Required &
      Attribute.DefaultTo<'Transparent'>;
  };
}

export interface ContactUsContactUsMode extends Schema.Component {
  collectionName: 'components_contact_us_contact_us_modes';
  info: {
    displayName: 'Contact Us Mode';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images'> & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    small_text: Attribute.RichText;
  };
}

export interface ContactUsContactUs extends Schema.Component {
  collectionName: 'components_contact_us_contact_uses';
  info: {
    displayName: 'Contact Us';
    description: '';
  };
  attributes: {
    button: Attribute.Component<'common.button', true>;
    contactus_modes: Attribute.Component<'contact-us.contact-us-mode', true>;
  };
}

export interface ExperienceWantMoreExperience extends Schema.Component {
  collectionName: 'components_experience_want_more_experiences';
  info: {
    displayName: 'Want More Experience';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    button: Attribute.Component<'common.button'>;
  };
}

export interface GlobalChildLinks extends Schema.Component {
  collectionName: 'components_common_child_links';
  info: {
    displayName: 'Child Links';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    target: Attribute.Enumeration<['_blank', '_parent', '_self']> &
      Attribute.Required &
      Attribute.DefaultTo<'_parent'>;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface GlobalDropdown extends Schema.Component {
  collectionName: 'components_menu_dropdowns';
  info: {
    displayName: 'Header Dropdown';
    icon: 'arrowDown';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    header_links: Attribute.Relation<
      'global.dropdown',
      'oneToMany',
      'api::navigation-dropdown-link.navigation-dropdown-link'
    >;
    media_image: Attribute.Media<'images'> & Attribute.Required;
    media_description: Attribute.Text & Attribute.Required;
  };
}

export interface GlobalFooter extends Schema.Component {
  collectionName: 'components_common_footers';
  info: {
    displayName: 'Footer';
    description: '';
  };
  attributes: {
    socialmedia_image: Attribute.Media<'images'> & Attribute.Required;
    url: Attribute.String;
    target: Attribute.Enumeration<['_blank', '_parent', '_self']> &
      Attribute.Required &
      Attribute.DefaultTo<'_blank'>;
    label: Attribute.String;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface GlobalLinks extends Schema.Component {
  collectionName: 'components_common_links';
  info: {
    displayName: 'Header';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    is_have_child_links: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    target: Attribute.Enumeration<['_blank', '_parent', '_self']> &
      Attribute.Required;
    child_links: Attribute.Component<'global.child-links', true>;
    child_link_image: Attribute.Media<'images'> & Attribute.Required;
    child_link_description: Attribute.Text & Attribute.Required;
  };
}

export interface HelpBoxHelpBox extends Schema.Component {
  collectionName: 'components_help_box_help_boxes';
  info: {
    displayName: 'Help Link Button';
    icon: 'oneToMany';
    description: '';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    label: Attribute.String & Attribute.Required;
    icon: Attribute.Enumeration<
      [
        'OrgAdminHelpButton.NONE',
        'OrgAdminHelpButton.LINK',
        'OrgAdminHelpButton.DOWNLOAD',
        'OrgAdminHelpButton.UPLOAD'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'OrgAdminHelpButton.NONE'>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    meta_title: Attribute.String & Attribute.Required;
    meta_description: Attribute.Text & Attribute.Required;
    keywords: Attribute.String & Attribute.Required;
    prevent_indexing: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    media: Attribute.Media<'images'> & Attribute.Required;
    media_alt_text: Attribute.String & Attribute.Required;
  };
}

export interface TradeshowExhibitorRevenue extends Schema.Component {
  collectionName: 'components_tradeshow_exhibitor_revenues';
  info: {
    displayName: 'Exhibitor Revenue';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    image: Attribute.Media<'images'> & Attribute.Required;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface TradeshowOrganiserJourney extends Schema.Component {
  collectionName: 'components_tradeshow_organiser_journeys';
  info: {
    displayName: 'Organiser Journey';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    image: Attribute.Media<'images'>;
    description: Attribute.RichText;
  };
}

export interface TradeshowWhyTalqueHotspotData extends Schema.Component {
  collectionName: 'components_tradeshow_why_talque_hotspot_data';
  info: {
    displayName: 'Why Talque Hotspot Data';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    image: Attribute.Media<'images'> & Attribute.Required;
    alt_text: Attribute.String;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    description: Attribute.RichText;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blog.blog-detail': BlogBlogDetail;
      'career.career-three-boxes': CareerCareerThreeBoxes;
      'career.life-at-talque-images': CareerLifeAtTalqueImages;
      'career.team': CareerTeam;
      'common.button': CommonButton;
      'contact-us.contact-us-mode': ContactUsContactUsMode;
      'contact-us.contact-us': ContactUsContactUs;
      'experience.want-more-experience': ExperienceWantMoreExperience;
      'global.child-links': GlobalChildLinks;
      'global.dropdown': GlobalDropdown;
      'global.footer': GlobalFooter;
      'global.links': GlobalLinks;
      'help-box.help-box': HelpBoxHelpBox;
      'shared.seo': SharedSeo;
      'tradeshow.exhibitor-revenue': TradeshowExhibitorRevenue;
      'tradeshow.organiser-journey': TradeshowOrganiserJourney;
      'tradeshow.why-talque-hotspot-data': TradeshowWhyTalqueHotspotData;
    }
  }
}
