# 鸿蒙HarmonyOS应用开发之为你解说eTS文件说明

[春节不停更，此文正在参加「星光计划-春节更帖活动](https://harmonyos.51cto.com/posts/9923)

> 作者：坚果
>
> 公众号："[大前端之旅](https://mp.weixin.qq.com/s/aJvihD4dzEJyOV3q6_Zeng)"
>
> 华为云享专家，InfoQ签约作者，阿里云专家博主，51CTO博客首席体验官，[开源项目GVA成员之一](https://www.gin-vue-admin.com/)，专注于大前端技术的分享，包括Flutter,小程序,安卓，VUE，JavaScript。



## eTS工程目录结构



FA应用的eTS工程目录结构如下图所示。

![image-20220123120840117](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220123120840117.png)

- **ets > default > pages > index.ets文件**：.ets结尾的ETS（Extended TypeScript）文件，这个文件用于描述UI布局、样式、事件交互和页面逻辑。
- **ets > default > app.ets**：用于全局应用/服务逻辑和应用/服务生命周期管理。
- **Java目录**：作为HarmonyOS应用或原子化服务的启动入口。
- **resources目录**：用于存放资源配置文件，比如：国际化字符串、资源限定相关资源和rawfile资源等。
- app.ets文件用于全局应用逻辑和应用生命周期管理。
- pages目录用于存放所有组件页面。
- common目录用于存放公共代码文件，比如：自定义组件和公共方法。

## C++工程目录结构

C++工程目录结构如下图所示。

![img](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20220117180405.99226946374907804552405164419679:50530117023205:2800:689020CC3DD023543B08F3DC4F084BDB32AE24DF4360D27EA3E60F7DD354DCF4.png?needInitFileName=true?needInitFileName=true)

- **entry>src>main>cpp**：用于存放C++源码。
- **entry>src>main>Java**：用于存放Java源码。
- **entry>src>main>resources**：用于存放应用/服务所用到的资源文件，如图形、多媒体、字符串、布局文件等。关于资源文件的详细说明请参考

![image-20220123121216137](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220123121216137.png)

。

## 工程模板和开发语言介绍

DevEco Studio支持包括手机、平板、车机、智慧屏、智能穿戴、轻量级智能穿戴和智慧视觉设备的HarmonyOS应用/服务开发，预置了丰富的工程模板，可以根据工程向导轻松创建适应于各类设备的工程，并自动生成对应的代码和资源模板。同时，DevEco Studio还提供了多种编程语言供开发者进行HarmonyOS应用/服务开发，包括Java、JS、eTS和C/C++编程语言

此图是3.0版本才有，2.0和这个有点出入。

![img](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20220117180405.57714438871501546266605577887707:50530117023205:2800:04741133DD1864907BAFAE497102012DC6261A0F29954E979CE445CE050DDA30.png?needInitFileName=true?needInitFileName=true)

今天介绍是两种工程的目录结构。