---
layout: default
modal-id: 2
date: 2014-07-17
img: LabVIEW-Navy.png
alt: image-alt
project-date: April 2015
client: Department of Navy
category: DAQ Application
description: From 2014-2015, I created a new program that allows a user to balance any 4-plane rotor shaft. The user edits an Excel form template which the program uses to optimize a balance solution given magnitude and phase data from accelerometers. <p> The program uses DAQmx tools to allow user to calibrate each individual sensor using the program. Once magnitude and phase data have been established, the program uses Goodman's solution (1964) to find either the least squares or least absolute solution. A binary search algorithm was employed to identify the best weight split solution given the allowable weights and plane locations. </p>  <p> On the interface side, I used a circular buffer so that the frequency domain plots transition fluidly. </p> <p> You can view my entire file at <a href="https://github.com/simjxu/LabVIEW_machinerybalancing">here</a>. Due to the classified nature, this file is missing a critical SubVI for data acquisition. Contact me if you would like a version of the SubVI that fits your requirements. </p>

---
