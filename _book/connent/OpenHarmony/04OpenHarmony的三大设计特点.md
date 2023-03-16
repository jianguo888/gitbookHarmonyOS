

https://gitee.com/openharmony/docs/tree/master/zh-cn/application-dev/reference/arkui-ts

常用组件

请参考[基于TS扩展的声明式开发范式

## OpenHarmony的三大设计特点

> 作者：坚果
>
> 公众号："[大前端之旅](https://mp.weixin.qq.com/s/aJvihD4dzEJyOV3q6_Zeng)"
>
> 华为云享专家，InfoQ签约作者，阿里云专家博主，51CTO博客首席体验官，[开源项目GVA成员之一](https://www.gin-vue-admin.com/)，专注于大前端技术的分享，包括Flutter,小程序,安卓，VUE，JavaScript。

- 可裁剪
- 易开发
- 跨终端

![OpenHarmony的三大设计特点](https://luckly007.oss-cn-beijing.aliyuncs.com/images/OpenHarmony%E7%9A%84%E4%B8%89%E5%A4%A7%E8%AE%BE%E8%AE%A1%E7%89%B9%E7%82%B9.png)

## 1.可裁剪

### 那么什么是操作系统的可裁剪性呢？

所谓操作系统的可裁剪性，就是一个规模大且功能齐全的操作系统，在结构上保证了用户可在其中有选择地保留某些模块，而删减掉一些模块的性能。 目标系统设计者的这个做法，也常常叫做对操作系统进行配置。 因此，操作系统的可裁剪性也常被叫做操作系统的可配置性。OpenHarmony由于其硬件设备较多，可裁剪在一定程度上就成了必然要求。也就是可以按需只加载应用需要的框架模块。

### 可裁剪性的体现

#### 在框架层面

OpenHarmony可按照具体应用要求只加载应用所需的框架模块

#### 在系统服务方面

OpenHarmony会按照具体应用或设备的依赖，加载所租系统服务。

#### 在驱动程序层面

OpenHarmony的驱动程序框架采用配置文件的形式，实现驱动程序的动态加载

#### 在内核方面

主要通过Makefile的配置以及部分配置型头文件中的编译宏定义实现。

## 2.易开发

- 一次开发，多端部署
- 面向多终端的IDE(南向  IDE，北向IDE)
- 控件标签化，布局自适配



## 3.跨终端

OpenHarmony将设备通过综合信息感知平台（iAware），虚拟为本地设备，各平台通过此平台注册自己硬件能力，其分布式软总线就是这样，打破硬件的界限，实现硬件互助，取长补短。

## 总结

这三大特性是OpenHarmony有别于 其他操作系统最为典型的地方，OpenHarmony从内核到系统服务到框架，到IDE的整体设计都是围绕这三大特征展开的。

### 参考文档

《深入浅出OpenHarmony⸺架构、内核、驱动及应用开发全栈》-第二章

