---
layout: post
title: B-L475E-IOT01A - Including Busy Wait on USB transmit
date: "2021-02-03"
---

Since I'm starting off right now coding on bare metal (I'm not running an RTOS), I've got only the main() thread running and no other task manager to speak of. This means I have limited options when addressing the flow of tasks in my code. For example, what I've observed is that if I make two calls to `CDC_Transmit_FS` consecutively, the second one doesn't run:

```cpp
void ExampleClass::printChar()
{
    int len = strlen(this->charValue);          // charValue = "charstr"
    uint8_t charout[] = "printChar Output: ";
    CDC_Transmit_FS(charout, 18);
    CDC_Transmit_FS((uint8_t*)this->charValue,len);        
}
```

Results with a printout of the following
```
--- Miniterm on /dev/cu.usbmodem205A319838471  9600,8,N,1 ---
--- Quit: Ctrl+C | Menu: Ctrl+T | Help: Ctrl+T followed by Ctrl+H ---
Hello World!
printChar Output: Hello World!
printChar Output: Hello World!
printChar Output: Hello World!
printChar Output: Hello World!
```

I expected to see "charstr\n" after printChar output (so charstr with a carriage return). Why does this happen? Because the call to `CDC_Transmit_FS` gets called while the USB peripheral is still busy. Therefore, the way to fix this is to include CDC_Transmit_FS with another function that will do a busy wait.

```cpp
void usb_print(uint8_t* Buf, uint16_t Len){
    while (CDC_Transmit_FS(Buf,Len)) {}     // Busy wait to ensure that the transmit completes
}

void ExampleClass::printChar()
{
    int len = strlen(this->charValue);
    uint8_t charout[] = "printChar Output: ";     

    usb_print(charout,18);
    usb_print((uint8_t*)this->charValue,len);
}
```

And here is the result!
```
--- Miniterm on /dev/cu.usbmodem205A319838471  9600,8,N,1 ---
--- Quit: Ctrl+C | Menu: Ctrl+T | Help: Ctrl+T followed by Ctrl+H ---
Hello World!
printChar Output: charstr
Hello World!
printChar Output: charstr
Hello World!
printChar Output: charstr
```