## 前言 ：
各位同学大家好，有断时间没有给大家更新文章，具体多久我也不清楚哈。最近还在继续学习鸿蒙开发。平常在开发安卓或者java 以及flutter 的时候都有用到对应端的日志打印来调试代码。今天就分享一下鸿蒙里面日志打印使用技巧。

## 日志打印概述
HarmonyOS提供了HiLog日志系统，让应用可以按照指定类型、指定级别、指定格式字符串输出日志内容，帮助开发者了解应用的运行状态，更好地调试程序。
输出日志的接口由HiLog类提供。在输出日志前，需要先调用HiLog的辅助类HiLogLabel定义日志标签。

#### 定义日志标签
使用HiLogLabel(int type, int domain, String tag)定义日志标签，其中包括了日志类型、业务领域和TAG。使用示例：
```
static final HiLogLabel LABEL = new HiLogLabel(HiLog.LOG_APP, 0x00201, "MY_TAG"); 
```
- 参数type：用于指定输出日志的类型。HiLog中当前只提供了一种日志类型，即应用日志类型LOG_APP。
- 参数domain：用于指定输出日志所对应的业务领域，取值范围为0x0~0xFFFFF，开发者可以根据需要进行自定义。
- 参数tag：用于指定日志标识，可以为任意字符串，建议标识调用所在的类或者业务行为。
 开发者可以根据自定义参数domain和tag来进行日志的筛选和查找。
## 输出日志
HiLog中定义了DEBUG、INFO、WARN、ERROR、FATAL五种日志级别，并提供了对应的方法用于输出不同级别的日志，如下表所示。
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-d59bc28f85c48521.png)

-   参数label：定义好的HiLogLabel标签。
-  参数format：格式字符串，用于日志的格式化输出。格式字符串中可以设置多个参数，例如格式字符串为“Failed to visit %s.”，“%s”为参数类型为string的变参标识，具体取值在args中定义。

    每个参数需添加隐私标识，分为{public}或{private}，默认为{private}。{public}表示日志打印结果可见；{private}表示日志打印结果不可见，输出结果为<private>。

-  参数args：可以为0个或多个参数，是格式字符串中参数类型对应的参数列表。参数的数量、类型必须与格式字符串中的标识一一对应。
HiLog 源码
```
package ohos.hiviewdfx;

public final class HiLog {
    public static final int DEBUG = 3;
    public static final int ERROR = 6;
    public static final int FATAL = 7;
    public static final int INFO = 4;
    public static final int LOG_APP = 0;
    public static final int WARN = 5;

    HiLog() {
        throw new RuntimeException("Stub!");
    }

    public static int debug(HiLogLabel label, String format, Object... args) {
        throw new RuntimeException("Stub!");
    }

    public static int info(HiLogLabel label, String format, Object... args) {
        throw new RuntimeException("Stub!");
    }

    public static int warn(HiLogLabel label, String format, Object... args) {
        throw new RuntimeException("Stub!");
    }

    public static int error(HiLogLabel label, String format, Object... args) {
        throw new RuntimeException("Stub!");
    }

    public static int fatal(HiLogLabel label, String format, Object... args) {
        throw new RuntimeException("Stub!");
    }

    public static boolean isLoggable(int domain, String tag, int level) {
        throw new RuntimeException("Stub!");
    }

    public static String getStackTrace(Throwable tr) {
        throw new RuntimeException("Stub!");
    }
}
```
我们用过观察Hilog 的源码  Hilog 类提供对方方法 有
- #### debug  
- ####  info  
- #### warn 
- ####  error 
- ####  fata
等5个静态方法
以输出一条WARN级别的信息为例，示例代码：

