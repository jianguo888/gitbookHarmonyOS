最近有小伙伴在群里买了云服务器

##  问题引出

大哥，忙吗？为什么连不上，

![image-20211103144813028](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20211103144813028.png)

问清楚服务器类型之后就开始帮助他

![image-20211103144841277](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20211103144841277.png)

##  开始正文

先给大家看一下连接成功是啥样

![image-20211103144736579](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20211103144736579.png)

开始正文

##  远程连接Windows服务器

您可以通过

- 轻量应用服务器管理控制台
- 本地Windows系统自带的远程桌面连接工具连接Windows轻量应用服务器，

本文为您提供具体的操作说明。

## 前提条件

- 待连接的Windows轻量应用服务器的状态必须为运行中。

- 轻量应用服务器默认未设置远程连接密码以及服务器密码，因此，请确保您已为服务器设置了远程连接密码以及服务器密码。具体操作，请参见：

  ## **设置服务器密码**对话框，输入新的服务器管理密码并确认密码，然后单击**确定**。

1. 请妥善保管您自定义的密码信息。

2. 在**立即重启服务器**对话框，选择**是的，请立即重启服务器**，然后单击**确定**。

   重置密码后，您必须重启服务器使新的服务器管理密码生效。

   **注意** 如果您当前的业务不支持立即重启服务器，请选择**不，稍后我将自行重启**并单击**确定**，然后在您的业务低峰时间段自行重启服务器。

## 背景信息

轻量应用服务器的管理控制台提供了方便快捷的远程连接方式。具体操作，请参见下面的通过管理控制台远程连接Windows服务器



您也可以在本地Windows环境中，通过Windows自带的远程桌面连接工具连接Windows服务器。具体操作，请参见在本地Windows环境中远程连接Windows服务器。



我今天给大家教的是在本地Windows环境中远程连接Windows服务器

## 在本地Windows环境中远程连接Windows服务器

### 1.通过以下任一方式，在本地Windows系统中打开远程桌面连接工具。

- 在Windows桌面任务栏，选择***\*开始\** > \**运行\****，然后输入mstsc，单击**确定**。
- 在Windows桌面，按下Win+R组合键，然后输入mstsc，单击**确定**。

![213](https://luckly007.oss-cn-beijing.aliyuncs.com/image/p240461.png)

### 2.在**远程桌面连接**对话框，单击**显示选项**，

![image-20211103145237114](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20211103145237114.png)

### 3.然后配置Windows轻量应用服务器的信息。

必须配置项说明如下所示，其他配置项请您根据业务需求自行配置。

![image-20211103145349666](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20211103145349666.png)

- 计算机：待连接的Windows服务器的公网IP。
- 用户名：Windows服务器默认用户名为`Administrator`。

### 4.单击**连接**，然后输入Windows服务器默认用户的密码，单击**确定**。

![image-20211103145455196](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20211103145455196.png)

- 如果您忘记密码，请重置密码后再次尝试远程连接。具体操作，请查看我的下篇文章
- 如果远程连接时出现身份验证错误，您需要手动排查解决。具体操作，请查看我的远程连接Windows实例时出现身份验证错误的处理方法

### 5.第一次远程连接Windows服务器时将提示安全证书存在问题，选中**不再询问我是否连接到此计算机**，然后单击**是**。

![image-20211103145533937](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20211103145533937.png)

### 6.成功远程连接到Windows服务器后，示例界面如下图所示：

![image-20211103144736579](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20211103144736579.png)



今天粉丝的忙就帮到这儿，问题也解决了，

大家有类似的问题，可以加我好友，或者关注我公众号。

![image-20211103153258851](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20211103153258851.png)

## 通过管理控制台远程连接Windows服务器

1. 登录[轻量应用服务器管理控制台](https://swas.console.aliyun.com/)。

2. 在左侧导航栏，单击**服务器列表**。

3. 通过以下任一方式远程连接Windows服务器。

   - 在**服务器列表**页面，通过单击服务器卡片中的![远程连接图标](https://luckly007.oss-cn-beijing.aliyuncs.com/image/p254822.png)图标远程连接服务器。![windows远程连接zh](https://luckly007.oss-cn-beijing.aliyuncs.com/image/p284624.png)
   - 在**服务器列表**页面，单击服务器卡片，进入服务器的**概览**页面，然后在页面右上角单击**远程连接**。![windows概览](https://luckly007.oss-cn-beijing.aliyuncs.com/image/p284627.png)
   - 在**服务器列表**页面，单击服务器卡片，进入服务器的**概览**页面，然后在左侧导航栏，选择***\*服务器运维\** > \**远程连接\****，单击**远程连接**。![windows概览远程连接](https://luckly007.oss-cn-beijing.aliyuncs.com/image/p284628.png)

4. 在**输入远程连接密码**对话框，输入服务器的远程连接密码，然后单击**连接**。

5. 从**发送远程命令**列表中，选择**CTRL+ALT+DELETE**。

   如果Windows服务器没有锁定桌面，请跳过本步骤。![ctrl+alt+delete](https://luckly007.oss-cn-beijing.aliyuncs.com/image/p284636.png)

6. 在Windows的登录界面，输入服务器密码，然后按下Enter键。

   ![win2012登录界面](https://luckly007.oss-cn-beijing.aliyuncs.com/image/p284637.png)


