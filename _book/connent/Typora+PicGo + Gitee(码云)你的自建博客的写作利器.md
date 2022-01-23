**Typora+PicGo + Gitee(****码云)你的自建博客的写作利器**



 

## **引子**

前面有出过一片文章教大家如何在服务器上搭建自己的个人博客，今天小编就来带大家为自己配备一套书写个人博客的利器——【Typora+PicGo+Gitee(码云)】

## **温馨提示**（小编使用的是Windows操作系统哦~）

以下的所有配置操作我们可以在服务器中进行，也可以在我们本地电脑上进行，但二者的前提都是需要先安装有Node.js、 Git、Typora这三个软件并部署网站，其中针对Node.js和Git的安装及网站的部署可参考之前这篇文章[从0-1教你利用服务器做属于自己的个人博客 ](https://mp.weixin.qq.com/s/F2RUzdykw0-z9N4wpD-dBw)，里面有详细介绍，对于用来书写博客的Typora软件,小编也在这篇文章末尾提及过，安装步骤也十分简单，地址如下：https://typora.io/#windows （[Typora — a markdown editor, markdown reader.](https://typora.io/#windows)）复制至浏览器打开下载安装即可，大家自行操作！

由于服务器性能有限且操作响应迟缓，小编这里建议大家考虑在本地进行配置，配置完成后也是在本地进行博客的书写，之后将在Typora中书写好的文件保存粘贴至最初在服务器中部署网站的文件夹下去，也是可以在外网通过ip地址访问的，具体文件目录如下图所示，这也正是【Typora+PicGo+Gitee(码云)】这套利器的便捷之处，是不是很酷呢，那就跟着小编一起行动吧！

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image002.jpg)

## **注册登录Gitee** 

使用GitHub时，国内的用户经常遇到的问题是访问速度太慢，有时候还会出现无法连接的情况（原因你懂的）。如果我们希望体验Git飞一般的速度，可以使用国内的Git托管服务——Gitee（gitee.com）。和GitHub相比，Gitee也提供免费的Git仓库。此外，还集成了代码质量检测、项目演示等功能。对于团队协作开发，Gitee还提供了项目管理、代码托管、文档管理的服务，5人以下小团队免费。Gitee的免费版本也提供私有库功能，只是有5人的成员上限。

 

首先我们需要注册登录gitee，对此小编就不多赘述了，地址：[注册 - Gitee.com](https://gitee.com/signup)，入口界面如下：

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image004.png)

## **对Gitee进行相关配置**

 

由于Gitee 提供的是基于SSH协议的Git服务，所以在使用SSH协议访问仓库之前，我们需要先配置好账户/仓库的SSH公钥。在此小编就先带大家来获取我们的SSH公钥，操作如下图所示：我们回到之前部署网站的文件夹下，右键选择“Git Bash Here”选项，打开终端（git）进行运行

 

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image006.jpg)

 

接着我们输入ssh-keygen -t rsa -C“你的邮箱@xxx.com”命令**,**回车运行来生成 ssh公钥**（**指令中的**“C”记得大写）。**三次回车结束后我们输入指令：cat ~/.ssh/id_rsa.pub来查看公钥内容，并将其完整地粘贴出来。具体操作步骤如下图所示：

 

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image008.png)

 

将秘钥粘贴出来后，我们回到登录好的gitee界面，按照下图所示进行操作，在“公钥”一栏中把上一步复制的秘钥内容粘贴进去即可，随后点击“确定”

 

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image010.jpg)

点击“确定”后弹出需要验证的消息框，我们用之前注册时的密码进行验证即可！

 

 

 

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image012.jpg)

 

如下图所示，验证通过

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image014.jpg)

接下来我们需要在gitee上创建一个仓库，首次登录，我们点击下图所示的“立即创建”

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image016.jpg)

或是通过下图这种方式来创建亦可！

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image018.jpg)

接下来这一页面中除图上标注说明外，其余选项同下图配置一致即可！

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image020.jpg)

如下图所示，完成创建

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image022.png)

## **安装PicGo**

地址 https://github.com/Molunerfinn/PicGo/releases/tag/v2.3.0，大家自行下载，可能会比较慢~

