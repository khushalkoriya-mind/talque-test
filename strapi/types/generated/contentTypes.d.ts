import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogBlog extends Schema.SingleType {
  collectionName: 'blogs';
  info: {
    singularName: 'blog';
    pluralName: 'blogs';
    displayName: 'Blog';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    blog_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'talque Blogs'>;
    blog_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'Welcome to our blog! Here you will find many useful articles on the topics of digital, hybrid and analogue events. Discover new functions, best practices based on case studies and immerse yourself in the behind the scenes of our office.'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::blog.blog',
      'oneToMany',
      'api::blog.blog'
    >;
    locale: Attribute.String;
  };
}

export interface ApiBlogDetailBlogDetail extends Schema.CollectionType {
  collectionName: 'blog_details';
  info: {
    singularName: 'blog-detail';
    pluralName: 'blog-details';
    displayName: 'Blogs';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    blog_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'MedtecLIVE & SUMMIT 2021'>;
    blog_tag: Attribute.Relation<
      'api::blog-detail.blog-detail',
      'oneToOne',
      'api::blog-tag.blog-tag'
    >;
    blog_date: Attribute.DateTime &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    blog_image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    blog_text: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'The MedtecLIVE & SUMMIT event is a trade fair for medical technology in conjunction with the renowned MedtecSUMMIT Congress & Partnering, which networks all players in the medical technology industry. Developed from the Medtec Europe and MT-CONNECT events, MedtecLIVE entered the market as THE European trade fair with over 400 exhibitors on the subject of medical technology at the very first event in 2019. The MedtecLIVE event concept aims to network all players in the medical technology industry, from traditional suppliers to manufacturers. In 2020 and 2021, MedtecLIVE took place together with the MedtecSUMMIT Congress in a purely virtual format.'>;
    blog_images: Attribute.Component<'blog.blog-detail', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-detail.blog-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-detail.blog-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::blog-detail.blog-detail',
      'oneToMany',
      'api::blog-detail.blog-detail'
    >;
    locale: Attribute.String;
  };
}

export interface ApiBlogTagBlogTag extends Schema.CollectionType {
  collectionName: 'blog_tags';
  info: {
    singularName: 'blog-tag';
    pluralName: 'blog-tags';
    displayName: 'Blog Tags';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-tag.blog-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-tag.blog-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::blog-tag.blog-tag',
      'oneToMany',
      'api::blog-tag.blog-tag'
    >;
    locale: Attribute.String;
  };
}

export interface ApiCareerCareer extends Schema.SingleType {
  collectionName: 'careers';
  info: {
    singularName: 'career';
    pluralName: 'careers';
    displayName: 'Career';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    career_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'revolutionize with us the event industry from morning'>;
    career_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'We are looking for talents like you! Support us in the areas of IT, sales, project/event management, marketing and many more! Find the right position for you and send us your application! Exciting tasks and a great team await you in vibrant Berlin.'>;
    teaser_image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    positions_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'Open positions'>;
    positions_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.'>;
    three_boxes: Attribute.Component<'career.career-three-boxes', true> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMax<
        {
          min: 3;
          max: 3;
        },
        number
      >;
    life_at_talque_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    life_at_talque_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    life_at_talque_images: Attribute.Component<
      'career.life-at-talque-images',
      true
    > &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMax<
        {
          min: 10;
        },
        number
      >;
    life_at_talque_secondrow_images: Attribute.Component<
      'career.life-at-talque-images',
      true
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMax<
        {
          min: 10;
        },
        number
      >;
    Seo: Attribute.Component<'shared.seo'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    get_to_know_team_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    get_to_know_team_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    team_data: Attribute.Component<'career.team', true> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::career.career',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::career.career',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::career.career',
      'oneToMany',
      'api::career.career'
    >;
    locale: Attribute.String;
  };
}

export interface ApiClientTestimonialClientTestimonial
  extends Schema.CollectionType {
  collectionName: 'client_testimonials';
  info: {
    singularName: 'client-testimonial';
    pluralName: 'client-testimonials';
    displayName: 'Client Testimonial';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    top_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    profile_picture: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    location: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    company_logo: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::client-testimonial.client-testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::client-testimonial.client-testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::client-testimonial.client-testimonial',
      'oneToMany',
      'api::client-testimonial.client-testimonial'
    >;
    locale: Attribute.String;
  };
}

