---
layout: post
title: How to use GraphQL to choose what shows up on your page
date: "2018-10-14"
---

Yes, I made the switch to an uglier but more basic home webpage. If you want to make the switch too you can follow the last post I made. The nice thing about Gatsby is that it is easy to understand, and the 

The way I currently have my site set up, I have 3 main pages: first the homepage, which is on `index.js`, an `about.js` page, and a `contact.js` page. I may switch this later to have about and contact on the same page, and have a projects page instead.

On the `index.js` page, there is a GraphQL query, which filters what gets displayed on my index page. First, I look for all markdown files (files in my directory that are .md), and filter and sort it according layout and date, respectively. You can see that when I do `filter: { frontmatter: {layout: {eq: "post"}}}`, it uses a Sift syntax, which is used in MongoDB, to filter for all markdown files that have a layout entry in the frontmatter that is labeled "post". This is because I also have markdown files for my about, and contact pages, but I want to ensure only the ones that have "post" in the front matter get displayed. 

One of the most useful things that comes with Gatsby when you do `gatsby develop` is that you get an in browser IDE called GraphiQL (prounounced "graphical", cute). This allows you to make all the graphQL filters you want, and see what it outputs. Super convenient, super easy. I love using Ctrl+Space in order to see what options I have available.

In order to publish this on Github pages