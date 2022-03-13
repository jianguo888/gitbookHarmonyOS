## 手把手教你使用HarmonyOS本地模拟器

> 作者：坚果
>
> 公众号："[大前端之旅](https://mp.weixin.qq.com/s/aJvihD4dzEJyOV3q6_Zeng)"
>
> 华为云享专家，InfoQ签约作者，阿里云专家博主，51CTO博客首席体验官，[开源项目GVA成员之一](https://www.gin-vue-admin.com/)，专注于大前端技术的分享，包括Flutter,小程序,安卓，VUE，JavaScript。

先来说一说我为什么要使用本地模拟器吧，主要是因为远程模拟器每次都有时长限制，而且Local Emulator是创建和运行在本地计算机上的，不需要登录授权，在运行和调试应用/服务时，由于没有网络数据的交换，因此可以保持很好的流畅性和稳定性；所以就想 用本地模拟器



注意Local Emulator需要耗费一定的计算机磁盘资源，具体的资源要求为：

- Windows系统：内存推荐为16GB及以上
- macOS系统：内存推荐为8GB及以上
- 不支持在虚拟机系统上运行本地模拟器，例如不支持在Ubuntu系统上，通过安装Windows虚拟机，然后使用Windows系统安装和运行模拟器。



### **1. 检查DevEco Studio的版本：**

DevEco Studio V3.0 Beta1及更高版本才支持本地模拟器，当前推荐使用DevEco Studio V3.0 Beta2版本。如何查看当前版本，可以在Help-About查看

![image-20220313091058853](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220313091058853.png)

### *2*. 使用本地模拟器前，需要安装相应的镜像包，具体操作如下：


（1）打开DevEco Studio，选择“Files > Settings”（macOS系统则选择“DevEco Studio > Preferences”）。

 

（2）如图所示，在“SDK Manager > HarmonyOS Legacy SDK”页签，勾选“Platforms”下的镜像包。不同的的镜像包对应不同的设备类型，System-image-phone镜像包对应手机，System-image-tv镜像包对应智慧屏，System-image-wearable镜像包对应智能手表。

![image-20220312223642412](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220312223642412.png)

（3）点击“Apply”进行安装。

### **3. 安装本地模拟器。**

在菜单栏选择“Tools > Device Manager”，进入图所示界面，点击“Install”即可安装本地模拟器。

 

![手把手教你使用HarmonyOS本地模拟器-OpenHarmony技术社区](https://harmonyos.oss-cn-beijing.aliyuncs.com/images/202202/e82f4f2567f7c93b3f90748c93fcddd3eca28e.png)

 

### **4、创建和使用本地模拟器**


完成了上面的准备工作，接下来就是如何创建和使用本地模拟器。

#### **1.（可选）自定义本地模拟器文件存放路径。**

本地模拟器文件的默认存放路径为：C:\Users\用户名\AppData\Local\Huawei\HarmonyOSEmulator\deployed。如果C盘空间紧张，可以通过新增一个系统的环境变量HarmonyOS_HVD_HOME自定义存放路径，指向空间充裕的目录。

#### **2. 创建本地模拟器。**

（1）打开DevEco Studio，选择“Tools > Device Manager”。如图3所示，在Local Emulator页签中，点击右下角的New Emulator按钮，开始创建本地模拟器。


![手把手教你使用HarmonyOS本地模拟器-OpenHarmony技术社区](https://harmonyos.oss-cn-beijing.aliyuncs.com/images/202202/d27691b460e85196b58889e835974ffeb8d341.png)图5 创建本地模拟器

 

（2）选择一个设备来创建本地模拟器。

 

如图所示，DevEco Studio默认提供Huawei_Phone、Huawei_TV和Huawei_Wearable三个设备，分别对应手机、智慧屏和智能手表。针对华为设备的特征，DevEco Studio对这三个设备预置了尺寸、分辨率等参数。

 

![手把手教你使用HarmonyOS本地模拟器-OpenHarmony技术社区](https://harmonyos.oss-cn-beijing.aliyuncs.com/images/202202/17c79a8636877f1b1730635c819d278f06961b.png)图6 选择一个设备



开发者点击New Hardware或Huawei_Phone后的克隆 图标，可以创建新的手机设备，自定义设备的名称、尺寸、分辨率、内存等参数（如图）。

 

![手把手教你使用HarmonyOS本地模拟器-OpenHarmony技术社区](https://harmonyos.oss-cn-beijing.aliyuncs.com/images/202202/29c162525442fd5b62084180221dfd612c4f48.png) 



 ![image-20220312230415222](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220312230415222.png)

开发者从默认的三个设备或者创建的手机设备中，选择一个设备来创建本地模拟器。


（3）选择好设备后，点击Next，可以看到本地模拟器的镜像信息。


（4）再次点击Next，检查本地模拟器的配置信息，如有需要此时还可以修改配置信息。确认无误后，点击Finish完成本地模拟器的创建。
创建成功后，在Local Emulator页签可以看到新创建的本地模拟器，

 

![手把手教你使用HarmonyOS本地模拟器-OpenHarmony技术社区](https://harmonyos.oss-cn-beijing.aliyuncs.com/images/202202/d83cf871395b8a3626a060a507b7c4721e26c2.png)



#### **3. 运行本地模拟器。**


（1）在Local Emulator页签（如图），点击即可启动本地模拟器。

（2）点击DevEco Studio工具栏中的按钮运行工程，或使用默认快捷键Shift+F10（Mac为Control+R）运行工程。

 

![image-20220312233134785](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220312233134785.png)




（3）DevEco Studio会启动应用的编译构建，完成后应用即可运行在本地模拟器上。以手机设备为例，运行效果如图所示。

 

![手把手教你使用HarmonyOS本地模拟器-OpenHarmony技术社区](https://harmonyos.oss-cn-beijing.aliyuncs.com/images/202202/b46e99a0103878c846c80830458eb6396286ef.png)



 

图示的手机本地模拟器，除了可以像真机一样直接在手机屏幕内操作，右侧的工具栏提供了操作便捷、丰富和数据注入能力，包括：调整音量、电池模拟、GPS模拟、网络模拟、虚拟传感器模拟等。


本地模拟器目前支持手机、智能手表和智慧屏三种设备类型。图11展示了同一套代码同时在智能手表、手机和智慧屏三个设备上的运行效果。

#### **调试报错现象**



如果工程中的releaseType字段与设备（模拟器和真机）中的SDK镜像版本的值不匹配，则运行时会报INSTALL_PARSE_FAILED_USESDK_ERROR错误，如下图所示。

23:09	[ERROR_GET_BUNDLE_INSTALLER_FAILED]
			Cause: Unable to find the BMS service.
			Solution: Try again later. If the issue persists, collect logs and go to Help > Contact Support.
			

23:09	transfer error: secure_mkdirs failed: No such file or directory

23:09	Error during Sync: secure_mkdirs failed: No such file or directory

#### 解决办法

出现此问题是为啥呢，我创建的项目是7，模拟器是6，当然不支持了，其实还有一个原因是目前模拟器不支持ts语言，所以重新用js方式创建，api选6就可以了



![image-20220312234539020](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220312234539020.png)



#### 查看更多

https://developer.harmonyos.com/cn/docs/documentation/doc-guides/faq-debugging-and-running-0000001122066466