export interface ApiDepartmentDepartment extends Schema.CollectionType {
  collectionName: 'departments';
  info: {
    singularName: 'department';
    pluralName: 'departments';
    displayName: 'Department';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::department.department',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::department.department',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::department.department',
      'oneToMany',
      'api::department.department'
    >;
    locale: Attribute.String;
  };
}

export interface ApiFooterFooter extends Schema.SingleType {
  collectionName: 'footers';
  info: {
    singularName: 'footer';
    pluralName: 'footers';
    displayName: 'Footer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    copy_right: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    footer_links: Attribute.Component<'global.child-links', true> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    left_side_image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    socialmedia_links: Attribute.Component<'global.footer', true> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::footer.footer',
      'oneToMany',
      'api::footer.footer'
    >;
    locale: Attribute.String;
  };
}

export interface ApiGetLatestUpdateGetLatestUpdate
  extends Schema.CollectionType {
  collectionName: 'get_latest_updates';
  info: {
    singularName: 'get-latest-update';
    pluralName: 'get-latest-updates';
    displayName: 'Get latest update mails';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::get-latest-update.get-latest-update',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::get-latest-update.get-latest-update',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::get-latest-update.get-latest-update',
      'oneToMany',
      'api::get-latest-update.get-latest-update'
    >;
    locale: Attribute.String;
  };
}

