import { languages } from "@/config/languages";
import {
  getLastModifiedTimestamp,
  getSlugs,
  loadPageMdx,
} from "@/helpers/content-helper";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return Promise.all(
    languages.flatMap((language) =>
      getSlugs(language).map(async (slug) => {
        const { frontmatter } = await loadPageMdx(language, slug);
        const lastModified = await getLastModifiedTimestamp(language, slug);
        return {
          url: `https://queerhangout.no/${language}${
            slug === "index" ? "" : `/${slug}`
          }`,
          lastModified: lastModified || undefined,
          priority: slug === "index" ? 1 : frontmatter.menu ? 0.8 : 0.1,
        };
      })
    )
  );
}
