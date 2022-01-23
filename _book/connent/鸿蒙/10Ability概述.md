10Ability概述

[春节不停更，此文正在参加「星光计划-春节更帖活动](https://harmonyos.51cto.com/posts/9923)

> 作者：坚果
>
> 公众号："[大前端之旅](https://mp.weixin.qq.com/s/aJvihD4dzEJyOV3q6_Zeng)"
>
> 华为云享专家，InfoQ签约作者，阿里云专家博主，51CTO博客首席体验官，[开源项目GVA成员之一](https://www.gin-vue-admin.com/)，专注于大前端技术的分享，包括Flutter,小程序,安卓，VUE，JavaScript。

## 鸿蒙开发核心之Ability详解

Ability是应用所具备能力的抽象，也是应用程序的重要组成部分。一个应用可以具备多种能力（即可以包含多个Ability），HarmonyOS支持应用以Ability为单位进行部署。Ability可以分为FA（Feature Ability）和PA（Particle Ability）两种类型，每种类型为开发者提供了不同的模板，以便实现不同的业务功能。

 ![image-20220122211241915](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220122211241915.png)



- **FA（Feature Ability）** 中文意思是功能能力，支持Page Ability

  Page模板是FA唯一支持的模板，用于提供与用户交互的能力。一个Page实例可以包含一组相关页面，每个页面用一个AbilitySlice实例表示。

- **PA（Particle Ability）** 这个里面也是支持两个能力， **Service Ability** 和 **Data Ability** 我相信你知道它们的意思，就是服务能力和数据能力。

  - Service模板：用于提供后台运行任务的能力。
  - Data模板：用于对外部提供统一的数据访问抽象。



例如，新闻APP可以通过一个Page来实现，其中包含了两个AbilitySlice：一个AbilitySlice用于展示新闻列表，另一个AbilitySlice用于展示新闻详情。Page和AbilitySlice的关系如图所示。

 Page与AbilitySlice

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/0000000000011111111.20211022162334.13388920063711251214278361590895:50521021083943:2800:8D780BCB1BDE50858286BF0674A5181AF1F58388FA784D86ECC41AC1F6EE249E.png)



上面的例子大家看懂了没？一个 Page 可以包含多个 AbilitySlice，但是 Page 进入前台时界面默认只展示一个AbilitySlice。默认展示的 AbilitySlice 是通过 **setMainRoute()** 方法来指定的。如果需要更改默认展示的 AbilitySlice，可以通过 **addActionRoute()** 方法为此 AbilitySlice 配置一条路由规则。



```
package com.example.harmonyosdemo;

import com.example.harmonyosdemo.slice.MainAbilitySlice;
import com.example.harmonyosdemo.slice.SecondAbilitySlice;
import ohos.aafwk.ability.Ability;
import ohos.aafwk.content.Intent;

public class MainAbility extends Ability {
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        //默认显示
        super.setMainRoute(MainAbilitySlice.class.getName());
        //配置路由规则显示
        addActionRoute( "action.second", SecondAbilitySlice.class.getName());
    }
}
```

![image-20220121103346324](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220121103346324.png)

看图可能更加容易理解。

此时，当其他 Page 实例期望导航到此 AbilitySlice 时，可以在 Intent 中指定 Action。**addActionRoute()** 方法中使用的动作命名，需要在应用配置文件（**config.json**）中注册：

```
"skills": [
  {
    "entities": [
      "entity.system.home"
    ],
    "actions": [
      "action.system.home",
      "action.second"
    ]
  }
],
```



![image-20220121102928310](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220121102928310.png)



当然在[配置文件](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/basic-config-file-overview-0000000000011951)（config.json）中注册Ability时，可以通过配置Ability元素中的“type”属性来指定Ability模板类型，示例如下。

其中，“type”的取值可以为“page”、“service”或“data”，分别代表 Page 模板、Service 模板、Data 模板。结合下面这个图来看知道是怎么回事了，type的属性值取决于你创建Ability是选择的类型，当然你也可以后面再改。

```js
{
    "module": {
        ...
        "abilities": [
            {
                ...
                "type": "page"
                ...
            }
        ]
        ...
    }
    ...
}
```



## 一 、Page Ability讲解

Android 中有Activity，Activity有生命周期，现在我们知道的是鸿蒙这个Page Ability是主要负责页面交互的，同样的Page Ability也是有生命周期的。

### 1. Page Ability 生命周期

系统管理或用户操作等行为均会引起Page实例在其生命周期的不同状态之间进行转换。Ability类提供的回调机制能够让Page及时感知外界变化，从而正确地应对状态变化（比如释放资源），这有助于提升应用的性能和稳健性。

首先来看官方的一张图

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/0000000000011111111.20211022162334.48725183787045503050311343785229:50521021083943:2800:B475C12FFE83A4EA5AFF7499054E528AD196D29AA3158ED4EAF367667BAE02FB.png)



