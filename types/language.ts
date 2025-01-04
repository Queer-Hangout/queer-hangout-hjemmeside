export type Language = "no" | "en";
export type Translated<T> = {
  [key in Language]: T;
};