如果实在加载不出来试试这个地址[Release 2.3.0 · Molunerfinn/PicGo · GitHub](https://github.com/Molunerfinn/PicGo/releases/tag/v2.3.0)

下拉至页面最底端选中对应软件包下载安装

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image024.jpg)

此时我们可以先新建一个名为“PicGo”的空白文件夹用于PicGo的安装目录，如考虑默认路径则可忽略这一步骤。

 

待下载完成后，在对应的下载目录下找到PicGo的软件包双击运行，接下来的步骤大家参考图示对应操作即可！

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image026.jpg)

如跳出如下弹窗，点击“是”，允许更改即可！

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image028.jpg)

 

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image030.jpg)

选择事先建好的文件夹后点击“安装”

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image032.jpg)

安装中……

 

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image034.jpg)

如下图所示，安装完成

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image036.jpg)

如果大家想要更改已经安装完成的PicGo或有卸载需求,可如下图所示，在之前的安装目录下找到图中所指示的程序，双击即可对PicGo进行卸载

 

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image038.jpg)     

如跳出如下弹窗，点击“是”，允许更改即可，操作也十分简单，小编就不在赘述！

 

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image040.jpg)

## **对PicGo进行相关配置**

在桌面点击PicGo的快捷方式，运行PocGo,如出现类似下图弹窗，由于是首次运行，我们点击“是”即可

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image042.png)

软件界面如下，我们先进入到“插件设置”一栏，对插件进行安装

 

 

 

 

 

 

 

 

 

 

 

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image044.jpg)

安装完成

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image046.jpg)

Tip:如果一切配置完成后还是不能上传图片到Gitee仓库，我们可以考虑回到此处安装其他版本的插件试试~

 

接下来进入“图床设置”一栏

 

 

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image048.jpg)

继续下拉，找到“Gitee图床”一栏，参考下图进行配置，配置完成后依次点击“确定”，“设为默认图床”

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image050.jpg)

属性选项说明：

l url：这里填写码云官方的网址

l owner：填写你的用户名

l repo：填写你的图床仓库名称

l path：图片存储路径

l token：私人令牌，如何获取我们的私人令牌在随后进行示范

l message：不需要填

 

这里再详细说明下url、token两项

l 针对于 url 这一栏，我们可进行如下操作：

点击进入我们之前所创建好的仓库

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image052.jpg)

进入仓库后，图中所示的网址中框选的即为url一栏中所要填的，大家根据自己实际情况对应过去即可！

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image054.jpg)

l 针对 token 一栏，我们按照下图提示进行操作：

 

 

 

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image056.jpg)

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image058.jpg)

点击“提交”后，进行验证

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image060.jpg)

复制我们的私人令牌，粘贴至token 一栏即可！

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image062.jpg)

至此，PicGo的相关配置已经完成，我们需要重启PicGo

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image064.jpg)

接下来我们就对Typora进行对应配置 

## **对Typora进行对应配置**

操作也十分简单，大家参考图示进行！

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image066.jpg)

 

 

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image068.jpg)

至此Typora+PicGo + Gitee(码云)这套博客编写利器我们就已经配备成功了，有了图床跟Gitee仓库的托管，今后我们就能够更加方便的引用图片了，我们可以省下更多的精力专注到个人写作中去，踏入博客编写的快车道……

 

## **使用效果展示**

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image070.jpg)

 

PicGo提示上传成功，Typora中 也正常显示了出来，即表示我们的图片已经 上传到了Gitee仓库中，接下来我们就利用好这套图床利器尽情书写吧!

 

 

 

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image072.jpg)

大家在使用中可能会遇到类似下面这种情况

 

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image073.png)

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image074.jpg)

可能是因为我们上传区没有选择“gitee”

![img](https://luckly007.oss-cn-beijing.aliyuncs.com/image/clip_image076.jpg)

或是因为上传图片较多，PicGo不太支持所致，等待结束后我们在Typora中手动上传或是分批上传即可，虽然有一丝缺憾，但整体来说，这套工具还是能为我们提供很大便利的，随着大家不断地探索、科技不断地发展，我们有充分的理由相信这一丝缺憾终将会得到弥补，加油，码农们！

今天的分享就和大家说再见了。