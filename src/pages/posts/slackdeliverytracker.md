---
layout: post
title: How to use Slack to Post to a Google Sheets Database
date: "2018-09-17"
---

Since I work for an IIoT combined hardware/sofware company, we often receive packages through the mail. This includes anything from dev boards to etched plastic enclosures. Now that we receive packages so often, it is not very easy to keep track of when a package is supposed to be arriving, and we don't always get notifications when items get held up in customs or get lost in the process. Once again APIs are here to save the day.

In the ideal scenario, we could create a Chrome extension with a trained machine learning algorithm that can detect whether a purchase has been made for a delivery, guess the delivery timeframe, store the delivery in a database, and automatically alert the user if today's date is later than the anticipated delivery date. However, even this scenario doesn't account for company purchases made with a purchase order system, which is why procurement teams exist.

Given that I am no genius, an idiot's backup to the system above is to use a slack slash command to automatically update a simple database, like a spreadsheet in Google Sheets for example. Then, using an incoming webhook, send an alert if it is past the delivery date for the package, triggered once every day to a channel, perhaps called #deliveryalerts. If there are no packages that are supposed to be delivered already, no alerts. 

We can first create a simple spreadsheet database like this: 
![vendor-spreadsheet](https://raw.githubusercontent.com/simjxu/simjxu.github.io/master/img/vendor_spreadsheet.jpg)
This would show the item that is being delivered, the estimated delivery date, and a boolean Yes/No as to whether the item has been received.

Then, we can create the #deliveryalerts channel in Slack, and integrate a Slack incoming webhook that points to #deliveryalerts and a slash command. In this case, we create one called /delivery. /delivery will send a post request to some endpoint that you need to define (a url). In our case, we can just use Google Apps script to set up this endpoint. Anything written after the /delivery command will be sent to the endpoint, and we can create the script to parse this text message using regular expressions (regex). Google Apps Script will handle the request through a `doPost()` function that you must write. Just take the spreadsheet that you want to set as your deliveries database, and on the Tools menu select script editor. Copy the `doPost()` example below into the Code.gs file.

```javascript
// Handle the Post request, based upon the command that is written after the slash command
function doPost(e){
  var commandReceived = e.parameter["text"];

  if (commandReceived.match(/help/)) showHelp();			// showHelp() is run when slack user types: /delivery help
  if (commandReceived.match(/list/)) listDeliveries();
  if (commandReceived.match(/add/)) add(e);
  if (commandReceived.match(/remove/)) remove(e);			// remove(e) is run after slack user types: /delivery remove someItem
  if (commandReceived.match(/received/)) received(e);
  
  // Need to create a return, otherwise slack will complain that there was no response created
  var returnMessage = "send complete";
  return ContentService.createTextOutput(JSON.stringify({text:returnMessage})).setMimeType(ContentService.MimeType.JSON);
}
```

Slack complains if there is no return message, so I've also included just a simple "send complete" at the end of the `doPost()` function. Now, all you need to do is create the functions to handle each of the if statements in `doPost()`. An example of this function can be seen here, for marking a delivery as received. Notice that regular expressions are used to determine the format for the string that is attached to the slash command.

~~~ javascript
function received(e){
  var receiver = e.parameter["user_name"];
  var messageReceived = e.parameter["text"].trim();
  var regex = /received ([a-zA-Z0-9-_\s]+)/;
  var matches = regex.exec(messageReceived);
  var deliveryName = matches[1];
  var sheet = getStatusSheet();
  var affectedRow = getDeliveryRow(deliveryName);
  
  if (affectedRow) {
    sheet.getRange("D" + (affectedRow)).setValue('Y');
    getLogger().log("%s received delivery %s", receiver, deliveryName);
    listDeliveries();
  } else {
    sendMessage("*" + deliveryName + "* delivery not found");
  }
}
~~~

Then there's the timed triggers. To do this, I used a trigger function, which runs another function I made, querySpreadsheet, once every day. I also created a button on a html page to turn on/off this trigger.
~~~ javascript
function createTrigger() {
  ScriptApp.newTrigger('querySpreadsheet')
  .timeBased()
  .everyDays(1)
  .create()
}
~~~

Another note, I used BetterLog to create another spreadsheet tab that keeps track of the different actions users take with the app. This helps us know who received what package in case we need to track one down. You'll have to add the BetterLog library to your project.

To set everything up on the Slack end, login to <a href="https://api.slack.com/apps">api.slack.com/apps</a>, create a new app, and Add features and functionality, adding Incoming Webhooks, Interactive Components, and Slash Commands. You will need to copy the incoming webhooks link into the Google Apps Script. 

The full script is located in this github repository: <a href="https://github.com/simjxu/google_apps_scripts/tree/master/Slack-Delivery-Tracking">Slack Delivery Tracking</a>  Be sure to change out the spreadsheet id to match the spreadsheet id of your Google sheets document (the long string in your Google Sheet URL), and change the incoming webhook link to the webhook link that you receive when you enable that feature on your slack apps. You might want to test by changing the `createTrigger()` function to be `.everyMinutes(1)` instead of `.everyDays(1)`.

To Do: to reduce time that it takes to read through the excel sheet, it's best to add within the trigger function something that places the received packages into some sort of archive spreadsheet tab. But alas, I already took too long to create this post. I can't take this long if I want to see rows of green squares on my github.

Useful references: https://medium.com/@hopsor/building-a-slack-serverless-bot-with-google-apps-script-and-spreadsheets-35bdac755a44
