# 实现HarmonyOS应用（ets）

[春节不停更，此文正在参加「星光计划-春节更帖活动](https://harmonyos.51cto.com/posts/9923)

> 作者：坚果
>
> 公众号："[大前端之旅](https://mp.weixin.qq.com/s/aJvihD4dzEJyOV3q6_Zeng)"
>
> 华为云享专家，InfoQ签约作者，阿里云专家博主，51CTO博客首席体验官，[开源项目GVA成员之一](https://www.gin-vue-admin.com/)，专注于大前端技术的分享，包括Flutter,小程序,安卓，VUE，JavaScript。

这里大概分为五步。

## 第一步：创建应用工程 

### 创建开发工程 （这里以eTS工程）为例





1. 打开DevEco Studio

![image-20220122190612607](C:\Users\85285\AppData\Roaming\Typora\typora-user-images\image-20220122190612607.png)

2.创建一个新工程，选择模板，如Empty Ability：

![image-20220122190655400](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220122190655400.png)

3.进入配置工程界面，Project Type选择Application，Language选择eTS，其他参数根据实际需要设置即可。

![image-20220122191820043](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220122191820043.png)

### 修改代码文件 



工程创建完成后，在Project窗口，点击“entry > src > main > ets > default > pages”，打开“index.ets”文件

![image-20220122194923823](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220122194923823.png)



![image-20220122195348640](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220122195348640.png)

## 第二步：实现用户界面



### 使用UI组件和装饰器 

基础组件：Image、Text、 Video等 容器组件：Stack、Column、 List等 

组件化装饰： @Component、@Entry、 @Builder 、@Extend等 实现组合目标面 

配套实现页面组件开发及组件 自定义 状态管理装饰： @State 、 @Link 、@Observed、 @ObjectLink、 @StorageLink、 @Watch 

实现数据驱动视图自动更新



### 使用UI渲染控制语法 

条件渲染：if/elseif/else

进行UI描述时，根据不同状 态来动态控制组件的渲染

 循环渲染： ForEach/LazyForEach 

 进行UI描述时，根据数据的 多少动态控制渲染的次数， 优化代码实现

### 引用UI资源 

  字符串引用： $ r (‘app.s t ring.name’ ) 

resources的element目录 下定义字符串，支持全球化 小语种 

媒体资源引用： $ r (‘app.media.name’ ) 

resources的media目录下存 放资源，支持png、jpg、 svg等多种格式 

### 添加UI交互事件 

基础手势事件：onClick /  onTouch等 

定义基础用户交互，结合 TouchEvent信息可以实现自定 义手势 

高级手势事件：长按手势 / 滑 动手势 / 组合手势等 

通过gesture属性函数配置 内置高级手势支持， GestureGroup可支持多种 高级手势组合

## 第三步：完善功能逻辑 

### 使用生命周期接口 

页面生命周期接口：onPageShow、 onPageHide 

UI组件生命周期接口： aboutToAppear、aboutToDisappear 

其它生命周期接口：onBackPressed、 onCreate、onDestroy等 

结合页面、UI组件、系统状态的变化生命 周期接口添加功能逻辑 

### 使用子系统能力接口 

多个子系统提供大量系统能力接口 使用仅需两步：

 一、导入依赖包。

 二、直接调用系统能力接口。 

调用系统能力实现具体功能逻辑

## 第四步：优化交互体验

### 实现动效

#### 属性动画

animation ：自动监听组 件所有通用属性变化，自动增加动画 补间 

显式动画animateTo ：指定特定 属性变化，为特定的属性动画自动增 加动画补间 

修改组件属性，自动生成动画补 间，优化属性变化交互体验 

#### 转场动画

组件间转场： transition监听组件 的渲染状态变化，增加组件渲染、移除时的动画效果 

页面间转场： pageTransition指定页面间跳转的切换动画效果

组件、页面切换时，自动生成动画 补间，优化切换交互体验 

#### 动画组件

 ImageAnimator：支持逐帧图片播 放动画 

 使用多个图片组成动画，并动态控制 动画播放

Animator：组件形式提供动画控制器 动态控制播放状态，定制补间动画， 实现深度自定义动画效果。

## 第五步：模拟器调试

![image-20220122195142020](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220122195142020.png)

登录



![image-20220122195200288](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220122195200288.png)



选择p40Pro

	Failure[INSTALL_PARSE_FAILED_USESDK_ERROR]
			compileSdkVersion and releaseType of the app do not match the apiVersion and releaseType on the device.

![image-20220122195809605](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220122195809605.png)



![image-20220122195946941](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220122195946941.png)



源码地址：https://github.com/ITmxs/hm_ets_demo