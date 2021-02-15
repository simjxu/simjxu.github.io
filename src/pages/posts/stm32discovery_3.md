---
layout: post
title: B-L475E-IOT01A - Adding in sensor readings
date: "2021-02-14"
---

I spent a long time trying to get the BLE functionality to work, but no success on that branch so far. So in order to avoid letting my ego roll into a pit of despair, I decided to take a break and do something much easier: add in all the sensor readings. 

Before I could do that, I needed to create a function that lets me print floats over usb, by converting a `float` to a `char*`. Looking around online, the answer seemed to be using `snprintf`. However, I tried using this function to do just that but did not succeed. I then tried compiling this with clang, and I was able to get it working. Hmm! Turns out, not all compilers will support float with `snprintf`, as was the case here. So instead, I had to create a function from scratch myself. Probably not the nicest looking function, but here it is. Check out the repo for more details, should be there as of commit e9492087f8389e4e541dcfb5e9cae6c7b8aa36b1.

```cpp
#include "sx_util.h"

void usbprint_float(float value, int precision)
{
    int integer_pt = value;
    volatile float fraction = (value-integer_pt)*pow(10,precision);
    int fraction_pt = fraction;

    // count number of digits
    volatile int count_int = 0;
    volatile int count_fract = 0;
    int n = integer_pt;
    while (n != 0) {
        n /= 10;  
        ++count_int;
    }
    n = fraction_pt;
    while (n != 0) {
        n /= 10;  
        ++count_fract;
    }

    // Convert integer and fraction parts to char buffers
    char int_buf[16];                        // NOTE: MAX integer length of 16
    char fract_buf[16];                      // NOTE: MAX decimal length of 16

    snprintf(int_buf,10,"%d",integer_pt);
    snprintf(fract_buf,10,"%d",fraction_pt);

    // Add on the decimal point
    strcat(int_buf,".");
    // Add the newline
    strcat(fract_buf,"\n");

    char outStr[16];
    // Put the characters into the array
    for(int i=0;i<count_int+1;i++){
        outStr[i] = int_buf[i];
    }
    for(int i=0;i<=count_fract+1;i++){
        outStr[count_int+1+i] = fract_buf[i];
    }

    usb_print((uint8_t*)outStr,count_int+count_fract+2);
    
}
```

Finally, all I had to do was create a Sensors class that initialized all the sensors on the constructor.
```
Temperature Reading: 25.1
Humidity Reading: 57.27
Pressure Reading: 1013.70
Accel X: 5.0, Y: 413.0, Z: 916.0
Gyro X: 210.0, Y: -14000, Z: 350.0
Magneto X: 672.0, Y: -4200, Z: -4290
```

Sensor readings all seem to come out fine, though I'm not totally sure what the units on the gyro, magneto are. I'll take a look another time. Time to get back to banging my head on the BLE first, QSPI next.