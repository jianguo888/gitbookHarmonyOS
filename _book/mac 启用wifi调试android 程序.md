使用前准备
必须在同一个wifi网络环境下面

查看手机的ip地址

第一次连接的时候需要使用usb先连上

首先开启5555端口

```
adb tcpip 5555

成功后显示：
restarting in TCP mode port: 5555
```



```
adb connect 192.168.1.23:5555     注意192.168.1.23是手机的ip地址


成功后显示：
connected to 192.168.1.5:5555
```

再用命令：

```
adb devices     就能看到连上的手机了

```

另外，要退出wifi模式，返回到USB模式，就在终端输入

```
adb usb
成功后显示：
restarting in USB mode
就说明结束了wifi模式，返回到usb模式。此时在eclipse的devices里设备也就消失了。
```


