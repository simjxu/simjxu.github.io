---
layout: post
title: B-L475E-IOT01A - Getting started on BlueNRG BLE
date: "2021-03-07"
---

I had quite a few struggles getting BLE to work, until I finally decided to test out an Arduino (shudder) example of the BLE implemention on the B-L475E. Hopefully, insights gleaed from this will point me in the right direction for the manual implementation of the BLE library. The working example is located here: https://github.com/stm32duino/STM32Examples/blob/master/examples/Boards/STM32L475VG-DISCOVERY-IOT/BTLE_sensors_TimeOfFlight_demo/BTLE_sensors_TimeOfFlight_demo.ino

There are a few dependencies to get this working. In `main.cpp`, there is a set of comments on the top pointing you to the driver libraries, and of course, you need the SPBTLE-RF library, which depends upon Arduino.h.

![SPBTLE-lib](https://raw.githubusercontent.com/simjxu/simjxu.github.io/gh-pages/img/SPBTLE-RF_lib.jpg)

Inside this example, the top level function that publishes the data to BLE is the function called  `update_environment_data`

```cpp
void update_environment_data(){
  float humidity, temperature;
  float pressure, temperature_lps22hb;

  HumTemp->GetHumidity(&humidity);
  HumTemp->GetTemperature(&temperature);

  PressTemp->GetPressure(&pressure);
  PressTemp->GetTemperature(&temperature_lps22hb);

  //Update environnemental data
  SensorService.Temp_Update(temperature*10);
  SensorService.Press_Update(pressure*100);
  SensorService.Humidity_Update(humidity*10);
}
```

Once I load the firmware onto the device, I am able to use the LightBlue mobile app from PunchThrough to observe these three characteristics. You can see below that the humidity is 59.3% (593/10) and the temperature is 23.4 deg C (234/10).

![temp-humid-ble](https://raw.githubusercontent.com/simjxu/simjxu.github.io/gh-pages/img/lightblue_att.jpg)