export interface ApiHelpBoxHelpBox extends Schema.CollectionType {
  collectionName: 'help_boxes';
  info: {
    singularName: 'help-box';
    pluralName: 'help-boxes';
    displayName: 'Help Box';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    text: Attribute.Blocks &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    button: Attribute.Component<'help-box.help-box', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    orgAdminHelpBox: Attribute.Enumeration<
      [
        'OrgAdminHelpBox.TEST',
        'OrgAdminHelpBox.LECTURE_FORM_BASIC_INFO',
        'OrgAdminHelpBox.LECTURE_FORM_AUTH',
        'OrgAdminHelpBox.LECTURE_FORM_CLASSIFICATION',
        'OrgAdminHelpBox.LECTURE_FORM_CONTRIBUTORS',
        'OrgAdminHelpBox.LECTURE_FORM_CUSTOM_DATA',
        'OrgAdminHelpBox.LECTURE_FORM_INFORMATION',
        'OrgAdminHelpBox.LECTURE_FORM_INTERACTION',
        'OrgAdminHelpBox.LECTURE_FORM_LANGUAGES',
        'OrgAdminHelpBox.LECTURE_FORM_PARTS',
        'OrgAdminHelpBox.LECTURE_FORM_PLUGIN',
        'OrgAdminHelpBox.LECTURE_FORM_VIDEO_CALL',
        'OrgAdminHelpBox.LECTURE_FORMAT_FORM_BASIC',
        'OrgAdminHelpBox.LECTURE_FORMAT_FORM_DEFAULTS',
        'OrgAdminHelpBox.QUICK_FILTER_BUTTONS_EDITOR_VIEW',
        'OrgAdminHelpBox.QUICK_FILTER_BUTTONS_EDITOR_DIALOG',
        'OrgAdminHelpBox.PERSON_FORM_BASIC_INFO',
        'OrgAdminHelpBox.PERSON_FORM_BIO',
        'OrgAdminHelpBox.PERSON_FORM_COMPANY',
        'OrgAdminHelpBox.PERSON_FORM_INTERNAL',
        'OrgAdminHelpBox.PERSON_FORM_LECTURES',
        'OrgAdminHelpBox.PERSON_FORM_SOCIAL',
        'OrgAdminHelpBox.PRODUCT_FORM_BASIC_INFO',
        'OrgAdminHelpBox.PRODUCT_FORM_CLASSIFICATION ',
        'OrgAdminHelpBox.PRODUCT_FORM_GALLERY',
        'OrgAdminHelpBox.ORG_FORM_BASIC_DETAILS',
        'OrgAdminHelpBox.ORG_FORM_CLASSIFICATION',
        'OrgAdminHelpBox.ORG_FORM_EXTERNAL',
        'OrgAdminHelpBox.ORG_FORM_GALLERY',
        'OrgAdminHelpBox.ORG_FORM_INFORMATION',
        'OrgAdminHelpBox.ORG_FORM_INTERNAL',
        'OrgAdminHelpBox.ORG_FORM_LOCATION',
        'OrgAdminHelpBox.ORG_FORM_PERMISSIONS',
        'OrgAdminHelpBox.ORG_FORM_TIME',
        'OrgAdminHelpBox.FORM_PRODUCT_MARKS',
        'OrgAdminHelpBox.FORM_VENDOR_MARKS',
        'OrgAdminHelpBox.FORM_VENDOR_CRAFTS',
        'OrgAdminHelpBox.GENERAL_EVENT_NETWORK_NAME',
        'OrgAdminHelpBox.GENERAL_EVENT_DESCRIPTION',
        'OrgAdminHelpBox.SPEAKER_RATING_TOGGLE',
        'OrgAdminHelpBox.SPEAKER_RATING_PUBLIC_TOGGLE',
        'OrgAdminHelpBox.VENDOR_SPEAKER_ENABLED_TOGGLE',
        'OrgAdminHelpBox.SESSION_SURVEY_ENABLED_TOGGLE',
        'OrgAdminHelpBox.SESSION_CHAT_ENABLED_TOGGLE',
        'OrgAdminHelpBox.SESSION_PARTS_ENABLED_TOGGLE',
        'OrgAdminHelpBox.SESSION_FILES_ENABLED_TOGGLE',
        'OrgAdminHelpBox.VENDOR_FORM_ENABLED_TOGGLE',
        'OrgAdminHelpBox.GENERAL_EVENT_HIGHLIGHT_TALKS',
        'OrgAdminHelpBox.GENERAL_EVENT_LECTURE_HANDOUT_VISIBILITY',
        'OrgAdminHelpBox.GENERAL_EVENT_TALK_LANGUAGES',
        'OrgAdminHelpBox.GENERAL_EVENT_ACCESS_CODE',
        'OrgAdminHelpBox.GENERAL_EVENT_PERMISSIONS',
        'OrgAdminHelpBox.ACTIVE_USER_DASHBOARD',
        'OrgAdminHelpBox.ORG_VENDOR_LABEL',
        'OrgAdminHelpBox.ORG_STAFF_LABEL',
        'OrgAdminHelpBox.TAG_EDITOR',
        'OrgAdminHelpBox.TOPIC_EDITOR',
        'OrgAdminHelpBox.SUBJECT_EDITOR',
        'OrgAdminHelpBox.BADGE_EDITOR',
        'OrgAdminHelpBox.TICKET_EDITOR',
        'OrgAdminHelpBox.PAGE_MENU_EDITOR',
        'OrgAdminHelpBox.GENERAL_EVENT_TIME_AND_DATE',
        'OrgAdminHelpBox.LECTURE_FORMAT_EDITOR',
        'OrgAdminHelpBox.ORG_ROOM_EDITOR',
        'OrgAdminHelpBox.ON_PREMISE_NETWORKING_TIMES',
        'OrgAdminHelpBox.VIDEO_CALL_NETWORKING_TIMES',
        'OrgAdminHelpBox.NON_REGISTERED_TALQUE_ACCESS',
        'OrgAdminHelpBox.ON_SITE_PARTNER_MEETINGS',
        'OrgAdminHelpBox.VIRTUAL_PARTNER_MEETINGS',
        'OrgAdminHelpBox.TICKET_CATEGORY_EDITOR',
        'OrgAdminHelpBox.AGENCY_EMAIL_TEMPLATE_GRID_EDITOR'
      ]
    > &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    videoUrl: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::help-box.help-box',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::help-box.help-box',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::help-box.help-box',
      'oneToMany',
      'api::help-box.help-box'
    >;
    locale: Attribute.String;
  };
}

export interface ApiNavigationNavigation extends Schema.SingleType {
  collectionName: 'navigations';
  info: {
    singularName: 'navigation';
    pluralName: 'navigations';
    displayName: 'Header';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    leftside_image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    header_links: Attribute.DynamicZone<
      ['global.child-links', 'global.dropdown']
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    rightside_button: Attribute.Component<'common.button', true> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::navigation.navigation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::navigation.navigation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::navigation.navigation',
      'oneToMany',
      'api::navigation.navigation'
    >;
    locale: Attribute.String;
  };
}

