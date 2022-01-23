## 前言：
各位同学大家好有段时间没有给大家更新文章，具体多久我也不记得，最近在学习鸿蒙开发（第二天学）写了一些小demo 就想着分享给家 今天要讲的是  ListContainer   鸿蒙OS开发中的 列表组件
 ## 准备工作 
1 安装鸿蒙开发环境 大家可以看我之前的文章
华为鸿蒙系统开发初体验 ：https://www.jianshu.com/p/f94c847c7fdc
## 效果图：
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-29b46dbd47efb5c6.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-55b0577edc89eb63.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-dd6abb244db38ce4.png)
## 具体实现：
ListContainer是用来呈现连续、多行数据的组件，包含一系列相同类型的列表项。
####ListContainer的使用方法
1.在layout目录下的xml文件中创建ListContainer。
```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">
    <ListContainer
        ohos:id="$+id:list_container"
        ohos:height="match_parent"
        ohos:width="match_parent"
        ohos:layout_alignment="horizontal_center"/>
</DirectionalLayout>
```
2.在layout目录下新建xml文件（例：item_sample.xml），作为ListContainer的子布局
```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_content"
    ohos:width="match_parent"
    ohos:left_margin="16vp"
    ohos:right_margin="16vp"
    ohos:orientation="vertical">
    <Text
        ohos:id="$+id:item_index"
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:padding="4vp"
        ohos:text="Item0"
        ohos:text_size="20fp"
        ohos:layout_alignment="center"/>
</DirectionalLayout>
```
3.创建SampleItem.java，作为ListContainer的数据包装类。
```
public class SampleItem {
    private String name;
    public SampleItem(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
```
4.ListContainer每一行可以为不同的数据，因此需要适配不同的数据结构，使其都能添加ListContainer上。创建SampleItemProvider.java，继承自RecycleItemProvider。必须重写的方法如下：
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-40871a98f16df053.png)
代码示例如下：
```
package com.example.listview;
import ohos.agp.components.*;
import java.util.List;
/**
 * 创建人：xuqing
 * 创建时间：2020年12月18日13:37:27
 * 类说明： 适配器
 * 
 * 
 * 
 */
public class SampleItemProvider extends RecycleItemProvider {
    private List<SampleItem> list;
    private MainAbility slice;
    public SampleItemProvider(List<SampleItem> list, MainAbility slice) {
        this.list = list;
        this.slice = slice;
    }
    @Override
    public int getCount() {
        return list.size();
    }
    @Override
    public Object getItem(int position) {
        return list.get(position);
    }
    @Override
    public long getItemId(int position) {
        return position;
    }
    @Override
    public Component getComponent(int position, Component convertComponent, ComponentContainer componentContainer) {
        if (convertComponent== null) {
            Component cpt = LayoutScatter.getInstance(slice).parse(ResourceTable.Layout_item_sample,null,false);
            SampleItem sampleItem = list.get(position);
            Text text = (Text) cpt.findComponentById(ResourceTable.Id_item_index);
            text.setText(sampleItem.getName());
            return cpt;
        } else {
            return convertComponent;
        }
    }
}
```
5.在Java代码中添加ListContainer的数据，并适配其数据结构。
```
 @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_ability_main);
        initListContainer();
    }
    private void initListContainer() {
        ListContainer listContainer = (ListContainer) findComponentById(ResourceTable.Id_list_container);
        List<SampleItem> list = getData();
        SampleItemProvider sampleItemProvider = new SampleItemProvider(list,this);
        listContainer.setItemProvider(sampleItemProvider);

        listContainer.setItemClickedListener(new ListContainer.ItemClickedListener() {
            @Override
            public void onItemClicked(ListContainer listContainer, Component component, int i, long l) {
                SampleItem item = (SampleItem) listContainer.getItemProvider().getItem(i);
                new ToastDialog(MainAbility.this)
                        .setText("你点点击是:"+item.getName())
                        // Toast显示在界面中间
                        .setAlignment(LayoutAlignment.BOTTOM)
                        .show();
            }
        });

        listContainer.setItemLongClickedListener(new ListContainer.ItemLongClickedListener() {
            @Override
            public boolean onItemLongClicked(ListContainer listContainer, Component component, int i, long l) {
                SampleItem item = (SampleItem) listContainer.getItemProvider().getItem(i);
                new ToastDialog(MainAbility.this)
                        .setText("长按事件点击:"+item.getName())
                        // Toast显示在界面中间
                        .setAlignment(LayoutAlignment.BOTTOM)
                        .show();
                return false;
            }
        });

    }
  private ArrayList<SampleItem> getData() {
        ArrayList<SampleItem> list = new ArrayList<>();
        for (int i = 0; i <= 10; i++) {
            list.add(new SampleItem("item"+i));
        }
        return list;
    }
```
假数据
```
    private ArrayList<SampleItem> getData() {
        ArrayList<SampleItem> list = new ArrayList<>();
        for (int i = 0; i <= 10; i++) {
            list.add(new SampleItem("item"+i));
        }
        return list;
    }
```
显示效果：
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-29b46dbd47efb5c6.png)
###ListContainer的常用设置
item 子布局 的点击事件
```
   listContainer.setItemClickedListener(new ListContainer.ItemClickedListener() {
            @Override
            public void onItemClicked(ListContainer listContainer, Component component, int i, long l) {
                SampleItem item = (SampleItem) listContainer.getItemProvider().getItem(i);
                new ToastDialog(MainAbility.this)
                        .setText("你点点击是:"+item.getName())
                        // Toast显示在界面中间
                        .setAlignment(LayoutAlignment.BOTTOM)
                        .show();
            }
        });
```
效果如下
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-55b0577edc89eb63.png)
item 子布局 的长按事件
```
  listContainer.setItemLongClickedListener(new ListContainer.ItemLongClickedListener() {
            @Override
            public boolean onItemLongClicked(ListContainer listContainer, Component component, int i, long l) {
                SampleItem item = (SampleItem) listContainer.getItemProvider().getItem(i);
                new ToastDialog(MainAbility.this)
                        .setText("长按事件点击:"+item.getName())
                        // Toast显示在界面中间
                        .setAlignment(LayoutAlignment.BOTTOM)
                        .show();
                return false;
            }
        });
```
效果如下
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-dd6abb244db38ce4.png)
### ListContainer的样式设置
表2 ListContainer的样式设置
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-f6376b473c2758ed.png)
- 设置ListContainer的布局方向：orientation设置为“horizontal”，表示横向布局；orientation设置为“vertical”，表示纵向布局。默认为纵向布局
在xml中设置：
```
<ListContainer
    ...
    ohos:orientation="horizontal"/>
```
在Java代码中设置
```
listContainer.setOrientation(Component.HORIZONTAL);
```
横向滑动效果如图
![0000000000011111111.20201215223231.61258289268550099372337049248122.gif](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-2be4d9c9ddf89c65.gif)
设置ListContainer的开始和结束偏移量
```
listContainer.setContentOffSet(32,16);
```
为了便于观察，分别在子布局和ListContainer布局中添加背景色：