可以看到周期分别是**onStart()**、**onActive()**、**onInactive()**、**onBackground()**、**onForeground()**、**onStop()**六个，那么接下来我们就详细了解一下。

#### onStart()

当系统首次创建 **Page Ability**实例时，触发该回调。对于一个 **Page Ability**实例，该回调在其生命周期过程中仅触发一次，**Page Ability**在该逻辑后将进入 INACTIVE 状态。开发者必须重写该方法，并在此配置默认展示的 AbilitySlice。如下图所示

![image-20220121110431327](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220121110431327.png)





#### onActive()

Page会在进入INACTIVE状态后来到前台，然后系统调用此回调。Page在此之后进入ACTIVE状态，该状态是应用与用户交互的状态。Page将保持在此状态，除非某类事件发生导致Page失去焦点，比如用户点击返回键或导航到其他Page。当此类事件发生时，会触发Page回到INACTIVE状态，系统将调用onInactive()回调。此后，Page可能重新回到ACTIVE状态，系统将再次调用onActive()回调。因此，开发者通常需要成对实现onActive()和onInactive()，并在onActive()中获取在onInactive()中被释放的资源。类似于Android的onResume。

#### onInactive()

当Page失去焦点时，系统将调用此回调，此后Page进入INACTIVE状态。开发者可以在此回调中实现Page失去焦点时应表现的恰当行为。类似于Android的onPause和onStop的集合体。

#### onBackground()

如果Page不再对用户可见，系统将调用此回调通知开发者用户进行相应的资源释放，此后Page进入BACKGROUND状态。开发者应该在此回调中释放Page不可见时无用的资源，或在此回调中执行较为耗时的状态保存操作。

#### onForeground()

处于BACKGROUND状态的Page仍然驻留在内存中，当重新回到前台时（比如用户重新导航到此Page），系统将先调用onForeground()回调通知开发者，而后Page的生命周期状态回到INACTIVE状态。开发者应当在此回调中重新申请在onBackground()中释放的资源，最后Page的生命周期状态进一步回到ACTIVE状态，系统将通过onActive()回调通知开发者用户。

#### onStop()

系统将要销毁Page时，将会触发此回调函数，通知用户进行系统资源的释放。销毁Page的可能原因包括以下几个方面：

- 用户通过系统管理能力关闭指定Page，例如使用任务管理器关闭Page。
- 用户行为触发Page的terminateAbility()方法调用，例如使用应用的退出功能。
- 配置变更导致系统暂时销毁Page并重建。
- 系统出于资源管理目的，自动触发对处于BACKGROUND状态Page的销毁。



### 2. AbilitySlice 生命周期



![image-20220121124118415](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220121124118415.png)

说实话一开始创建项目的时候就只有这个**MainAbility**和**HelloWorld**以及slice包下的**MainAbilitySlice**，后来新建了一个**SecondAbility**，而**SecondAbilitySlice**是自动生成的，这说明一个问题，它们之间有不可告人的秘密。我们可以一起来看看，

解释：**AbilitySlice** 作为 **Page Ability**的组成单元，其生命周期是依托于其所属 **Page Ability**生命周期的。**AbilitySlice** 和 **Page Ability**具有相同的生命周期状态和同名的回调，当 **Page Ability**生命周期发生变化时，它的 AbilitySlice 也会发生相同的生命周期变化。此外，**AbilitySlice** 还具有独立于 **Page Ability**的生命周期变化，这发生在同一 **Page Ability**中的 **AbilitySlice** 之间导航时，此时 **Page Ability**的生命周期状态不会改变。**AbilitySlice** 生命周期回调与 **Page Ability**的相应回调类似，因此不再赘述。由于 **AbilitySlice** 承载具体的页面，开发者必须重写 **AbilitySlice** 的 **onStart()**回调，并在此方法中通过 **setUIContent()**方法设置页面，如下所示：

![image-20220121124318514](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220121124318514.png)

**Page 与 AbilitySlice 生命周期关联**

  当 **AbilitySlice** 处于前台且具有焦点时，其生命周期状态随着所属 **Page Ability**的生命周期状态的变化而变化。当一个 **Page Ability**拥
