15鸿蒙HarmonyOS应用开发之资源文件

[春节不停更，此文正在参加「星光计划-春节更帖活动](https://harmonyos.51cto.com/posts/9923)

> 作者：坚果
>
> 公众号："[大前端之旅](https://mp.weixin.qq.com/s/aJvihD4dzEJyOV3q6_Zeng)"
>
> 华为云享专家，InfoQ签约作者，阿里云专家博主，51CTO博客首席体验官，[开源项目GVA成员之一](https://www.gin-vue-admin.com/)，专注于大前端技术的分享，包括Flutter,小程序,安卓，VUE，JavaScript。

## resources目录

应用的资源文件（字符串、图片、音频等）统一存放于resources目录下，便于开发者使用和维护。resources目录包括两大类目录，一类为base目录与限定词目录，另一类为rawfile目录，

```
resources
|---base  // 默认存在的目录
|   |---element
|   |   |---string.json
|   |---media
|   |   |---icon.png
|---en_GB-vertical-car-mdpi // 限定词目录示例，需要开发者自行创建   
|   |---element
|   |   |---string.json
|   |---media
|   |   |---icon.png
|---rawfile  // 默认存在的目录
```

**资源组目录**说明

base目录与限定词目录下面可以创建资源组目录（包括element、media、animation、layout、graphic、profile），用于存放特定类型的资源文件

![image-20220123115803396](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220123115803396.png)

## 资源文件的引用方法

**base目录与限定词目录中的资源文件**：通过指定资源类型（type）和资源名称（name）来引用。

- Java文件引用资源文件的格式：ResourceTable.*type*_**name**。特别地，如果引用的是系统资源，则采用：

  ohos.global.systemres.ResourceTable.*type*_*name*

  示例一：在Java文件中，引用string.json

  文件中类型为“String”、名称为“app_name”的资源。

  ```
  ohos.global.resource.ResourceManager resManager = this.getResourceManager();
  String result = resManager.getElement(ResourceTable.String_app_name).getString();
  ```

  示例二：在Java文件中，引用color.json

  文件中类型为“Color”、名称为“red”的资源。

  ```
  ohos.global.resource.ResourceManager resManager = this.getResourceManager();
  String result = resManager.getElement(ResourceTable.String_app_name).getString();
  ```

- XML文件引用资源文件的格式：$*type**:**name*特别地，如果引用的是系统资源，则采用：

  $ohos:*type**:**name*在XML文件中，引用[string.json](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/basic-resource-file-example-0000001051733014#section1921624113243)文件中类型为“String”、名称为“app_name”的资源，

  ```
  <?xml version="1.0" encoding="utf-8"?>
  <DirectionalLayout xmlns:ohos="http://schemas.huawei.com/res/ohos"
      ohos:width="match_parent"
      ohos:height="match_parent"
      ohos:orientation="vertical">
      <Text ohos:text="$string:app_name"/>
  </DirectionalLayout>
  ```

**rawfile目录中的资源文件**：通过指定文件路径和文件名称来引用。

在Java文件中，引用一个路径为“resources/rawfile/”、名称为“example.js”的资源文件，示例如下：

```
ohos.global.resource.ResourceManager resManager = this.getResourceManager();
ohos.global.resource.RawFileEntry rawFileEntry = resManager.getRawFileEntry("resources/rawfile/example.js"); 
```

## 系统资源文件

目前支持的部分系统资源文件详见1

![image-20220123120153810](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220123120153810.png)