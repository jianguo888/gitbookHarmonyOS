[春节不停更，此文正在参加「星光计划-春节更帖活动](https://harmonyos.51cto.com/posts/9923)

> 作者：坚果
>
> 公众号："[大前端之旅](https://mp.weixin.qq.com/s/aJvihD4dzEJyOV3q6_Zeng)"
>
> 华为云享专家，InfoQ签约作者，阿里云专家博主，51CTO博客首席体验官，[开源项目GVA成员之一](https://www.gin-vue-admin.com/)，专注于大前端技术的分享，包括Flutter,小程序,安卓，VUE，JavaScript。

上一节我在webview的实现中，用到了几个文件夹，这是单独拎出来，做一个介绍，这样的好处就是可以使你更加容易理解一个应用的开发流程。

## 第一个就是config.json

配置文件“config.json”采用JSON文件格式，其中包含了一系列配置项，每个配置项由属性和值两部分构成：

属性出现顺序不分先后，但是每个属性最多只允许出现一次。

每个属性的值为JSON的基本数据类型（数值、字符串、布尔值、数组、对象或者null类型）

那我我们来看一下他的这个文件里都包含那些内容，按照我学习小程序的经验，小程序里有app.json文件，我们就结合小程序来看看他的这里面的东西

小程序启动之后首先就是解析app.json，其实鸿蒙也一样，应用启动之后，先解析config.json文件。

config.json分为三个部分：app 、deviceConfig 、module

也可以通过这个截图查看，我这里展示的三块是缩放后的内容，也是为了方便观察。

![image-20220120155210424](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220120155210424.png)



- app是整个项目的配置，包含了厂商信息、版本号等。

- deviceConfig：表示应用在设备上的配置信息。

- module：表示整个代码的配置信息。

  



## 接下来就详细了解一下

### 1.app 

```
"app": {
   "package": "com.example.harmonyosdemo",   //新建项目时指定的PackageName，而且IDE建议以 com.开头
   "name": ".MyApplication",
   "mainAbility": "com.example.harmonyosdemo.MainAbility",                 //根据新建项目时指定的PackageName 的第一个 . 之后的字符串
    "version": {                        //版本
      "code": 1,                        //版本号，目前测试看，系统并不会阻止降级安装。
      "name": "1.0"                     //版本名
    },
    "apiVersion": {                     //依赖的鸿蒙SDK版本
      "compatible": 3,                  //兼容版本
      "target": 3                       //编译版本
    }
  },
```

1. bundleName包名，你创建时候的
2. vendor，是应用开发厂商的描述，也就是开发公司的名字。我这是这是一个demo，所以是example，后面正式开发的时候记得修改。
3. version：版本号，包含：name、code。通常通过检查code，进行版本升级。

### 2.deviceConfig解析

deviceConfig：应用在设备上配置信息，进程名等等，可以包含default、phone、tablet、tv、car、wearable、liteWearable和smartVision等属性。default标签内的配置是适用于所有设备通用，其他设备类型如果有特殊的需求，则需要在该设备类型的标签下进行配置。

比如我这里设置的是为了能在http下也可以请求成功，鸿蒙的默认是https访问模式，如果您的请求网址是http开头的，请在config.json文件中的deviceConfig下，添加如下设置

```
"deviceConfig": {
  "default": {
    "network": {
      "cleartextTraffic": true
    }
  }
},
```

### 3.module解析

```javascript
 "module": {                           //模块列表，有三个必填的属性 : package,deviceType,distro
    "package": "com.example.harmonyosdemo",      //模块的包名
    "name": ".Learning",                //模块名称
    "reqCapabilities": [                
      "video_support"
    ],
    "deviceType": [                     //目前看是有 "default","tv","wearable",smartVision 。
      "tv"
    ],
    "distro": {                         //distro下面都是必填项
      "deliveryWithInstall": true,      //是否在应用安装时，安装此模块的 hap
      "moduleName": "entry",            
      "moduleType": "entry"             //现在是有 entry,feature,har 三种。
    },
    "defPermissions": {                 //其它应用要访问你的App时需要拥有的权限。
        "name": "com.example.harmonyosdemo.DataAbilityShellProvider.PROVIDER",   //权限名称
      "grantMode": "user_grant"         //user_grant 或者 system_grant
    },
    "reqPermissions": [                 //你的应用需要的权限列表，这里写明后，同样需要运行时申请。
      {
        "name": "ohos.permission.INTERNET"    //举例：网络访问权限。
      }
    ],
    "abilities": [                       //Ability列表
      {
        "skills": [
          {
            "entities": [
              "entity.system.home"        //在全部应用上面显示此Ability
            ],
            "actions": [
              "action.system.home"        //默认启动此Ability
            ]
          }
        ],
        "orientation": "landscape",         //横屏
        "formEnabled": false,                     //是否支持AbilityForm。
        "name": "com.aos.learning.MainAbility",   //Ability名称
        "icon": "$media:icon",                    //Ability图标
        "description": "$string:mainability_description",          //Ability描述
        "label": "Learning",                     //Ability标题
        "type": "page",                          //Ability类型 ：PageAbility or ServiceAbility or DataAbility
        "launchType": "standard"                 //启动模式，目前支持 standard模式和 singleton模式。
      }
    ]
  }
}

```

参考[表来自于](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/basic-config-file-elements-0000000000034463)



- package 包名
- name是hap包的名字，至于什么是HAP,我在后面介绍
- mainAbility表示HAP包的入口ability名称，可自定义，这样你后期调试也会简单
- deviceType表示项目可以在哪些设备上运行。
  因为可能有多个设备，所以有个方括号，表示这些值可以写到一个数组中。如下，你能看懂是那些设备吧，其实这些你应该在创建项目的时候就观察到。

```
"deviceType": [
      "phone",
      "tablet",
      "tv",
      "wearable",
      "car"
    ],
```



- distro表示HAP包的描述信息
- deliveryWithInstall 当前hap包是否可以支持随应用安装。一般都写成true。
- moduleName：当前HAP的名称
- moduleType：表示当前HAP的类型。entry也表示当前的hap是一个主要的模块，可以单独安装并运行
- abilities：代码中每一个页面的配置信息。





HarmonyOS的DevEco Studio支持两种编辑config.json的方式，分别是代码编辑视图和可视化编辑视图。

## 1.代码视图

```json
{
  "app": {
    "bundleName": "com.example.harmonyosdemo",
    "vendor": "example",
    "version": {
      "code": 1000000,
      "name": "1.0.0"
    }
  },
  "deviceConfig": {
    "default": {
      "network": {
        "cleartextTraffic": true
      }
    }
  },
  "module": {
    "package": "com.example.harmonyosdemo",
    "name": ".MyApplication",
    "mainAbility": "com.example.harmonyosdemo.MainAbility",
    "deviceType": [
      "phone",
      "tablet",
      "tv",
      "wearable",
      "car"
    ],
    "distro": {
      "deliveryWithInstall": true,
      "moduleName": "entry",
      "moduleType": "entry",
      "installationFree": false
    },
    "abilities": [
      {
        "skills": [
          {
            "entities": [
              "entity.system.home"
            ],
            "actions": [
              "action.system.home"
            ]
          }
        ],
        "orientation": "unspecified",
        "visible": true,
        "name": "com.example.harmonyosdemo.MainAbility",
        "icon": "$media:icon",
        "description": "$string:mainability_description",
        "label": "$string:entry_MainAbility",
        "type": "page",
        "launchType": "standard"
      },
      {
        "name": "com.example.harmonyosdemo.DataAbility",
        "icon": "$media:icon",
        "description": "$string:dataability_description",
        "type": "data",
        "uri": "dataability://com.example.harmonyosdemo.DataAbility"
      }
    ],
    "defPermissions": [
      {
        "name": "com.example.harmonyosdemo.DataAbilityShellProvider.PROVIDER"
      }
    ],
    "reqPermissions": [
      {
        "reason": "",
        "name": "ohos.permission.INTERNET"
      }
    ]

  }
}
```



## 2. 编辑视图



![edit](https://luckly007.oss-cn-beijing.aliyuncs.com/image/edit.gif)



## 总结：

这里了解了config.json的三个部分，app 、deviceConfig 、module，以及他的两种编辑方式，大家可以按照自己的需求实现自己想要的。



参考文档：[应用配置介绍](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/basic-config-file-overview-0000000000011951)

