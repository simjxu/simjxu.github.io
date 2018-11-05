---
layout: post
title: How to run a Python Script on Google Compute Engine
date: "2018-09-19"
---

Probably the most familiar experience of a hardware startup is the lack of monetary resources (free lunches? no way!). And yet, we still want to be cutting edge with our machine learning techniques. Sometimes, doing a custom feature extraction from our datasets can take a lot of computing resources, taking up to 8 hours on a laptop running Linux (notice how I did not say a Macbook Pro). Thankfully, Big Brother Google wants to trickle down some benefits for the needy, and provides us with a Free Tier for a lot of there cloud platform modules. So, I decided to try this out.

First, I just wrote a simple Python program (testscript.py) that takes more than just a second to run, by doing the forbidden: nested for loops, the Avada Kedavra of programming.

~~~ python
numruns = 300
print("running")
huge_array = [[[0.0 for i in range(numruns)] for j in range(numruns)] for k in range(numruns)]
counter = 0
print("starting loops")
for i in range(numruns):
    for j in range(numruns):
        for k in range(numruns):
            huge_array[i][j][k] = i+j+k
            counter+=1
            if counter%10000 == 0:
                print(counter)
print("finished")
~~~

The first thing to do is to create a project on GCP (Google Cloud Platform) by going to console.cloud.google.com and clicking on "Select a Project". Once you have named your project, notice you can take advantage of $300 of free credits to play with (how generous!). Once you have made your project, you can click on "Compute Engine" on the left hand panel, and create an instance. As of the time this post was written, you can get a free f1-micro instance running on a virtual machine in the US. This f1-micro has 0.6GB of memory and 1vCPU.
![gce-f1micro](https://raw.githubusercontent.com/simjxu/simjxu.github.io/master/img/gce-dashboard.jpg)

After this instance is created, you can view your instance and also SSH into the instance. If you do this, then you can interact with this instance via a Debian Linux shell. To upload a file, you can click on the gearbox on the top right side to upload your python file. In my case, I am uploading a python 3 script called testscript.py, which I shared above. 
![gce-f1microShell](https://raw.githubusercontent.com/simjxu/simjxu.github.io/master/img/f1micro-SSHshell.jpg)

After it is uploaded, you can run the file on the instance by first making it an executable with `chmod +x testscript.py`. `chmod` basically changes the mode and using the `+x` option makes it an executable. Then you can run `nohup` on the python script to get it running in the shell without requiring the shell to be open. Unfortunately, with the python script I shared, it gets killed after a few seconds:
![gce-f1microKilled](https://raw.githubusercontent.com/simjxu/simjxu.github.io/master/img/f1micro-killed.jpg)

Turns out free also means you can't just leave something running forever. If you check the nohup.out file using `cat nohup.out`, you can see that my script ended somewhere after iteration 523000. Probably exceeded the RAM available here. Probably the better thing to do is to take advantage of another free item, the 5GB of cloud storage. I'll try that next time.

Useful references: https://cloud.google.com/free/docs/always-free-usage-limits