有多个 **AbilitySlice** 时，例如：**MyAbility** 下有 **FooAbilitySlice** 和 **BarAbilitySlice**，当前 **FooAbilitySlice** 处于前台并获得焦点，并即将导航到 **BarAbilitySlice**，在此期间的生命周期状态变化顺序为：

1. **FooAbilitySlice** 从 ACTIVE 状态变为 INACTIVE 状态。
2. **BarAbilitySlice** 则从 INITIAL 状态首先变为 INACTIVE 状态，然后变为 ACTIVE 状态（假定此前 **BarAbilitySlice** 未曾

启动）。

1. **FooAbilitySlice** 从 INACTIVE 状态变为 BACKGROUND 状态。对应两个 **slice** 的生命周期方法回调顺序为：

**FooAbilitySlice.onInactive()** --> **BarAbilitySlice.onStart()** --> **BarAbilitySlice.onActive()** -
-> **FooAbilitySlice.onBackground()**
在整个流程中，**MyAbility** 始终处于 ACTIVE 状态。但是，当 **Page Ability**被系统销毁时，其所有已
实例化的 AbilitySlice 将联动销毁，而不仅是处于前台的 AbilitySlice。



## 二、Service Ability



### Service Ability基本概念

基于Service模板的Ability（以下简称“Service”）主要用于后台运行任务（如执行音乐播放、文件下载等），但不提供用户交互界面。Service可由其他应用或Ability启动，即使用户切换到其他应用，Service仍将在后台继续运行。

Service是单实例的。在一个设备上，相同的Service只会存在一个实例。如果多个Ability共用这个实例，只有当与Service绑定的所有Ability都退出后，Service才能够退出。由于Service是在主线程里执行的，因此，如果在Service里面的操作时间过长，开发者必须在Service里创建新的线程来处理（详见[线程间通信](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/inter-thread-overview-0000000000038958)），防止造成主线程阻塞，应用程序无响应。

### 创建Service

介绍如何创建一个Service。

1. 创建Ability的子类，实现Service相关的生命周期方法。Service也是一种Ability，Ability为Service提供了以下生命周期方法，开发者可以重写这些方法，来添加其他Ability请求与Service Ability交互时的处理方法。

   onStart()

   该方法在创建Service的时候调用，用于Service的初始化。在Service的整个生命周期只会调用一次，调用时传入的Intent应为空。

   onCommand()

   在Service创建完成之后调用，该方法在客户端每次启动该Service时都会调用，开发者可以在该方法中做一些调用统计、初始化类的操作。

   onConnect()

   在Ability和Service连接时调用，该方法返回IRemoteObject对象，开发者可以在该回调函数中生成对应Service的IPC通信通道，以便Ability与Service交互。Ability可以多次连接同一个Service，系统会缓存该Service的IPC通信对象，只有第一个客户端连接Service时，系统才会调用Service的onConnect方法来生成IRemoteObject对象，而后系统会将同一个RemoteObject对象传递至其他连接同一个Service的所有客户端，而无需再次调用onConnect方法。

   onDisconnect()

   在Ability与绑定的Service断开连接时调用。

   onStop()

   在Service销毁时调用。Service应通过实现此方法来清理任何资源，如关闭线程、注册的侦听器等。

   创建Service的代码示例如下：

   ```
   public class ServiceAbility extends Ability {
       @Override
       public void onStart(Intent intent) {
           super.onStart(intent);
       }
   
       @Override
       public void onCommand(Intent intent, boolean restart, int startId) {
           super.onCommand(intent, restart, startId);
       }
   
       @Override
       public IRemoteObject onConnect(Intent intent) {
           return super.onConnect(intent);
       }
   
       @Override
       public void onDisconnect(Intent intent) {
           super.onDisconnect(intent);
       }
   
       @Override
       public void onStop() {
           super.onStop();
       }
   }
   ```

2. 注册Service。

   Service也需要在应用配置文件中进行注册，注册类型type需要设置为service。

   ```
   {
       "module": {
           "abilities": [         
               {    
                   "name": ".ServiceAbility",
                   "type": "service",
                   "visible": true
                   ...
               }
           ]
           ...
       }
       ...
   }
   ```

### 启动Service

介绍通过startAbility()启动Service以及对应的停止方法。

