---
layout: post
title: Getting started iwth the B-L475E-IOT01A STM32 Discovery kit (IoT Node)
date: "2021-01-30"
---

Reader's note: These instructions are specifically for Mac OSX (I was running Catalina). I'm currently trying to port over everything onto my linux computer, but I am running into compile issues there.

Since I've decided it was time to actually learn how to write embedded code, I decided the best thing to do was to start with this free STM32 Discovery kit, which I got for free after attending a conference. It's neat because this board is packed to the brim with sensors, and also includes a WiFi and BLE chip. I only which it had a cell module too, but nothing's perfect.

It's easy to get started with this board because STM32 provides the STM32CubeMX application, which generates code for you automatically. The first thing I wanted to do was to get the USB port working so that I could write serial logs. This was pretty easy to do by following this setup here: https://www.youtube.com/watch?v=AYICE0gU-Sg. Of course, there were some minor differences because the board from that video was different from this one. You can see exactly what by opening the .ioc file in my repo https://github.com/simjxu/stm32_discovery (as of commit hash 1798e96db2c7153ad87412712790d49240252aee). 

From there, code was generated. I opted to use the VS Code plugin called "PlatformIO" to help build and read from terminal. The code generated from CubeMX actually had some compile errors when I tried to follow the tutorial. Turns out, it didn't like that a couple of the functions had a mismatched type in the last argument. It was expecting uint16_t, but you can see a uint32_t.

```cpp
USBD_StatusTypeDef USBD_LL_Transmit(USBD_HandleTypeDef *pdev, uint8_t ep_addr,
                                    uint8_t *pbuf, uint32_t size);

USBD_StatusTypeDef USBD_LL_PrepareReceive(USBD_HandleTypeDef *pdev, uint8_t ep_addr,
                                          uint8_t *pbuf, uint32_t size);
```

I edited to say uint16_t, and compilations ended up happening successfully, but for some reason this switched back to uint32_t, but with no issues compiling after that point... So I'm not sure what's happening here. Nevertheless, I was able to start printing my helloworld over serial. Note that both USB connectors need to be connected in order to read off of that port (see picture).

Results:
![board_2xusb](https://raw.githubusercontent.com/simjxu/simjxu.github.io/gh-pages/img/BL475E_usb.jpg)

As a side note, you are also able to compile in C++ code, no problemo. I tried adding in a class, and was able to get it working and printing out (see classtest.h and classtest.cpp).

```cpp
class FatherProperty {
private:
    static uint8_t propValue[];        // I need to declare this as static, why?
    // static means that there is only one copy of propValue, no matter how many times the class is instantiated

public:
    void getProperty();
};

uint8_t FatherProperty::propValue[]="asdf\n";
void FatherProperty::getProperty() 
{
    int len = sizeof(this->propValue);
    CDC_Transmit_FS(this->propValue,len-1);         // subtract 1 so that it does not include the extra character
}
```
