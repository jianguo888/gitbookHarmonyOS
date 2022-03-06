###  ETS开发FAQ

#### 1. 分布式能力调用不正常

- 网络不要在过于复杂的网络，推荐手机开无密码热点（方便连接）
- 热点和手机不要距离太远
- 可使用网线连接，并设置不同的IP测试接口调用是否正确，并ping下对方是否连接上

```
hdc_std shell ifconfig eth0 192.168.1.111 netmask 255.255.255.0
hdc_std shell ifconfig eth0 192.168.1.222 netmask 255.255.255.0
```

#### 2. 应用安装

- ##### 使用hdc 覆盖安装，并且hap包路径使用绝对路径

  ```
  hdc_std install -r path  //path为绝对路径
  ```

安装推荐如下脚本, 将路径修改，并保持为bat文件即可

```
hdc_std kill && hdc_std install -r  D:\DevEcoStudioProjects\BombGame\build\outputs\hap\debug\phone\entry-debug-standard-ark-signed.hap

pause
```

#### 3. hdc_std 无反应

大概率是hdc_std被占用了，将hdc_std 杀死重启即可

```
hdc_std kill // 或者 hdc_std start -r
```

#### 4.如何查看应用日志

```
hdc_std shell
hilog | grep BombGame  // BombGame为过滤词
```

#### 5. 如何针对某一组件调试

使用@Preview 装饰器可以在previewer里只显示这个组件，并且安装在板子上也是显示该组件，可以快速看到组件效果。

#### 6. 自定义dialog回调中无法访问回调中的this

[自定义dialog文档](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/reference/arkui-ts/ts-methods-custom-dialog-box.md)

```
@entry新建弹窗对象
dialogController: CustomDialogController = new CustomDialogController({
    builder: CustomDialogExample({ cancel: this.onCancel, confirm: this.onAccept }),
    cancel: this.existApp,
    autoCancel: true
  })
```

这里onCancel和onAccept中无法访问到@entry的回调是因为**js作用域问题**，所以使用箭头函数改变作用域即可

```
dialogController: CustomDialogController = new CustomDialogController({
    builder: CustomDialogExample({ cancel: ()=>this.onCancel(), confirm: ()=>this.onAccept() }),
    cancel: this.existApp,
    autoCancel: true
  })
```

#### 7. @State 出现无法响应更新到视图的情况

通常该情况@State 装饰的为数组对象,如下格式

```
[
	{...},
	{...}
]
```

因为arkUI响应式只能监听到第一层的数据变化和数组长度变化，无法监听到第二层对象的某个属性变化，所以我需要动态显示某个对象下的属性变化，则需要给整个对象重新赋值，对象浅拷贝可用Object.assign

解决方法可参考如下办法（修改list第一项对象的id属性，并在视图也能动态更新）

```
let obj = Object.assign( this.list[0],{})
obj.id = 1
this.list[0] = obj
```

如果仍然不行，可通过强制让数组长度有所变化来实现强制更新

#### 8. previewer预览器3516配置

- 点击previewer->Enable profile Manager ->右上角加号 添加自定义预览器
- width:500 height:850 DPI:180 ，可模拟3516上的情况（以上数据仅供参考，有更准确的欢迎更新）

#### 9. backgroundImage 用不了

OH3.0 LTS,backgroundImage 可以获取网络图片，但是无法正常获取本地resource图片（需要resource文件夹复制到ability目录下），所以推荐用stack来堆叠，这样可以做到同样的效果且代码较为清晰

#### 10. 应用卡顿

由于3516上没有GPU，渲染能力和计算较差导致的，以下为优化方向

- 使用top查看设备性能使用情况

  ```
  hdc_std shell
  top
  ```

- 使用定时器setInterval的间隔时间需要长一点，特别是配合动画使用时

- 如果gif动图，请尽量压缩大小

- 避免多次远端重复拉起应用

#### 11.文本乱码 或者不显示

- prompt 3.0LTS不支持中文，导致文字不显示（master已支持）
- console和分布式数据库不支持中文

#### 13. 如何获取包名

```
import featureAbility from '@ohos.ability.featureAbility';
featureAbility.getContext().getBundleName().then(bundleName=>{
	this.bundleName = bundleName // bundleName即为包名
})
```

![动画](https://luckly007.oss-cn-beijing.aliyuncs.com/images/%E5%8A%A8%E7%94%BB.gif)