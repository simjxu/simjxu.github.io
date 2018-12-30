---
layout: post
title: How to write into a Firebase Realtime Database using REST/Express
date: "2018-12-27"
---

To start off, let's start with something simple, updating a Firebase database with the help of Firebase's Cloud Functions. What makes Cloud Functions easy to use is that it is "serverless", or in other words you do not have to do any work to manage a server instance, making sure that it is running, that it isn't getting overloaded, etc. Instead, you are charged for function calls that are done. Google will manage everything else in their backend. By the way, download Postman if you don't already have it, it helps you test out your requests more easily. My project is located here: https://github.com/simjxu/firebase_firestore Here's what I will accomplish in this tutorial:

1. Create an API endpoint to perform GET and POST requests to a Firebase Firestore database.
2. Pull that database data into an HTML webpage
3. Deploy all of that above and connect to a personal domain.

Setup:
On console.firebase.google.com, you will want to login with your account and create a new project. The project I created is called sjx-restapi. Then, on the left panel of the webpage, you can click Database and Cloud Firestore to create a new Firestore database. Once your firestore database is all set up, then you can create a new folder where you want your REST API firestore app to reside, navigate to it on your terminal and use `firebase init`. (I assumed you already did an `npm install firebase`, check online for how to get the command line tools for firebase). It will ask you what features you would like, and you should include Firestore and Cloud Functions at minimum for this example. Then, connect it to your project. All other options you can just use the default. By doing a `firebase init`, you create a firebase.json file which allows you to test out this webapp and deploy it. 

Coding:
I have 3 main files within my Firebase project folder: functions/index.js, public/index.html, public/app.js. "index.js" is what holds my REST API endpoints to handle incoming requests, through `curl` or Postman. "index.html" is a simple html page that will show the contents of a particular collection and document in my Firestore database. "app.js" is a script that is used to pull the data into the html page in realtime. Let's get started.

For index.js, you can run an express app on Cloud Functions that will allow you to handle GET/POST. You can handle other things as well, feel free to add it in. Express is a framework which allows you to create handlers. In this example, notice references to `db.collection('devices').doc('Device1')`; these refer to the structure in Cloud Firestore, where collections hold documents which hold collections which hold documents, and so on and so forth. I've created a collection called "devices", because this will hold all my IoT device data, and a document Device1 is currently what I am using to test this endpoint out.

```javascript
// Use admin to access the database, functions to run this app
// as a Cloud function, and Express to handle REST requests
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const app = express();

// Initialize the database
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

// ------ API GET/POST request handlers --------------------------------------
app.get('/database', (req, res) => {
  var Device1Ref = db.collection('devices').doc('Device1');
  var getDoc = Device1Ref.get().then(doc => {
    res.send(doc.data());
    return 0;
  }).catch(err => {
    console.log("Error: ", err);
    res.send("Error");
    return 0;
  });
});

app.post('/database', (req, res) => {
  res.send('POST sent');

  // Now add all these to the database
  var Device1Ref = db.collection('devices').doc('Device1');
  req.body.forEach(element => {
    Device1Ref.set(element);

  });
});

// Run App on Cloud Functions
exports.app = functions.https.onRequest(app);
```

I'm not going to spend much time on the index.html file, but you can take a look at the file on Github. It runs a script "app.js", which has my config data for my Firestore database. Again, I look in the "devices" collection and pull the document "Device1". From here, I just create a realtime updating function which pulls the stringified JSON from the Firestore Database when changes are made.

```javascript
// Initialize Firebase
var config = {
  ***config***
};
firebase.initializeApp(config);
var firestore = firebase.firestore();

// Define the collection and document to pull
const docRef = firestore.collection("devices").doc("Device1");

// Identify the HTML tag id to output data to
const outputString = document.querySelector("#deviceData");

// Pull the json from the collection/document in firestore and 
// update automatically
getRealtimeUpdates = function() {
  docRef.onSnapshot(function (doc) {
    if (doc && doc.exists) {
      const myData = doc.data();
      var myStr = JSON.stringify(myData, null, 2);
      outputString.innerText = myStr;
    }
  });
}
getRealtimeUpdates();
```

Once this is all set, you can use `firebase serve` to run a localhost server to test out your GET/POST calls using Postman. The only notes here are that I set my Headers to `Content-Type: application/json`, and my body to be `raw JSON(application/json)`. Here is an example of something I put in a body:
```json
[
	{
		"key1": "testbodyvalA",
		"key2": "testbodyvalB",
		"key3": "testbodyvalC",
		"key4": "testbodyvalD",
		"key5": "testbodyvalE"
	}
]
```



