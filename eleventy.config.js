import sites from "./sites.js";

export const config = {
    dir: {
        includes: 'includes',
        // data: 'data',
    },

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
};

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
    // eleventyConfig.addCollection("sites", collectionsApi => {
    //     return sites.filter(site => site.enabled);
    // });

    // eleventyConfig.addCollection("urls", collectionsApi => {
    //     console.log(collectionsApi.getAll())
    //     return collectionsApi.getFilteredByTag("sites").map(site => site.url);
    // })

    eleventyConfig.addGlobalData("sites", sites)

    eleventyConfig.addGlobalData("enabledSites", sites.filter(site => site.enabled))

    // eleventyConfig.addFilter("removeDisabled", sites => {
    //     return sites.filter(site => site.enabled);
    // });

    eleventyConfig.addFilter("getSitesUrls", sites => {
        return sites.map(site => site.url)
    });
}


