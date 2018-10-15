import React from "react"
import { Link, graphql } from 'gatsby'

// This is only used for linking in between different sites in the directory
import Layout from '../components/layout'

const ContactPage = ({ data }) => {
	return (
		<Layout>
			<div style={{ color: `teal` }}>
				{data.allMarkdownRemark.edges.map(({ node }) => (
					<h1>{node.frontmatter.title}</h1>
				))}

				{/* HTML SECTION */}
				{data.allMarkdownRemark.edges.map(({ node }) => (
					<div dangerouslySetInnerHTML={{ __html: node.html}} />
				))}

				<Link to="/">Home</Link>			
			</div>
		</Layout>
	)
}


// This is the GraphQL filter that determines what is available to site
export const query = graphql`
  query {
		allMarkdownRemark(
      filter: { frontmatter: {layout: {eq: "contactpg"}}}) {
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
          html
        }
      }
    }
  }
`

export default ContactPage