- 启动Service

  Ability为开发者提供了startAbility()方法来启动另外一个Ability。因为Service也是Ability的一种，开发者同样可以通过将[Intent](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ability-intent-0000000000038799)传递给该方法来启动Service。不仅支持启动本地Service，还支持启动远程Service。

  开发者可以通过构造包含DeviceId、BundleName与AbilityName的Operation对象来设置目标Service信息。这三个参数的含义如下：

  - DeviceId：表示设备ID。如果是本地设备，则可以直接留空；如果是远程设备，可以通过ohos.distributedschedule.interwork.DeviceManager提供的getDeviceList获取设备列表，详见[Java API参考](https://developer.harmonyos.com/cn/docs/documentation/doc-references/reference-document-outline-0000001115016824)。
  - BundleName：表示包名称。
  - AbilityName：表示待启动的Ability名称。

  启动本地设备Service的代码示例如下：

  ```
  Intent intent = new Intent();
  Operation operation = new Intent.OperationBuilder()
          .withDeviceId("")
          .withBundleName("com.domainname.hiworld.himusic")
          .withAbilityName("com.domainname.hiworld.himusic.ServiceAbility")
          .build();
  intent.setOperation(operation);
  startAbility(intent);
  ```

  启动远程设备Service的代码示例如下：

  ```
  Intent intent = new Intent();
  Operation operation = new Intent.OperationBuilder()
          .withDeviceId("")
          .withBundleName("com.domainname.hiworld.himusic")
          .withAbilityName("com.domainname.hiworld.himusic.ServiceAbility")
          .build();
  intent.setOperation(operation);
  startAbility(intent);
  ```

  执行上述代码后，Ability将通过startAbility() 方法来启动Service。

  - 如果Service尚未运行，则系统会先调用onStart()来初始化Service，再回调Service的onCommand()方法来启动Service。
  - 如果Service正在运行，则系统会直接回调Service的onCommand()方法来启动Service。

- 停止Service

  Service一旦创建就会一直保持在后台运行，除非必须回收内存资源，否则系统不会停止或销毁Service。开发者可以在Service中通过terminateAbility()停止本Service或在其他Ability调用stopAbility()来停止Service。

  停止Service同样支持停止本地设备Service和停止远程设备Service，使用方法与启动Service一样。一旦调用停止Service的方法，系统便会尽快销毁Service。

### 连接Service



如果Service需要与Page Ability或其他应用的Service Ability进行交互，则须创建用于连接的Connection。Service支持其他Ability通过connectAbility()方法与其进行连接。

在使用connectAbility()处理回调时，需要传入目标Service的[Intent](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ability-intent-0000000000038799)与IAbilityConnection的实例。IAbilityConnection提供了两个方法供开发者实现：onAbilityConnectDone()是用来处理连接Service成功的回调，onAbilityDisconnectDone()是用来处理Service异常死亡的回调。

创建连接Service回调实例的代码示例如下：

```
// 创建连接Service回调实例
private IAbilityConnection connection = new IAbilityConnection() {
    // 连接到Service的回调
    @Override
    public void onAbilityConnectDone(ElementName elementName, IRemoteObject iRemoteObject, int resultCode) {
        // Client侧需要定义与Service侧相同的IRemoteObject实现类。开发者获取服务端传过来IRemoteObject对象，并从中解析出服务端传过来的信息。
    }

    // Service异常死亡的回调
    @Override
    public void onAbilityDisconnectDone(ElementName elementName, int resultCode) {
    }
};
```

连接Service的代码示例如下：

```
// 连接Service
Intent intent = new Intent();
Operation operation = new Intent.OperationBuilder()
        .withDeviceId("deviceId")
        .withBundleName("com.domainname.hiworld.himusic")
        .withAbilityName("com.domainname.hiworld.himusic.ServiceAbility")
        .build();
intent.setOperation(operation);
connectAbility(intent, connection);
```

同时，Service侧也需要在onConnect()时返回IRemoteObject，从而定义与Service进行通信的接口。onConnect()需要返回一个IRemoteObject对象，HarmonyOS提供了IRemoteObject的默认实现，用户可以通过继承LocalRemoteObject来创建自定义的实现类。Service侧把自身的实例返回给调用侧的代码示例如下：

```
// 创建自定义IRemoteObject实现类
private class MyRemoteObject extends LocalRemoteObject {
    MyRemoteObject(){
    }
}

// 把IRemoteObject返回给客户端
@Override
protected IRemoteObject onConnect(Intent intent) {
    return new MyRemoteObject();
}
```

### Service Ability生命周期

与Page类似，Service也拥有生命周期，如[图1](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ability-service-lifecycle-0000000000044472#ZH-CN_TOPIC_0000001077123656__fig49671548164217)所示。根据调用方法的不同，其生命周期有以下两种路径：

- 启动

  Service

  该Service在其他Ability调用startAbility()时创建，然后保持运行。其他Ability通过调用stopAbility()来停止Service，Service停止后，系统会将其销毁。

- 连接

  Service

  该Service在其他Ability调用connectAbility()时创建，客户端可通过调用disconnectAbility()断开连接。多个客户端可以绑定到相同Service，而且当所有绑定全部取消后，系统即会销毁该Service。

  connectAbility()也可以连接通过startAbility()创建的Service。

  **图1** Service生命周期
  ![点击放大](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20211022162334.14885806869435737862963909603449:50521021083944:2800:C520245891A420D4EDAC74100C82AA91F2A30ED212B4A4AE70657172B08E4B32.jpg?needInitFileName=true?needInitFileName=true)

### 前台Service

一般情况下，Service都是在后台运行的，后台Service的优先级都是比较低的，当资源不足时，系统有可能回收正在运行的后台Service。

在一些场景下（如播放音乐），用户希望应用能够一直保持运行，此时就需要使用前台Service。前台Service会始终保持正在运行的图标在系统状态栏显示。

使用前台Service并不复杂，开发者只需在Service创建的方法里，调用keepBackgroundRunning()将Service与通知绑定。调用keepBackgroundRunning()方法前需要在配置文件中声明ohos.permission.KEEP_BACKGROUND_RUNNING权限，同时还需要在配置文件中添加对应的backgroundModes参数。在onStop()方法中调用cancelBackgroundRunning()方法可停止前台Service。

使用前台Service的onStart()代码示例如下：

```
// 创建通知，其中1005为notificationId
NotificationRequest request = new NotificationRequest(1005);
NotificationRequest.NotificationNormalContent content = new NotificationRequest.NotificationNormalContent();
content.setTitle("title").setText("text");
NotificationRequest.NotificationContent notificationContent = new NotificationRequest.NotificationContent(content);
request.setContent(notificationContent);

// 绑定通知，1005为创建通知时传入的notificationId
keepBackgroundRunning(1005, request);
```

在配置文件中，“module > abilities”字段下对当前Service做如下配置：

```
{    
    "name": ".ServiceAbility",
    "type": "service",
    "visible": true,
    "backgroundModes": ["dataTransfer", "location"]
}
```



## 三 、Data Ability

### Data Ability基本概念

使用Data模板的Ability（以下简称“Data”）有助于应用管理其自身和其他应用存储数据的访问，并提供与其他应用共享数据的方法。Data既可用于同设备不同应用的数据共享，也支持跨设备不同应用的数据共享。

数据的存放形式多样，可以是数据库，也可以是磁盘上的文件。Data对外提供对数据的增、删、改、查，以及打开文件等接口，这些接口的具体实现由开发者提供。

### URI介绍



Data的提供方和使用方都通过URI（Uniform Resource Identifier）来标识一个具体的数据，例如数据库中的某个表或磁盘上的某个文件。HarmonyOS的URI仍基于URI通用标准，格式如下：

![img](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20211022162334.86328599566391812430492620756338:50521021083943:2800:A4EF54F2052951E3953DEE09CEC4DFA9F965F8BA9A4F86AE7DDD42A8B3D57BD1.png?needInitFileName=true?needInitFileName=true)

- scheme：协议方案名，固定为“dataability”，代表Data Ability所使用的协议类型。
- authority：设备ID。如果为跨设备场景，则为目标设备的ID；如果为本地设备场景，则不需要填写。
- path：资源的路径信息，代表特定资源的位置信息。
- query：查询参数。
- fragment：可以用于指示要访问的子资源。

URI示例：

- 跨设备场景：dataability://*device_id*/*com.domainname.dataability.persondata*/*person*/*10*

- 本地设备：dataability:///

  com.domainname.dataability.persondata/person/10

  说明

  本地设备的“device_id”字段为空，因此在“dataability:”后面有三个“/”。



## 总结

 说实话写这一篇文章花费了一番功夫，不断的浏览官网上的文档然后结合实际来写，写的不是很好，请勿见怪，另外就是觉得官网的教程只是一部分，更多的需要开发者自行去探索和发现，正所谓师傅领进门，修行在个人，鸿蒙需要成长，我们开发者同样也要成长，也许不会前进的路上会很坎坷，但经历过后就会发现另一番风景，我是初学者，保持初学的态度和动力，感谢您的阅读，山高水长，后会有期！



## 参考文档

https://aijishu.com/a/1060000000139663#item-1-2

https://aijishu.com/a/1060000000139663#item-1-4