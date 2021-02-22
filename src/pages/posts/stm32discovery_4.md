---
layout: post
title: B-L475E-IOT01A - Triggering external interrupt using Button
date: "2021-02-21"
---

What I thought would be a relatively easy thing to accomplish ended up being slightly trickier than I expected. I spent this weekend trying to trigger the print out on the virtual COM port via an eternal interrupt by the blue user button. On this board it is connected to pin PC13. The "C" represents the GPIO group, and frequently, functions will require indication of the GPIO_PIN as well as the group, in this case "GPIOC".

In this latest commit: 82a0425cd5a82bbebd32750e4ce07c01f5c65044, I copied some pin initializations, NVIC (which determines interrupt priority). and entered in an external interrupt callback function. This callback function triggers whenever any pin EXTI pin triggers it. Eventually, I will need to update this below function to check specifically for the user button. 

```cpp
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
  /* Prevent unused argument(s) compilation warning */
  UNUSED(GPIO_Pin);
  if(sensorprint_flag==0){
    // try using a queue
    sensorprint_flag = 1;
    HAL_GPIO_TogglePin(GPIOB,LED2_Pin);
  }
}
```

This interrupt callback is implemented in such a way as to not stay too long in the interrupt callback. A flag is toggled so that the main loop can then take care of whatever actions are necessary, in this case printing out the sensor readings. It is important not to execute functions like usb print in an external interrupt, because this can lead to stack overflow. A final step to close this branch out is to add a queue so that if multiple interrupts are called, the neccesary actions will still complete.

```
while (1)
{
  // Put all this into a queue
  if(sensorprint_flag){
    // Print out all the sensor readings
    sensors.printTemp(2);
    sensors.printHumid(2);
    sensors.printPressure(2);
    sensors.printAccel();
    sensors.printGyro();
    sensors.printMagneto();
    usb_print(carriage_return,sizeof(carriage_return)-1);
    sensorprint_flag=0;
  }
}
```