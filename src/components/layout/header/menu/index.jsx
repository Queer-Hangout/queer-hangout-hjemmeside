import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import DesktopMenu from "./desktop-menu"
import MobileMenu from "./mobile-menu"

export default function Menu() {
  const data = useStaticQuery(graphql`
    query MenuQuery {
      pages: allMdx {
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
  const pages = data.pages.edges
    .map(({ node }) => node.frontmatter)
    .sort((a, b) => (a.menu > b.menu && b.menu !== -1 ? 1 : -1))
    .filter(item => item.menu !== -1)
  return (
    <div className="flex text-lg">
      <DesktopMenu pages={pages}></DesktopMenu>
      <MobileMenu pages={pages} />
    </div>
  )
}
