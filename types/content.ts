import { Language } from "./language";

export type PageMdxFrontmatter = {
  title: string;
  description: string;
  menu?: number;
};

export type PageMdx = {
  default: any;
  frontmatter: PageMdxFrontmatter;
};

export type MenuItem = {
  language: Language;
  slug: string;
  title: string;
  description: string;
  index: number;
};
