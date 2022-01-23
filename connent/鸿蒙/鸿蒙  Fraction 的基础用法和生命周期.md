## 2前言
最近又去鸿蒙开发社区看了一看 有get一些新知识点 我觉得有必要给大家分享下， 安卓有fragment组件，由于当时我以为鸿蒙并没有类似于fragment的组件 。后来发现我错了，原来鸿蒙早就提供了类似于fragment的组件，那就是**[Fraction](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.harmonyos.com%2Fcn%2Fdocs%2Fdocumentation%2Fdoc-references%2Ffraction-0000001059908801)**。这次就向大家介绍Fraction的使用以及Fraction的生命周期
可能有人会问，为什么不使用AbilitySlice？一个AbilitySlice跳转到另一个AbilitySlice会发生页面跳转，而在点击底部导航栏的时候，我们并不希望发生页面跳转。

## 效果图
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-1bf7383cbca65c4d.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-7c32a7d1388f01b7.png)

##  基本概念 
### Fraction

字面意思是小部分，Fraction可以作为UI的一部分放在Ability或者AbilitySlice中，不能单独使用。Fraction的生命周期状态取决于它的容器。如果容器被销毁，其中的所有部分也将被销毁。可以Fraction使用定义各种布局，以丰富应用程序的用户界面。

### FractionAbility

要想使用Fraction，必须让Ability继承FractionAbility

### FractionManager

提供管理Fraction生命周期的方法。

### FractionScheduler
提供执行Fraction事务的方法

## 具体实现
### 1 自己的Ability 继承  FractionAbility

```
package com.example.fractiondemo;
import com.example.fractiondemo.slice.MainAbilitySlice;
import ohos.aafwk.ability.fraction.FractionAbility;
import ohos.aafwk.content.Intent;

public class MainAbility extends FractionAbility {
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setMainRoute(MainAbilitySlice.class.getName());
    }
}
```
Ability  布局文件
```
<?xml version="1.0" encoding="utf-8"?>
<DependentLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">

    <StackLayout
        ohos:id="$+id:mainstack"
        ohos:height="match_parent"
        ohos:width="match_parent"
        ohos:above="$id:company_page_dl"
        >
    </StackLayout>


    <DirectionalLayout
        ohos:id="$+id:company_page_dl"
        ohos:height="50vp"
        ohos:width="match_parent"
        ohos:orientation="horizontal"
        ohos:align_parent_bottom="true"
        >

        <Button
            ohos:id="$+id:main_home_btn"
            ohos:width="0vp"
            ohos:height="match_parent"
            ohos:weight="1"
            ohos:text="主页"
            ohos:text_size="50"
            >
        </Button>

        <Button
            ohos:id="$+id:main_my_btn"
            ohos:width="0vp"
            ohos:height="match_parent"
            ohos:weight="1"
            ohos:text="我的"
            ohos:text_size="50"
            >
        </Button>

    </DirectionalLayout>
</DependentLayout>
```
- ##### 布局效果

  

  ![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-13b8a948f5f4e210.png)

  底部一个线性布局嵌套2个button 然后上面是一个  StackLayout 到时候用来装载我们的Fraction 

- #### 给Fraction创建布局文件
```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:orientation="vertical"
    ohos:width="match_parent">

    <Text
        ohos:height="match_content"
        ohos:id="$+id:text_helloworld"
        ohos:layout_alignment="horizontal_center"
        ohos:text="主页"
        ohos:text_size="50"
        ohos:width="match_content"
        ohos:top_margin="300vp"
        />
</DirectionalLayout>
```
#### 效果
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-2ed947145f868128.png)
这里有两个 Fraction 布局差不多我就不展开讲就拿一个举例子
- ##### 创建HomeFraction继承Fraction
在onComponentAttached方法里面将HoneFraction的布局文件转换成组件对象，最后将组件对象返回。
我们刚刚在AbilitySlice的布局文件中添加了一个栈布局，onComponentAttached方法返回的组件对象会被添加这个栈布局里面。
```
package com.example.fractiondemo.fraction;

import com.example.fractiondemo.ResourceTable;
import ohos.aafwk.ability.fraction.Fraction;
import ohos.aafwk.content.Intent;
import ohos.agp.components.Component;
import ohos.agp.components.ComponentContainer;
import ohos.agp.components.LayoutScatter;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

public class HomeFraction extends Fraction {
    private static final String TAG="HomeFraction";
    private int MY_MODULE=0x00201;
    private   final HiLogLabel label = new HiLogLabel(HiLog.LOG_APP, MY_MODULE, TAG); //
    @Override
    protected Component onComponentAttached(LayoutScatter scatter, ComponentContainer container,
                                            Intent intent) {
        System.out.println("onComponentAttached(生命周期方法");
        Component component = scatter.parse(ResourceTable.Layout_fraction_home, container, false);
        return component;
    }
    @Override
    protected void onStart(Intent intent) {
        super.onStart(intent);
        System.out.println("onStart生命周期方法");
    }
    @Override
    protected void onActive() {
        super.onActive();
        System.out.println("onActive生命周期方法");
    }
    @Override
    protected void onInactive() {
        super.onInactive();
        System.out.println("onInactive生命周期方法");
    }
    @Override
    protected void onBackground() {
        super.onBackground();
        System.out.println("onBackground生命周期方法");
    }
    @Override
    protected void onForeground(Intent intent) {
        super.onForeground(intent);
        System.out.println("onForeground生命周期方法");
    }
    @Override
    protected void onStop() {
        super.onStop();
        System.out.println("onStop生命周期方法");
    }

    @Override
    protected void onComponentDetach() {
        super.onComponentDetach();
        System.out.println("onComponentDetach生命周期方法");
    }
}

```
- #### 将Fraction  添加到Ability 中并绑定
在AbilitySlice里面调用getAbility方法，将其强转为FractionAbility，然后调用getFractionManager方法得到FractionManager对象，再调用startFractionScheduler方法开启事务，调用add方法添加fraction，add方法第一个参数就是我们在布局文件中添加的栈布局的id，第二个参数就是HomeFraction对象，第三个参数就是给HomeFraction设置一个标签，后续可以FractionManager的getFractionByTag方法，来查找我们已经创建好的HomeFraction对象，getFractionByTag方法的参数就是我们在add方法里面给HoneFraction设置的标签。最后提交事务。
这边提供了 添加 替换 和删除的3个方法  
#### 添加
```
 ((FractionAbility)getAbility()).getFractionManager()
                .startFractionScheduler()
                .add(ResourceTable.Id_stack, new HoneFraction())
                .submit();
```
#### 替换

