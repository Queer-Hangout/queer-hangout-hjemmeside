import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

export default function PageTemplate({ children }) {
  return (
    <Layout>
      <div className="prose">{children}</div>
    </Layout>
  )
}

export const Head = ({ pageContext }) => (
  <Seo
    title={pageContext.frontmatter.title}
    description={pageContext.frontmatter.description}
    slug={pageContext.frontmatter.slug}
  />
)
