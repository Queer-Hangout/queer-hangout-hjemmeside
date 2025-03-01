import { Language } from "./language";

export type PageMdxFrontmatter = {
  [lang in Language]?: string;
} & {
  title: string;
  description: string;
  menu?: number;
  disableRobots?: boolean;
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
