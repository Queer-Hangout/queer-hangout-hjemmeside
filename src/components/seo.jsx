import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function Seo({ title, description, slug, children }) {
  const data = useStaticQuery(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `)
  return (
    <>
      <title>{`${title} | ${data.site.siteMetadata.title}`}</title>
      <meta name="description" content={description} />
      <meta
        name="twitter:title"
        content={`${title} | ${data.site.siteMetadata.title}`}
      />
      <meta
        name="twitter:url"
        content={`${data.site.siteMetadata.siteUrl}${slug}`}
      />
      <meta name="twitter:description" content={description} />
      {children}
    </>
  )
}