在item_sample.xml的根布局中添加背景色。
```
<DirectionalLayout
    ...
    ohos:background_element="#FAEBD7">
    ...
</DirectionalLayout>
```
在ListContainer布局文件中添加背景色。
```
<ListContainer
    ...
    ohos:background_element="#FFDEAD"/>
```
设置列表容器的开始偏移量为32，结束偏移量为16效果 
![0000000000011111111.20201215223231.80870710422529516647241203148597.gif](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-fb548a2fe2adf11b.gif)
设置回弹效果。
在xml中设置：
```
<ListContainer
    ...
    ohos:rebound_effect="true"/>
```
在Java代码中设置
```
listContainer.setReboundEffect(true);
```
![0000000000011111111.20201215223231.70895069166956864338112265378170.gif](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-6e480c68b1f51d25.gif)
在开启回弹效果后，可以调用setReboundEffectParams()方法调整回弹效果。
```
listContainer.setReboundEffectParams(40,0.6f,20);
```
- 设置着色器颜色。
在xml中设置：
```
<ListContainer
    ...
    ohos:shader_color="#90EE90"/>
```
在Java代码中设置：
```
listContainer.setShaderColor(new Color(Color.getIntColor("#90EE90")));
```
效果如下图
![0000000000011111111.20201215223231.06719808896801673947844947343991.gif](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-57ca6586d3d9f12a.gif)
到此鸿蒙os 列表组件 ListContainer 基础知识就讲完了
## 最后总结
 鸿蒙 os ListContainer 列表组件基本用法和Android原生的lsitview 比较像 但是比起原生安卓的listview 更加强大 原生android 并不直接支持横向滑动 以及直接支持回弹效果 ListContainer  基本用法对于安卓程序员来说比较好上手 看一下api  学习下本就能灵活运用了 以上就是我个人在学习了2天的鸿蒙os开发 ListContainer  基础总结 如果有纰漏和错误的地方希望大家指正  最后希望我的文章能帮助到各位解决问题 ，以后我还会贡献更多有用的代码分享给大家。各位同学如果觉得文章还不错 ，麻烦给关注和star，小弟在这里谢过啦