export interface ApiNavigationDropdownLinkNavigationDropdownLink
  extends Schema.CollectionType {
  collectionName: 'navigation_dropdown_links';
  info: {
    singularName: 'navigation-dropdown-link';
    pluralName: 'navigation-dropdown-links';
    displayName: 'Header Dropdown Links';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    label: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    ChildLinks: Attribute.Component<'global.child-links', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::navigation-dropdown-link.navigation-dropdown-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::navigation-dropdown-link.navigation-dropdown-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::navigation-dropdown-link.navigation-dropdown-link',
      'oneToMany',
      'api::navigation-dropdown-link.navigation-dropdown-link'
    >;
    locale: Attribute.String;
  };
}

export interface ApiOpenPositionOpenPosition extends Schema.CollectionType {
  collectionName: 'open_positions';
  info: {
    singularName: 'open-position';
    pluralName: 'open-positions';
    displayName: 'Open Positions';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    field: Attribute.Enumeration<['IT', 'Marketing', 'Sales', 'QA']> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'IT'>;
    job_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    job_description: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    location: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    view_details_btn: Attribute.Component<'common.button'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    teaser_image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    second_description: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    about_our_company: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    about_the_role: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    your_profile: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    our_offer: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    box_header: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    box_subheader: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    box_email: Attribute.Email &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::open-position.open-position',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::open-position.open-position',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::open-position.open-position',
      'oneToMany',
      'api::open-position.open-position'
    >;
    locale: Attribute.String;
  };
}

export interface ApiTradeshowTradeshow extends Schema.SingleType {
  collectionName: 'tradeshows';
  info: {
    singularName: 'tradeshow';
    pluralName: 'tradeshows';
    displayName: 'Tradeshow';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    tradeshow_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    tradeshow_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    teaser_image_or_video: Attribute.Media<'images' | 'videos'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    teaser_type: Attribute.Enumeration<['Audio', 'Video']> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'Audio'>;
    buttons: Attribute.Component<'common.button', true> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    why_talque_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    why_talque_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    why_talque_second_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    why_talque_second_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    why_talque_hotspot_data: Attribute.Component<
      'tradeshow.why-talque-hotspot-data',
      true
    > &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    organiser_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    organiser_description: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    organiser_journey_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    organiser_jouney: Attribute.Component<'tradeshow.organiser-journey', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    visitor_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    visitor_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    visitor_blue_text: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    exhibitor_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    exhibitor_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    exhibitor_revenue_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    exhibitor_revenue_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    exhibitor_revenue: Attribute.Component<
      'tradeshow.exhibitor-revenue',
      true
    > &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    customervoice_bluetext: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    customervoice_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    blog_title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    blog_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    want_more_experience: Attribute.Component<'experience.want-more-experience'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    contact_us: Attribute.Component<'contact-us.contact-us'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    tradeshow_organisers: Attribute.Relation<
      'api::tradeshow.tradeshow',
      'oneToMany',
      'api::tradeshow-organiser.tradeshow-organiser'
    >;
    tradeshow_exhibitors: Attribute.Relation<
      'api::tradeshow.tradeshow',
      'oneToMany',
      'api::tradeshow-exhibitor.tradeshow-exhibitor'
    >;
    tradeshow_visitors: Attribute.Relation<
      'api::tradeshow.tradeshow',
      'oneToMany',
      'api::tradeshow-visitor.tradeshow-visitor'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tradeshow.tradeshow',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tradeshow.tradeshow',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::tradeshow.tradeshow',
      'oneToMany',
      'api::tradeshow.tradeshow'
    >;
    locale: Attribute.String;
  };
}

export interface ApiTradeshowExhibitorTradeshowExhibitor
  extends Schema.CollectionType {
  collectionName: 'tradeshow_exhibitors';
  info: {
    singularName: 'tradeshow-exhibitor';
    pluralName: 'tradeshow-exhibitors';
    displayName: 'Tradeshow Exhibitor';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    button: Attribute.Component<'common.button'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tradeshow-exhibitor.tradeshow-exhibitor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tradeshow-exhibitor.tradeshow-exhibitor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::tradeshow-exhibitor.tradeshow-exhibitor',
      'oneToMany',
      'api::tradeshow-exhibitor.tradeshow-exhibitor'
    >;
    locale: Attribute.String;
  };
}

