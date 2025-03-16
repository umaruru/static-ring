import sites from "./sites.js";

export const config = {
    dir: {
        output: "../site/webring_test",
    },
    
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
};

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
    eleventyConfig.addGlobalData("sites", sites)

    eleventyConfig.addFilter("getSitesUrls", sites => {
        return sites.map(site => site.url)
    });
}


