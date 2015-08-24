---
layout: post-narrow
uid: LabVIEWpicture
title:  "LabVIEW Balancing"
worktype: "Programming"
date:   2015-07-01 09:35:01
categories: project
---

<p>
From 2014-2015, I created a new program that allows a user to balance any 4-plane rotor shaft. The user edits an Excel form template which the program uses to optimize a balance solution given magnitude and phase data from accelerometers. 
</p>
<p>
The program uses DAQmx tools to allow user to calibrate each individual sensor using the program. Once magnitude and phase data have been established, the program uses Goodman's solution (1964) to find either the least squares or least absolute solution. A binary search algorithm was employed to identify the best weight split solution given the allowable weights and plane locations. 
</p>
<p>
On the interface side, I used a circular buffer so that the frequency domain plots transition fluidly.
</p>

<p class="meta">Date: <strong>{{ page.date | date: "%b %Y" }}</strong></p>

<div class="showcase">
	

</div>