## 查看本机 ssh 公钥，生成公钥

linux**查看 ssh 公钥方法：**

### 1.通过命令窗口

a. 打开你的 **git bash** 窗口

b. 进入 **.ssh** 目录：**cd ~/.ssh**

c. 找到 **id_rsa.pub** 文件：**ls**

d. 查看公钥：**cat id_rsa.pub** 或者 **vim id_rsa.pub**

如图：



mac 系统开始就已经为我们安装了ssh 如果没有安装，首先安装

打开终端：$ ssh -v

查看ssh版本