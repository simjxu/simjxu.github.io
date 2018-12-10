---
layout: post
title: New Project Plan
date: "2018-12-18"
---

I spent a couple weekends looking into Kubernetes, and it looks to be start of a new project. So this post will outline the plans and requirements for the different modularized microservices that I will make as part of my project, in app.simonxu.com.

*Microservice 1: Database Display*
The first one will be the most basic, it will update to show the contents of a firebase datastore including key-value pairs that are in my firebase database. This will update automatically 

*Microservice 2: REST API*
This will be some basic GET, POST, PUT, DELETE actions from REST based communication. I should be able to use the API I create to make requests vias Postman.

*Microservice 3: GraphQL API*
This one will be a little fancier, using GraphQL to pick up specific items in my database. Creating an API that uses GraphQL will help me understand it better.

To make actions using the API, I will also need to set up a token-based authentication system using OAuth2, and in order to test it out, I will make a time based trigger which will update a "date" key with the current date in UTC once day. Probably in the beginning I will avoid having to do refreshes on the token, but once I understand it more I will add some code that can automatically do the token refresh.

All of this will be orchestrated using Kubernetes.

If there is time:
- machine learning stuff