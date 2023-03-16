上一节我们了解了关于开源和OpenHarmony做了简单的了解，今天主要了解OpenHarmony的技术架构

> 作者：坚果
>
> 公众号："[大前端之旅](https://mp.weixin.qq.com/s/aJvihD4dzEJyOV3q6_Zeng)"
>
> 华为云享专家，InfoQ签约作者，阿里云专家博主，51CTO博客首席体验官，[开源项目GVA成员之一](https://www.gin-vue-admin.com/)，专注于大前端技术的分享，包括Flutter,小程序,安卓，VUE，JavaScript。



OpenHarmony整体遵从分层设计，从下向上依次为：内核层、系统服务层、框架层和应用层。系统功能按照“系统 > 子系统 > 组件”逐级展开，在多设备部署场景下，支持根据实际需求裁剪某些非必要的组件。OpenHarmony技术架构如下所示：

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/1.png)



上面是OpenHarmony的技术架构下面是Flutter 架构层

## Flutter 架构层

Flutter 被设计为一个可扩展的分层系统。它可以被看作是各个独立的组件的系列合集，上层组件各自依赖下层组件。组件无法越权访问更底层的内容，并且框架层中的各个部分都是可选且可替代的。

![Architectural diagram](https://luckly007.oss-cn-beijing.aliyuncs.com/image/archdiagram.png)

对于底层操作系统而言，Flutter 应用程序的包装方式与其他原生应用相同。在每一个平台上，会包含一个特定的嵌入层，从而提供一个程序入口，程序由此可以与底层操作系统进行协调。

**Flutter 引擎** 毫无疑问是 Flutter 的核心，它主要使用 C++ 编写，并提供了 Flutter 应用所需的原语。当需要绘制新一帧的内容时，引擎将负责对需要合成的场景进行栅格化。它提供了 Flutter 核心 API 的底层实现，包括图形（通过 [Skia](https://skia.org/)）、文本布局、文件及网络 IO、辅助功能支持、插件架构和 Dart 运行环境及编译环境的工具链。

**Flutter 框架层** 提供了以 Dart 语言编写的现代响应式框架。它包括由一系列层组成的一组丰富的平台，布局和基础库

最后是Android系统架构

## Android系统架构

Android系统架构分为四层架构，从高到低分别是应用层，应用框架层，系统运行层和Linux内核层。 Android会同一系列核心应用程序包一起发布，该应用程序包包括email客户端，SMS短消息程序，日历，地图，浏览器，联系人管理程序等。 它们一般都是使用Java进行编写。

![image-20220222221100106](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220222221100106.png)

## 总结

由于我平常接触的是Flutter，现在参加的是OpenHarmony的活动，所以我就将Android ，Flutter，OpenHarmony各平台的架构做了汇总。



## 参考链接

- [OpenHarmon技术架构](https://gitee.com/openharmony#section2502124574318)

- [Flutter 架构概览](https://flutter.cn/docs/resources/architectural-overview)
- [Android平台架构](https://developer.android.com/guide/platform?hl=zh-cn)

