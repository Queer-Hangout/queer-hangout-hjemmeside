import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import DesktopMenu from "./desktop-menu"
import MobileMenu from "./mobile-menu"

export default function Menu() {
  const data = useStaticQuery(graphql`
    query MenuQuery {
      pages: allMdx(
        filter: { frontmatter: { menu: { gte: 0 } } }
        sort: { frontmatter: { menu: ASC } }
      ) {
        edges {
          node {
            frontmatter {
              title
              slug
              menu
            }
          }
        }
      }
    }
  `)
  const pages = data.pages.edges.map(({ node }) => node.frontmatter)
  return (
    <div className="flex text-lg">
      <DesktopMenu pages={pages}></DesktopMenu>
      <MobileMenu pages={pages} />
    </div>
  )
}
