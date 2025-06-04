# Talque Marketing Website

Fifth iteration of the Talque marketing website, using Strapi as
headless CMS and NextJS server-side rendering.


## Strapi

This is the headless CMS holding data only. In this repo are the
schema definitions, but not the actual data, the content is stored in
the online instance.

* Schema definitons: https://github.com/talque/marketing-website-g5/tree/main/strapi
* Strapi cloud (billing & settings): https://cloud.strapi.io/projects/marketing-website-g4-65cbd3d773
* Strapi instance (edit content): https://loved-symphony-cf7407a623.strapiapp.com/


## NextJS

This loads content from the strapi instance and generates the HTML
that you can see on the webpage.


## Vercel

Currently hosting the website

* Settings & deployment backend: https://vercel.com/talque/talque
* Hosted website: https://talque-git-main-talque.vercel.app
