---
layout: post
title: How GraphQL is used in Gatsby
date: 2018-09-30
---

I'm currently in the process of converting this blog into a Gatsby blog, and I've spent a full day trying to get it working. Thankfully, they do seem to have good documentation on their website <a href="https://www.gatsbyjs.org/tutorial/">Gatsby Tutorial</a>. The going is quite slow, and the results are also quite ugly, but after trying to figure out GraphQL and aggravating myself over backticks, at least I have something.
![gatsby-1](https://raw.githubusercontent.com/simjxu/simjxu.github.io/master/img/gatsby1.jpg)

I'll also push the gatsby version of this site onto github here: https://github.com/simjxu/gatsby-themush. You're probably wondering, what's the point of pushing something so useless onto github?  Well, my plan is to continue iterating on this Gatsby blog, and I also intend to litter the darn thing with comments. Hopefully this will help others understand the nuances of building a site. I don't have many comments yet, but stay tuned and I expect there to be more commentary than there is code.

The tutorial does a good job at helping you understand how GraphQL allows different page components to query particular items. One of the first uses of GraphQL is to swap out any mention of the website title with a `{data.site.siteMetadata.title}`. This does a page query to another file that must be titled gatsby-config.js to determine the website's metadata, like its title. This means that anytime a title is referenced, it queries the metadata. If the website title were to change at any point, then they can all be changed because of the query.

Another place where queries are used are for the blog posts. You can set GraphQL to automatically filter out any markdown file within your "pages" folder on Gatsby and list them on the homepage of the website. This is any file that ends in .md. To create that query that can point to the blogposts, you need to create a path to the location, and for some reason they call this a "slug". The page can then be created by using two Gatsby APIs, `onCreateNode` and `createPages`. 

To be continued, SOON.