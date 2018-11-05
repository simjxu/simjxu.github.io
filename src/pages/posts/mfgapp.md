---
layout: post
title: Flask and Django - Python options
date: "2018-09-10"
---

The company I work for makes internet connected hardware for collecting machine data. So yes, this involves actually building a physical product that has to be constructed from solder, glue, and rhino tears. Because of this, we have to also build a software application that is able to test functionality of the device: a manufacturing webapp that runs on the cloud, collects functional test data, and stores serial numbers/calibration values on a Postgres database. Since this web application is not customer facing, it gets all the care, love, and attention of a donation request letter in your snail mail. 

At the time this was built, the developers had experience developing in Python, and they chose to develop the frontend in Angular using Flask. Why they chose Flask over Django eludes me, but upon doing some research it seems like Flask has more of a minimalist/bare bones, add-functionality-as-you-need-it type of approach, while Django comes with the bells and whistles included. 

Here's everything I know about building this web application at the moment. There exists an index.html file in the app directory, and within that index.html file there are script src files which point to other angular source files which have too many lines of code for me to understand at the moment.

~~~ html
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
~~~

Since I have no real understanding of the architecture of the existing Angular/Flask web application right now, I'll go ahead and start from scratch, building the web application with React/NodeJS instead.

1st step in getting familiar with React is to change this jekyll blog into a Gatsby blog: 
<a href="https://www.gatsbyjs.org/docs/deploy-gatsby/#github-pages">https://www.gatsbyjs.org/docs/deploy-gatsby/#github-pages</a>
This static website generator uses React, Webpack, and GraphQL, all the popular kids at the pool right now. For those of you who are new to engineering: the most critical skill as an engineer is to be able to read other people's documentation.