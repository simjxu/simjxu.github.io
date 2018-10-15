import React from 'react'
import { Link, graphql } from "gatsby"
import { css } from "react-emotion"
import { rhythm } from "../utils/typography"
import Layout from '../components/layout'
// import { node } from 'prop-types';

const IndexPage = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>
        <h3
          className={css`
            display: inline-block;
            color: #719010;
            // border-bottom: 1px solid;
          `}
        >
          A soft nutritiously technical blog 
        </h3>



        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              className={css`
                text.decoration:none:
                color: inherit;
              `}
            >
              <h3
                className={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {node.frontmatter.title}{" "}
                <span
                  className={css`
                    color: #bbb;
                  `}
                >
                  - {node.frontmatter.date}
                </span>
              </h3>
            </Link>
            <p>{node.excerpt}</p>
            {/* <p>{node.internal.content}</p> */}
          </div>
        ))}

          
          
        
      </div>
    </Layout>
  )
}

// This is the GraphQL filter that determines what shows up
export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC}
      filter: { frontmatter: {layout: {eq: "post"}}}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
          internal {
            content
          }
        }
      }
    }
  }
`

export default IndexPage
