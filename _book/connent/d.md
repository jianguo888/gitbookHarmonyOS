如何利用阿里云对象存储OSS搭建自己图床写博客

## 1.购买阿里云

[购买阿里云]: https://yq.aliyun.com/error/notfound
 [购买链接](https://yq.aliyun.com/error/notfound)
登录阿里云-->控制台-->对象存储OSS--购买

购买的时候可以选择按月付费一月一元的,也可以年费9元的,40GB作为博客图床基本就够用了~

。我选择的是两年18元的，还是比较划算的

![image-20200524122746933](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9teHN6cy5vc3MtY24tYmVpamluZy5hbGl5dW5jcy5jb20vaW1nL2ltYWdlLTIwMjAwNTI0MTIyNzQ2OTMzLnBuZw?x-oss-process=image/format,png)

## 2.创建BUcket

![image-20200524123333084](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9teHN6cy5vc3MtY24tYmVpamluZy5hbGl5dW5jcy5jb20vaW1nL2ltYWdlLTIwMjAwNTI0MTIzMzMzMDg0LnBuZw?x-oss-process=image/format,png)


在新建bucket中,我们需要修改的不多,首先bucket名称要命名正确,像我这样命名就可以了,区域的话我们买的是全国通用的,所以选什么应该是无所谓的,但最好还是默认的就好了,你不用改,然后我们需要修改的一个地方就是读写权限,读写权限选择'公共读',其他默认就好了,然后确定~

![image-20200524124420018](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9teHN6cy5vc3MtY24tYmVpamluZy5hbGl5dW5jcy5jb20vaW1nL2ltYWdlLTIwMjAwNTI0MTI0NDIwMDE4LnBuZw?x-oss-process=image/format,png)

## 3.下载PicGo

链接：https://pan.baidu.com/s/1EIcqhCj8YzeUuuqbH5GSRw 
提取码：hs3c 

## 4.配置PicGo

![image-20200524124908826](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9teHN6cy5vc3MtY24tYmVpamluZy5hbGl5dW5jcy5jb20vaW1nL2ltYWdlLTIwMjAwNTI0MTI0OTA4ODI2LnBuZw?x-oss-process=image/format,png)

![image-20200506220237888](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9hbGl5dW4tcGljdHVyZS1waWNnby5vc3MtY24tc2hlbnpoZW4uYWxpeXVuY3MuY29tLzIwMjAwNTA2MjIwMjM5LnBuZw?x-oss-process=image/format,png)

### 4.1需要配置的id和秘钥去哪找呢

还需要再设置一下,不要急~ 右上角头像-->访问控制



![img](https://imgconvert.csdnimg.cn/aHR0cDovL21kLmhhbzIudG9wL2ltZy8yMDE5MTAwODE1NTA1NS5wbmc?x-oss-process=image/format,png)

选择用户-->新建用户:



![img](https://imgconvert.csdnimg.cn/aHR0cDovL21kLmhhbzIudG9wL2ltZy8yMDE5MTAwODE1NTE1Ni5wbmc?x-oss-process=image/format,png)



记得勾选编程访问,这样才会生成秘钥,密码登录勾不勾选都可以,我之前是勾选上了~然后确定.

![image-20200524125631416](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9teHN6cy5vc3MtY24tYmVpamluZy5hbGl5dW5jcy5jb20vaW1nL2ltYWdlLTIwMjAwNTI0MTI1NjMxNDE2LnBuZw?x-oss-process=image/format,png)

新建用户成功后弹出:



![img](https://imgconvert.csdnimg.cn/aHR0cDovL21kLmhhbzIudG9wL2ltZy8yMDE5MTAwODE1NTczNi5wbmc?x-oss-process=image/format,png)

![img](https://imgconvert.csdnimg.cn/aHR0cDovL21kLmhhbzIudG9wL2ltZy8yMDE5MTAwODE2MDIxMi5wbmc?x-oss-process=image/format,png)

![img](https://imgconvert.csdnimg.cn/aHR0cDovL21kLmhhbzIudG9wL2ltZy8yMDE5MTAwODE2MTE0MC5wbmc?x-oss-process=image/format,png)

## 5.下载 Typora：

链接：https://pan.baidu.com/s/1N60wavwQF7zyoRZUYbbbKg 
提取码：74ld

*基于markdown格式的主力文本写作平台*

- 安装最新版 Typora

## 6.配置Typora

- 修改图片设置：使用PicGo将图片上传至阿里云图床

验证是否成功连接

![image-20200506220840023](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9hbGl5dW4tcGljdHVyZS1waWNnby5vc3MtY24tc2hlbnpoZW4uYWxpeXVuY3MuY29tLzIwMjAwNTA2MjIwODQ2LnBuZw?x-oss-process=image/format,png)

**设置SERVER：**
注意：PicGo需要用2.3.0的版本，V2.0.7版本的不支持。V2.0.7版本没有Server设置
设置里面打开Server，属性默认即可。

**Typora设置**
在Typora的文件->偏好设置里面，设置插入图品时上传即可

点击上传图片。

至此，所有的配置均已完成。以后就可以很顺利的写博客啦！



**Typora设置**
在Typora的文件->偏好设置里面，设置插入图品时上传即可

点击上传图片。

至此，所有的配置均已完成。以后就可以很顺利的写博客啦！