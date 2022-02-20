OpenHarmony和HarmonyOS有什么区别？



> 作者：坚果
>
> 公众号："[大前端之旅](https://mp.weixin.qq.com/s/aJvihD4dzEJyOV3q6_Zeng)"
>
> 华为云享专家，InfoQ签约作者，阿里云专家博主，51CTO博客首席体验官，[开源项目GVA成员之一](https://www.gin-vue-admin.com/)，专注于大前端技术的分享，包括Flutter,小程序,安卓，VUE，JavaScript。









## OpenHarmony和HarmonyOS有什么区别？

### OpenHarmony

OpenHarmony是由开放原子开源基金会（OpenAtom Foundation）孵化及运营的开源项目，目标是面向全场景、全连接、全智能时代，基于开源的方式，搭建一个智能终端设备操作系统的框架和平台，促进万物互联产业的繁荣发展

- 从Open就可以看出，他是一个开源项目，是由华为雇了一帮人，然后由这些人commit代码，最后华为把 HarmonyOS 中基础功能提取出来，打包成功一个项目叫做“Openharmony” ，把 Openharmony 捐献给了原子开源基金会。
- OpenHarmony是由开放原子开源基金会孵化及运营的，未来华为也将持续为OpenHarmony开源项目贡献代码

- OpenHarmony相当于Android的AOSP（Android Open Source Project）

- 所以使用者只要遵循开源协议和法律就可以





### HarmonyOS 

HarmonyOS作为新一代的智能终端操作系统，为不同设备的智能化、互联与协同提供了统一的语言，带来简洁、流畅、连续、安全可靠的全场景交互体验

- HarmonyOS 2是华为基于开源项目OpenHarmony 2.0开发的面向多种全场景智能设备的商用版本

- 为保护华为现有手机和平板用户的数字资产，在遵循AOSP的开源许可的基础上HarmonyOS 2实现了现有Android生态应用在部分搭载该系统设备上的运行



## 开发角度上讲解它们的区别：

### 1.语言支持

HarmonyOS 主要支持 Java 和 JS 来开发应用（当然还有 C++ 和 C++），而 OpenHarmony 不支持 Java 来开发应用。



### 2.SDK 的不同

应用开发工具都是统一使用华为的 DevEco Studio，但是使用的 sdk 不同，开发前首先要切换 sdk 配置。

虽然 HarmonyOS 和 OpenHarmony 都可以用 js 来开发应用，但是它们的 api 还是有些细微的区别。

OpenHarmony 的 api 参考请参看 OpenHarmony 的官方文档，千万别看错了。

然后 OpenHarmony 的 sdk 请下载官方的支持 OpenHarmony 开发的 sdk，而不是 DevEco studio 自带的 HarmonyOS sdk。

关于 OpenHarmony sdk 配置请参考官方文档，我这里仅仅附上官方链接：

https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/quick-start/

![image-20220219125402541](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220219125402541.png)

### 3.运行调测方式不同

HarmonyOS 支持 previewer 预览、模拟器运行、真机运行三种方式；OpenHarmony 支持 previewer 预览、真机（目前主要使用 3516 系列开发板）运行。

首先，目前 OpenHarmony 是没有模拟器的，真正运行调测只能借助开发板（主要采用 HI3516 系列开发板），注意目前是不支持手机平板等真机调测的。

### 4.签名方式不同

OpenHarmony 的签名方式我这里就不赘述，直接附上官方文档链接：

https://gitee.com/openharmony/docs/tree/master/zh-cn/application-dev/quick-start

HarmonyOS 的签名我最想吐槽的就是需要添加设备 ID。

[使用真机进行调试-调试HarmonyOS应用/服务-应用/服务调试-HUAWEI DevEco Studio使用指南-工具-HarmonyOS应用开发](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ide_debug_device-0000001053822404#section793484619307)

OpenHarmony 的签名我只想吐槽一句，既然 open 为何还必须要签名。



## 参考文档：

https://developer.huawei.com/consumer/cn/doc/distribution/service/overview-0000001193306834

https://gitee.com/openharmony