```
 ((FractionAbility)getAbility()).getFractionManager()
                .startFractionScheduler()
                .replace(ResourceTable.Id_stack, new HoneFraction())
                .submit();
```
### 删除 

```
 ((FractionAbility)getAbility()).getFractionManager()
                .startFractionScheduler()
                .remove(new HoneFraction())
                .submit();
```
多个页面切换 我们可以先默认将第一个页面add进来后 其他页面调用  replace 来实现切换的效果 或者你调用 remove 再调用add 一样能达到Fraction  切换的效果  
这里简单演示一下基本Fraction  切换  
```
package com.example.fractiondemo.slice;
import com.example.fractiondemo.fraction.HomeFraction;
import com.example.fractiondemo.ResourceTable;
import com.example.fractiondemo.fraction.MyFraction;
import ohos.aafwk.ability.AbilitySlice;
import ohos.aafwk.ability.fraction.FractionAbility;
import ohos.aafwk.content.Intent;
import ohos.agp.components.Button;
import ohos.agp.components.Component;
import ohos.global.resource.Resource;
public class MainAbilitySlice extends AbilitySlice  implements Component.ClickedListener {
    private Button homebtn,mybtn;
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_ability_main);
        homebtn= (Button) findComponentById(ResourceTable.Id_main_home_btn);
        mybtn= (Button) findComponentById(ResourceTable.Id_main_my_btn);
        homebtn.setClickedListener(this);
        mybtn.setClickedListener(this);
        addHomeFraction();
    }
     private void  addHomeFraction(){
         ((FractionAbility)getAbility()).getFractionManager()
                 .startFractionScheduler()
                 .add(ResourceTable.Id_mainstack, new HomeFraction())
                 .submit();
     }


    private void  replaceHomeFraction(){
        ((FractionAbility)getAbility()).getFractionManager()
                .startFractionScheduler()
                .replace(ResourceTable.Id_mainstack, new HomeFraction())
                .submit();
    }
    private void  replaceMyFraction(){
        ((FractionAbility)getAbility()).getFractionManager()
                .startFractionScheduler()
                .replace(ResourceTable.Id_mainstack, new MyFraction())
                .submit();
    }
    @Override
    public void onActive() {
        super.onActive();
    }
    @Override
    public void onForeground(Intent intent) {
        super.onForeground(intent);
    }


    @Override
    public void onClick(Component component) {
        switch (component.getId()){
            case ResourceTable.Id_main_home_btn:
                replaceHomeFraction();
                break;
            case ResourceTable.Id_main_my_btn:
                replaceMyFraction();
                break;
            default:
                break;

        }
    }
}
```
#### 效果如图
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-1bf7383cbca65c4d.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-7c32a7d1388f01b7.png)
## Fraction  生命周期 
Fraction生命周期主要涉及到八个生命周期方法，分别是onComponentAttached、onStart、onActive、onInactive、onBackground、onForeground、onStop、onComponentDetach

- ##### 启动fraction
依次调用onComponentAttached、onStart、onActive
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-58733033b406c543.png)
- ##### 按下home键进入后台
依次调用onInactive、onBackground
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-70c722b1aee3579e.png)
- ##### 重新回到前台
依次调用onForeground、onActive
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-c8a8fedd67a507e1.png)
-  #####退出fraction
依次调用onInactive、onBackground、onStop、onComponentDetach
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-aa7b2f783316391c.png)
大家牢记fraction的生命周期
到此鸿蒙的 Fraction 的基础用法和生命周期 就讲完了。
## 最后总结:
鸿蒙里面提供的 Fraction （字面意思小部分）用法和安卓里面的fragment(碎片页)用法差不多 都是不能单独显示要依附于视图 。生命周期也比较类似  Fraction解决了我们常用app开发中多个tab切换的问题 在这里我为之前的文章里面的描述错误给华为和各位同学道歉。当然 Fraction 也有缺陷  在实际开发中，我们可能需要让Fraction嵌套Fraction，目前鸿蒙还不支持Fraction嵌套Fraction。我想信华为会尽快解决这个问题 我们也希望华为越来越好 王者归来   最后希望我的文章能帮助到各位解决问题 ，以后我还会贡献更多有用的代码分享给大家。各位同学如果觉得文章还不错 ，麻烦给关注和star，小弟在这里谢过啦!