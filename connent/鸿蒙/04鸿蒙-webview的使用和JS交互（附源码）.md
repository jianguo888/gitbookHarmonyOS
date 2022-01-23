[春节不停更，此文正在参加「星光计划-春节更帖活动](https://harmonyos.51cto.com/posts/9923)

04鸿蒙-webview的使用和JS交互（附源码）

> 作者：坚果
>
> 公众号："[大前端之旅](https://mp.weixin.qq.com/s/aJvihD4dzEJyOV3q6_Zeng)"
>
> 华为云享专家，InfoQ签约作者，阿里云专家博主，51CTO博客首席体验官，[开源项目GVA成员之一](https://www.gin-vue-admin.com/)，专注于大前端技术的分享，包括Flutter,小程序,安卓，VUE，JavaScript。

日常我们在开发项目时，为了项目快速的开发和迭代，难免会用到H5页面。使用鸿蒙进行项目开发时，也一样免不了要加载H5页面，在移动开发中打开H5页面需要使用`WebView`组件。同时，为了和H5页面进行数据交换，有时候还需要借助`JSBridge`来实现客户端与H5之间的通讯。

那么鸿蒙之中用到的技术是什么呢？WebView

## 在此之前，先看一个报错

​	App Launch: The Huawei Lite Simulator supports only Lite projects.

![image-20220119120232818](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220119120232818.png)

这是什么原因呢，其实简单，就是你没有登陆

![image-20220119120519873](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220119120519873.png)

所以解决这个的问题就是你重新登录就好了。

![image-20220119120935339](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220119120935339.png)

## 汉化（V3.0 Beta2（2021-12-31）版本以上支持）

还有一个问题可能就是目前编辑器大家看着不太习惯，需要汉化一下，那么如何汉化呢，结合Androidstudio的经验，分为如下几步

第一步点击File-setting



![image-20220120093325429](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220120093325429.png)

第二步plugins里面选择如图所示的插件，并安装。

![image-20220120093216775](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220120093216775.png)

第三步，重启，汉化完成

![image-20220120093524445](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220120093524445.png)



## 第一步创建项目

![image-20220120090730826](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220120090730826.png)





点击next

![image-20220120091306705](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220120091306705.png)





## 第二步等依赖安装安装完成



## 第三步打开模拟器



![image-20220120094355966](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220120094355966.png)

点击登录，打开浏览器授权

![image-20220120094448657](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220120094448657.png)

选择p40

![image-20220120094525690](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220120094525690.png)

启动模拟器

![image-20220120094620149](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220120094620149.png)

## 第五步开始正文



接下来开始正文。



## 应用预览：



1. 点击"打开网址"按钮会加载上方网址的Web页面，通过后退"和"前进"按钮实现Web页面间的导航。
2. 点击"加载本地网页"按钮加载本地Web页面，点击"发送消息给本地html"或者Web页面中的"调用Java方法"按钮，实现应用与Web页面间的交互。

![webview](https://luckly007.oss-cn-beijing.aliyuncs.com/image/webview.gif)

这里是http访问方式，鸿蒙的默认是https访问模式，如果您的请求网址是http开头的，可以继续查看后面的教程。

![image-20220120144541935](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220120144541935.png)






## 1. 增加一个WebView组件

### **步骤 1** - 在"resources/base/layout/ability_main.xml"文件中创建WebView，示例代码如下：

```xml
<ohos.agp.components.webengine.WebView 
    ohos:id="$+id:webview" 
    ohos:height="match_parent" 
    ohos:width="match_parent"> 
</WebView>
```

### **步骤 2** - 在"slice/MainAbilitySlice.java"文件中通过如下方式获取WebView对象，示例代码如下：

```xml
WebView webview = (WebView) findComponentById(ResourceTable.Id_webview);
```



## 2. 通过WebView加载Web页面

WebView加载页面分为加载Web页面和加载本地Web页面两种情况，接下来我们将分别进行介绍。

### 1.WebView加载网络Web页面

跟Android类似，要访问网络，我们首先要配置网络访问权限，在config.json的"module"节点最后，添加上网络权限代码

```xml
module": { 
...... 
"reqPermissions": [ 
{ 
   "name": "ohos.permission.INTERNET" 
 } 
] 
}
```

### 2 设置访问模式

鸿蒙的默认是https访问模式，如果您的请求网址是http开头的，请在config.json文件中的deviceConfig下，添加如下设置

```
"deviceConfig": {
    "default": {
      "network": {
        "cleartextTraffic": true
      }
    }
  },
```



在"slice/MainAbilitySlice.java"文件中通过webview.load(String url)方法访问具体的Web页面，通过WebConfig类对WebView组件的行为进行配置，示例代码如下：

```xml
WebConfig webConfig = webview.getWebConfig(); 
// WebView加载URL，其中urlTextField为输入URL的TextField组件 
webview.load(urlTextField.getText());
```

在Web页面进行链接跳转时，WebView默认会打开目标网址，通过WebAgent对象可以定制该行为，示例代码如下：

```java
webview.setWebAgent(new WebAgent() { 
            @Override 
            public boolean isNeedLoadUrl(WebView webView, ResourceRequest request) { 
                if (request == null || request.getRequestUrl() == null) { 
                    LogUtil.info(TAG,"WebAgent isNeedLoadUrl:request is null."); 
                    return false; 
                } 
                String url = request.getRequestUrl().toString(); 
                if (url.startsWith("http:") || url.startsWith("https:")) { 
                    webView.load(url); 
                    return false; 
                } else { 
                    return super.isNeedLoadUrl(webView, request); 
                } 
            } 
        });
```

除此之外，WebAgent对象还提供了相关的回调函数以观测页面状态的变更，如onLoadingPage、onPageLoaded、onError等方法。WebView提供Navigator类进行历史记录的浏览和处理，通过getNavigator()方法获取该类的对象，使用canGoBack()或canGoForward()方法检查是否可以向后或向前浏览，使用goBack()或goForward()方法向后或向前浏览，示例代码如下：

```
Navigator navigator = webView.getNavigator(); 
if (navigator.canGoBack()) { 
    navigator.goBack(); 
} 
if (navigator.canGoForward()) { 
    navigator.goForward(); 
}
```

## 3.WebView加载本地Web页面

将本地的HTML文件放在"resources/rawfile/"目录下，在本教程中命名为test.html。在HarmonyOS系统中，WebView要访问本地Web文件，需要通过DataAbility的方式进行访问，DataAbility的具体使用方法可以参考开发

DataAbility,关于DataAbility的相关知识，后面也会继续展示，谁让他是最重要的内容呢。

在"entry/src/main/config.json"中完成DataAbility的声明，示例代码如下：

```
module": { 
...... 
"abilities": [ 
{ 
  "name": "com.huawei.codelab.DataAbility", 
  "type": "data", 
  "uri": "dataability://com.example.harmonyosdemo.DataAbility" 
} 
] 
}
```

另外需要实现一个DataAbility，通过实现openRawFile(Uri uri, String mode)方法，完成WebView对本地Web页面的访问，示例代码如下：

```
public class DataAbility extends Ability { 
    ... 
    @Override 
    public RawFileDescriptor openRawFile(Uri uri, String mode) throws FileNotFoundException { 
        if (uri == null) {; 
            return super.openRawFile(uri, mode); 
        } 
        String path = uri.getEncodedPath(); 
        int splitIndex = path.indexOf('/', 1); 
        String providerName = Uri.decode(path.substring(1, splitIndex)); 
        String rawFilePath = Uri.decode(path.substring(splitIndex + 1)); 
        RawFileDescriptor rawFileDescriptor = null; 
        try { 
            rawFileDescriptor = getResourceManager().getRawFileEntry(rawFilePath).openRawFileDescriptor(); 
        } catch (IOException e) { 
            // 异常处理 
        } 
        return rawFileDescriptor; 
    } 
}
```

在"slice/MainAbilitySlice.java"中声明需要访问的文件路径，通过webview.load(String url)方法加载本地Web页面，可以通过WebConfig类的对象对WebView访问DataAbility的能力进行配置，示例代码如下：

```
private static final String URL_LOCAL = "dataability://com.huawei.codelab.DataAbility/resources/rawfile/test.html"; 
// 配置是否支持访问DataAbility资源，默认为true 
webConfig.setDataAbilityPermit(true); 
webview.load(URL_LOCAL);
```

## 4. 实现应用与WebView中的Web页面间的通信

本教程以本地Web页面"resources/rawfile/test.html"为例介绍如何实现应用与WebView中的Web页面间交互。
首先需要对WebConfig进行配置，使能WebView与Web页面JavaScript交互的能力，示例代码如下：

```
// 配置是否支持JavaScript，默认值为false 
webConfig.setJavaScriptPermit(true);
```

### 1.应用调用Web页面

在"resources/rawfile/test.html"中编写callJS方法，待应用调用，示例代码如下：

```
<script type="text/javascript"> 
// 应用调用Web页面 
function callJS(message) { 
    alert(message); 
} 
</script>
```

在"slice/MainAbilitySlice.java"中实现应用对JavaScript的调用，示例代码如下：

```
webview.executeJs("javascript:callJS('这是来自JavaSlice的消息')", msg -> { 
        // 在这里处理Js的方法的返回值 
    });
```

我们可以通过setBrowserAgent方法设置自定义BrowserAgent对象，以观测JavaScript事件及通知等，通过复写onJsMessageShow方法来接管Web页面弹出Alert对话框的事件，示例代码如下：

```
webview.setBrowserAgent(new BrowserAgent(this) { 
            @Override 
            public boolean onJsMessageShow(WebView webView, String url, String message, boolean isAlert, JsMessageResult result) { 
                LogUtil.info(TAG,"BrowserAgent onJsMessageShow : " + message); 
                if (isAlert) { 
                    // 将Web页面的alert对话框改为ToastDialog方式提示 
                    new ToastDialog(getApplicationContext()).setText(message).setAlignment(LayoutAlignment.CENTER).show(); 
                    // 对弹框进行确认处理 
                    result.confirm(); 
                    return true; 
                } else { 
                    return super.onJsMessageShow(webView, url, message, isAlert, result); 
                } 
            } 
        });
```

### 2.Web页面使用JavaScript调用应用

在"resources/rawfile/test.html"中编写按钮，当按钮被点击时实现JavaScript对应用的调用，示例代码如下：

```
<body> 
    ...... 
<button id="button" onclick="sendData()" style="background-color:#70DBDB;height:30px;">调用Java方法</button> 
<script type="text/javascript"> 
  function sendData() { 
	  if (window.JsCallJava && window.JsCallJava.call) { 
	      // Web页面调用应用 
	      var rst = window.JsCallJava.call("这个是来自本地Web页面的消息"); 
	  } else { 
	      alert('发送消息给WebviewSlice失败'); 
	  } 
  } 
</script> 
</body>
```

在"slice/MainAbilitySlice.java"中实现应用对JavaScript发起的调用的响应，示例代码如下：

```
private static final String JS_NAME = "JsCallJava"; 
webview.addJsCallback(JS_NAME, str -> { 
	// 处理接收到的JavaScript发送来的消息，本教程通过ToastDialog提示确认收到Web页面发来的消息 
	new ToastDialog(this).setText(str).setAlignment(LayoutAlignment.CENTER).show(); 
	// 返回给JavaScript 
	return "Js Call Java Success"; 
});
```

## 总结

通过上面的完整代码，我们已经完成了webbiew的基本使用

仓库地址：[https://github.com/ITmxs/hm_webview](https://github.com/ITmxs/hm_webview)











## 第二步删除默认代码


打开index.hml文件，里面有默认代码如下：

```html
<div class="container"> 
    <text class="title"> 
        {{ $t('strings.hello') }} {{ title }} 
    </text> 
</div>
```

## 第三步，开始学习

首先将图片放到common文件夹下面的images里面，注意，我的图片文件名是flutter.png，

从上面布局效果图可以看到，界面主要由image组件和text组件组成，我们现在index.html中添加image组件和text组件，并添加对应的class，用于设置组件的显示效果，代码如下：

```html
<div class="container">
    <image class="img img-translate" src="/common/images/flutter.png"></image>
    <text class="text">translate</text>
    <image class="img img-rotate" src="/common/images/flutter.png"></image>
    <text class="text">rotate</text>
    <image class="img img-rotateY" src="/common/images/flutter.png"></image>
    <text class="text">rotateY</text>
    <image class="img img-scale" src="/common/images/flutter.png"></image>
    <text class="text">scale</text>
    <image class="img img-opacity" src="/common/images/flutter.png"></image>
    <text class="text">opacity</text>
</div>
```

## 第四步，为页面设计样式

在这个任务中，我们将一起为任务二中写好的页面添加样式，上面所有的组件都定义了class属性，它对应的样式都定义在index.css中，有关css更多的知识可以参考[css](https://developer.harmonyos.com/cn/docs/documentation/doc-references/js-framework-syntax-css-0000000000611425)语法参考。
这部分定义了整个页面中各个组件的样式。在index.css中先添加如下代码：

```css
.container { 
    background-color: #F8FCF5; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
} 
 
.img { 
    margin-top: 10px; 
    height: 100px; 
    width: 100px; 
    animation-timing-function: ease; 
    animation-duration: 2s; 
    animation-delay: 0s; 
    animation-fill-mode: forwards; 
    animation-iteration-count: infinite; 
} 
 
.text { 
    font-size: 20px; 
} 
 
.img-translate { 
    animation-name: translateAnim; 
} 
 
.img-rotate { 
    animation-name: rotateAnim; 
} 
 
.img-rotateY { 
    animation-name: rotateYAnim; 
} 
 
.img-scale { 
    animation-name: scaleAnim; 
} 
 
.img-mixes { 
    animation-name: mixesAnim; 
} 
 
.img-opacity { 
    animation-name: opacityAnim; 
} 
 
/*从-100px平移到100px*/ 
@keyframes translateAnim { 
    from { 
        transform: translate(-100px); 
    } 
 
    to { 
        transform: translate(100px); 
    } 
} 
 
/*从0°旋转到360°*/ 
@keyframes rotateAnim { 
    from { 
        transform: rotate(0deg); 
    } 
 
    to { 
        transform: rotate(360deg); 
    } 
} 
 
/*沿Y轴旋转，从0°旋转到360°*/ 
@keyframes rotateYAnim { 
    from { 
        transform: rotateY(0deg); 
    } 
 
    to { 
        transform: rotateY(360deg); 
    } 
} 
 
/*从0倍缩放到1.2倍大小*/ 
@keyframes scaleAnim { 
    from { 
        transform: scale(0); 
    } 
 
    to { 
        transform: scale(1.2); 
    } 
} 
 
/*透明度从0变化到1*/ 
@keyframes opacityAnim { 
    from { 
        opacity: 0; 
    } 
 
    to { 
        opacity: 1; 
    } 
}
```


通过一个代码示例，实现image组件的平移、缩放、旋转和透明度变化动效。希望通过本教程，各位开发者可以对JS通用动画样式具有更深刻的认识。

![image-20220119131555766](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220119131555766.png)

## 在实现过程过也遇到一些问题，顺便做个记录

使用![img]()标签引入的本地图片无法加载 

使用![img]()标签引入本地图片，但图片无法加载的可能情况有三种：

1. 没有给图片设置宽度和高度，需要在对应的“page”目录下的 css 样式文件中设置图 片的宽高。
2. 使用![img]()标签的图片不会自动缩放，图片宽高超过组件的宽高会自动 截取。 
3. 图片引入路径错误。图片引入的路径必须是项目编译后的静态文件的路径。  在导入图片或添加/删除页面后没有重新编译。



## 参考

[动画样式：](https://developer.harmonyos.com/cn/docs/documentation/doc-references/js-components-common-animation-0000000000611472)





https://developer.huawei.com/consumer/cn/codelabsPortal/carddetails/HarmonyOS-WebView





https://flutter.cn/docs/cookbook/design/themes