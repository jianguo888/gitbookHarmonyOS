

## 华为被卡脖子，到底卡的是什么？

> 作者：坚果
>
> 公众号："[大前端之旅](https://mp.weixin.qq.com/s/aJvihD4dzEJyOV3q6_Zeng)"
>
> 华为云享专家，InfoQ签约作者，阿里云专家博主，51CTO博客首席体验官，[开源项目GVA成员之一](https://www.gin-vue-admin.com/)，专注于大前端技术的分享，包括Flutter,小程序,安卓，VUE，JavaScript。

GMS，全称为Google Mobile Service，即谷歌移动服务。GMS是Android系统灵魂所在，是一套谷歌旗下的应用程序和基于云的软件服务，当用户使用谷歌服务的时候，谷歌可以把广告嵌入各种谷歌的服务中，是谷歌的重要收入来源渠道。





问题的关键是，GMS并非安卓开源项目（Android Open Source Project, 即AOSP）的一部分。只有当安卓智能手机制造商，获得了Google的许可之后，才能在其安卓设备上合法安装GMS。华为未来不能得到谷歌许可，意味着未来的华为手机上，将不会内嵌有GMS。

GMS的作用包括使用谷歌核心Apps（即Google应用“全家桶”），包括YouTube，Google Now，Google Play store，Google Play Games，Google Maps（谷歌地图）等，及将基于Google账户的系统数据同步，备份，包括联系人，邮件，文件同步，游戏进度，多人线上联机等。GMS为安卓上的谷歌公司系列应用提供支持

## 后果

缺少 GMS，预计对华为手机的海外市场推广带来致命影响。因为谷歌全家桶APP ，大部分在国内无法使用，且有微信、高德地图等替代品，华为甚至可以推出鸿蒙操作系统取代安卓，因此在国内影响不大。

对于安卓来说它是Android设备配置服务的一项。

## 海外

海外平台严重依赖GMS，当使用登录海外网站的谷歌商店就必须使用谷歌三件套（Google服务框架、Google play商店和Google Play服务）而这些基于GMS来运行，如没有将无法安装海外应用程序，或将被禁止下载，很多app没有GMS甚至根本无法运行，即使安装成功可以运行也会出现“闪退”，或者是出现”已停止服务”。而没有办法正常使用，但是没有的设备依然可以通过一些方式来获取GMS服务。



## 解决方案

1..从安卓开发者的角度看，HMS的接口和提供的服务可以做一些和GMS一样的接口和服务，让软件认为HMS就是GMS

2.gms并不是无敌，只是用户习惯。所以，可以通过转变国外的用户的使用方式来解决

3.华为目前来看对待很多事的解决办法都是自研，你不让我用，那好我自己做一个新的出来替代你让用的，现在麻烦的是华为新做出的东西如何让国外认可，首先得到国内的支持。

除此之外，大家还有什么好的建议与意见吗？欢迎在评论区留言！





## 国内

在国内一般厂商也有GMS但厂商会推出的自己的服务框架，以[小米](https://baike.baidu.com/item/小米/1566828)为例，[小米手机](https://baike.baidu.com/item/小米手机/8096335)上就会有小米服务框架 [1] ，他会把服务器定向到国内为大陆的手机提供服务。

也有厂商内置谷歌和自己研发的框架，这个谷歌框架大部分都是被阉割过的，在手机中会发挥辅助作用，不过，安卓虽然开源，但是修改GMS必须获得谷歌授权不可以随意修改，在使用GMS必须经过谷歌公司授权，中国大陆虽然也是用谷歌系统但是不能访问海外网站。

大陆用户不需要使用GooglePlay来进行下载软件，有各种各样的应用市场取代，不需要经过谷歌的软件审核

## 级别

依据GMS，谷歌对Android手机给予不同程度的授权，把搭载Android系统的手机厂商大致分为三个级别，

1.免费使用Android操作系统，但不内嵌GMS，现代智能手机很少不内嵌这个；

2.内嵌部分GMS服务，但手机不能打上谷歌的商标，在手机内部有一个制造厂商的服务框架；

3.内嵌所有的GMS服务，也可以使用谷歌商标，经过谷歌的审核，并得到授权

在大陆因为GMS无法正常运行所以很多厂商在得到谷歌公司授权以后对GMS作出了修改

在市面上现已通过谷歌认证的手机列表（即play保护机制认证 [3] ）

GMS认证并不是想象的那么容易，谷歌要根据厂商的实力考虑是否认证。