```
HiLog.warn(LABEL, "Failed to visit %{private}s, reason:%{public}d.", url, errno);
```
该行代码表示输出一个日志标签为label的警告信息，格式字符串为：“Failed to visit %{private}s, reason:%{public}d.”。其中变参url的格式为私有的字符串，errno为公共的整型数。
## 查看日志信息
DevEco Studio提供了HiLog窗口查看日志信息，开发者可通过设置设备、进程、日志级别和搜索关键词来筛选日志信息。搜索功能支持使用正则表达式，开发者可通过搜索自定义的业务领域值和TAG来筛选日志信息。
如示例所示，根据实际情况选择了设备和进程后，搜索业务领域值“00201”进行筛选，得到对应的日志信息
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-ac84ffc7fec2db77.png)
结果输出：
```
01-20 16:08:36.908 23597-23597/com.example.myapplication W 00201/MY_TAG: Failed to visit <private>, reason:503
```
- W表示日志级别为WARN。
- 00201/MY_TAG为开发者在HiLogLabel中定义的内容。
- 日志内容中的url为私有参数不显示具体内容，仅显示<private>。errno为公有参数，显示实际取值503。
## 日志打印实例 
- 1 新建一个工程，在“Project”窗口点击“entry > src > main > java > 应用包名 > slice”，打开工程中的“MainAbilitySlice.java”文件，我们在 MainAbilitySlice 的onStart 方法中打印一条日志
```
package com.example.hms_logdemo.slice;

import com.example.hms_logdemo.HiLogUtils;
import com.example.hms_logdemo.ResourceTable;
import ohos.aafwk.ability.AbilitySlice;
import ohos.aafwk.content.Intent;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;


public class MainAbilitySlice extends AbilitySlice {
    // 定义日志标签
    private static final HiLogLabel LABEL = new HiLogLabel(ohos.hiviewdfx.HiLog.LOG_APP, 0x00201, "HMS_TAG");
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_ability_main);
        HiLog.info(LABEL, "test");
    }

    @Override
    public void onActive() {
        super.onActive();
    }

    @Override
    public void onForeground(Intent intent) {
        super.onForeground(intent);
    }
}
```
- 2运行项目，点击应用界面上的按钮。
- 3 在DevEco Studio的底部，切换到“HiLog”窗口，设置日志的过滤条件。
选择当前的设备及进程，日志级别选择Info，搜索内容设置为“00201” 或者设置搜索内容为"HMS_TAG"。此时窗口仅显示符合条件的日志，效果如图所示。
### 效果如图：
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-583cf7a0d5625b17.png)
## 日志工具类
在实际开发我们会写一个工具类来对官方的log 做一个适当封装 封边我们调用 和打印日志调试 
```
package com.example.hms_logdemo;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

public class HiLogUtils {

    public  static  final String  TAG="HMS_TAG";
    private static final HiLogLabel LABEL = new HiLogLabel(ohos.hiviewdfx.HiLog.LOG_APP, 0x00201, TAG);
    public static  boolean flag=false;

    public  static  void  d(String msg){
        if(!flag){
            HiLog.debug(LABEL, msg);
        }
    }
    public  static  void  e(String msg){
        if(!flag){
            HiLog.error(LABEL, msg);
        }
    }
    public  static  void  w(String msg){
        if(!flag){
            HiLog.warn(LABEL, msg);

        }
    }
    public  static  void i (String msg){
        if(!flag){
            HiLog.info(LABEL, msg);
        }
    }

    public  static  oid  f(String msg){
        if(!flag){
            HiLog.fatal(LABEL, msg);
        }
    }
}
```
## 具体调用
```
package com.example.hms_logdemo.slice;

import com.example.hms_logdemo.HiLogUtils;
import com.example.hms_logdemo.ResourceTable;
import ohos.aafwk.ability.AbilitySlice;
import ohos.aafwk.content.Intent;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

public class MainAbilitySlice extends AbilitySlice {
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_ability_main);
        HiLog.info(LABEL, "test");
        HiLogUtils.i("info");
        HiLogUtils.e("test");
        HiLogUtils.d("debug");
        HiLogUtils.f("fatal");
        HiLogUtils.w("warn");

    }

    @Override
    public void onActive() {
        super.onActive();
    }

    @Override
    public void onForeground(Intent intent) {
        super.onForeground(intent);
    }
}
```
## 输出效果
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-d86d4f918606222d.png)
到此呢 鸿蒙的日志打印使用技巧就讲完了。
## 最后总结 
其实我们在实战中开发的时候，因为在config.json 配置文件中配置键值对通过读取 配置文件中指 来判断是否开启日志。 我们的app在上线的时候的release 应该都是需要关掉我们主动打印的log 我们只需要在config.json中关闭开关即可。这一期的博客知识点相对简单的 同学们应该都能看懂并且学会使用。 官方也有文档讲到 我这边也是做一些整理和加入一些个人见解。 最后希望我的文章能帮助到各位解决问题 ，以后我还会贡献更多有用的代码分享给大家。各位同学如果觉得文章还不错 ，麻烦给关注和star，小弟在这里谢过啦