export interface ApiTradeshowOrganiserTradeshowOrganiser
  extends Schema.CollectionType {
  collectionName: 'tradeshow_organisers';
  info: {
    singularName: 'tradeshow-organiser';
    pluralName: 'tradeshow-organisers';
    displayName: 'Tradeshow Organiser';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    button: Attribute.Component<'common.button'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tradeshow-organiser.tradeshow-organiser',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tradeshow-organiser.tradeshow-organiser',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::tradeshow-organiser.tradeshow-organiser',
      'oneToMany',
      'api::tradeshow-organiser.tradeshow-organiser'
    >;
    locale: Attribute.String;
  };
}

export interface ApiTradeshowSolutionListTradeshowSolutionList
  extends Schema.CollectionType {
  collectionName: 'tradeshow_solution_lists';
  info: {
    singularName: 'tradeshow-solution-list';
    pluralName: 'tradeshow-solution-lists';
    displayName: 'Tradeshow Solution List';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    label: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tradeshow-solution-list.tradeshow-solution-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tradeshow-solution-list.tradeshow-solution-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::tradeshow-solution-list.tradeshow-solution-list',
      'oneToMany',
      'api::tradeshow-solution-list.tradeshow-solution-list'
    >;
    locale: Attribute.String;
  };
}

export interface ApiTradeshowVisitorTradeshowVisitor
  extends Schema.CollectionType {
  collectionName: 'tradeshow_visitors';
  info: {
    singularName: 'tradeshow-visitor';
    pluralName: 'tradeshow-visitors';
    displayName: 'Tradeshow Visitor';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    alt_text: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    button: Attribute.Component<'common.button'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    description: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tradeshow-visitor.tradeshow-visitor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tradeshow-visitor.tradeshow-visitor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::tradeshow-visitor.tradeshow-visitor',
      'oneToMany',
      'api::tradeshow-visitor.tradeshow-visitor'
    >;
    locale: Attribute.String;
  };
}

export interface ApiTrustPartnerLogoTrustPartnerLogo
  extends Schema.CollectionType {
  collectionName: 'trust_partner_logos';
  info: {
    singularName: 'trust-partner-logo';
    pluralName: 'trust-partner-logos';
    displayName: 'Trust Partner Logo';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    alt_text: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    url: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    target: Attribute.Enumeration<['_blank', '_parent', '_self']> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'_blank'>;
    is_optional: Attribute.Boolean &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::trust-partner-logo.trust-partner-logo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::trust-partner-logo.trust-partner-logo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::trust-partner-logo.trust-partner-logo',
      'oneToMany',
      'api::trust-partner-logo.trust-partner-logo'
    >;
    locale: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::blog.blog': ApiBlogBlog;
      'api::blog-detail.blog-detail': ApiBlogDetailBlogDetail;
      'api::blog-tag.blog-tag': ApiBlogTagBlogTag;
      'api::career.career': ApiCareerCareer;
      'api::client-testimonial.client-testimonial': ApiClientTestimonialClientTestimonial;
      'api::department.department': ApiDepartmentDepartment;
      'api::footer.footer': ApiFooterFooter;
      'api::get-latest-update.get-latest-update': ApiGetLatestUpdateGetLatestUpdate;
      'api::help-box.help-box': ApiHelpBoxHelpBox;
      'api::navigation.navigation': ApiNavigationNavigation;
      'api::navigation-dropdown-link.navigation-dropdown-link': ApiNavigationDropdownLinkNavigationDropdownLink;
      'api::open-position.open-position': ApiOpenPositionOpenPosition;
      'api::tradeshow.tradeshow': ApiTradeshowTradeshow;
      'api::tradeshow-exhibitor.tradeshow-exhibitor': ApiTradeshowExhibitorTradeshowExhibitor;
      'api::tradeshow-organiser.tradeshow-organiser': ApiTradeshowOrganiserTradeshowOrganiser;
      'api::tradeshow-solution-list.tradeshow-solution-list': ApiTradeshowSolutionListTradeshowSolutionList;
      'api::tradeshow-visitor.tradeshow-visitor': ApiTradeshowVisitorTradeshowVisitor;
      'api::trust-partner-logo.trust-partner-logo': ApiTrustPartnerLogoTrustPartnerLogo;
    }
  }
}
