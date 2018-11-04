import React from 'react'
import { Link } from 'gatsby'

// ListLink is used in the Header component. Only use gatsby Link
// for internal links!!! Use <a> for external links
const ListLink = props => (
  <li style={{ display: 'inline-block', marginRight: '1rem' }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: '#2f3143',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      {/* This is where you place the links in the upper Right */}
      <header style={{ marginBottom: `0rem` }}>
        <ul style={{ listStyle: `none`, float: `right` }}>
          <ListLink to="/about/">About</ListLink>
          <ListLink to="/projects/">Projects</ListLink>
          <a href="http://app.simonxu.com">WebApp</a>
        </ul>
      </header>
      
      {/* This refers to the white title link which goes Home */}
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

export default Header
