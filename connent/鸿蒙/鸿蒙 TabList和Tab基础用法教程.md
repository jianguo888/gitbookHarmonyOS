## 前言：
各位同学大家好，有段时间没有给大家更新文章了 具体多久我也不记得，最近在学习鸿蒙开发（第三天学）写了一些小demo  就想着分享给家 今天要讲的是TabList和Tab  鸿蒙OS开发中的 顶部导航控件
## 准备工作
1 安装鸿蒙开发环境 大家可以看我之前的文章
华为鸿蒙系统开发初体验 ：[https://www.jianshu.com/p/f94c847c7fdc](https://www.jianshu.com/p/f94c847c7fdc)
效果图：
![QQ截图20201220170606.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-f073b599c252c914.png)

![QQ截图20201220170627.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-b45ec22c8a265d3c.png)

![QQ截图20201220170635.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-71483183f6398654.png)
## 具体实现：
Tablist可以实现多个页签栏的切换，Tab为某个页签。子页签通常放在内容区上方，展示不同的分类。页签名称应该简洁明了，清晰描述分类的内容。
- xml中创建TabList
```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">

    <TabList
        ohos:id="$+id:tab_list"
        ohos:top_margin="10vp"
        ohos:tab_margin="12vp"
        ohos:tab_length="60vp"
        ohos:text_size="15fp"
        ohos:height="36vp"
        ohos:width="match_parent"
        ohos:layout_alignment="center"
        ohos:orientation="horizontal"
        ohos:text_alignment="center"
        ohos:normal_text_color="#999999"
        ohos:selected_text_color="#FF0000"
        ohos:selected_tab_indicator_color="#FF0000"
        ohos:selected_tab_indicator_height="2vp"
        />
</DirectionalLayout>
```
- 设置默认状态和选中状态的字体颜色和indicator的颜色
```
<TabList
       ohos:normal_text_color="#999999"
        ohos:selected_text_color="#FF0000"
        ohos:selected_tab_indicator_color="#FF0000"
        ohos:selected_tab_indicator_height="2vp">
```
- TabList中添加Tab
```
     for (int i = 0; i < str.length; i++) {
                TabList.Tab tab = tabList.new Tab(getContext());
                tab.setText(str[i]);
                tabList.addTab(tab);
            }
```
- 假数据
```
    private  String[] str={"image","Video","Audio","HuaweiShare"};
```
- 在代码中设置Tab的布局
```
tabList.setTabLength(60); // 设置Tab的宽度
tabList.setTabMargin(26); // 设置两个Tab之间的间距
```
展示效果图：
![QQ截图20201220170606.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-74190a48e33ea806.png)
- 设置FixedMode
默认为false，该模式下TabList的总宽度是各Tab宽度的总和，若固定了TabList的宽度，当超出可视区域，则可以通过滑动TabList来显示。如果设置为true，TabList的总宽度将与可视区域相同，各个Tab的宽度也会根据TabList的宽度而平均分配，该模式适用于Tab较少的情况。
```
tabList.setFixedMode(true);
```
展示效果图：
![0000000000011111111.20201215223228.44271791555364360576103044288789.gif](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-df92d06fa492ca07.gif)

- 在某个位置新增Tab
```
// 本示例中在"图片"和"视频"之间的页签中新增"新闻"页签
TabList.Tab tab = createTab("News");
tabList.addTab(tab, 1); // 1表示位置
```
定义一个创建Tab并设置Tab 的方法
```
// 创建Tab并设置Tab
private TabList.Tab createTab(String name) {
    TabList.Tab tab = tabList.new Tab(this);
    tab.setText(name);
    tab.setName(name);
    tab.setMinWidth(64);
    tab.setPadding(12, 0, 12, 0);
    return tab;
}
```
 - 在某个位置新增Tab展示效果图
![0000000000011111111.20201215223228.96361778606775743180227732812189.gif](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-f19033c1244109fd.gif)
-  响应焦点变化事件监听
```
   tabList.addTabSelectedListener(new TabList.TabSelectedListener() {
                @Override
                public void onSelected(TabList.Tab tab) {
                    // 当某个Tab从未选中状态变为选中状态时的回调

                    new ToastDialog(MainAbility.this)
                            .setText("从未选中状态变为选中状态时的回调")
                            .setAlignment(LayoutAlignment.CENTER)
                            .show();
                }

                @Override
                public void onUnselected(TabList.Tab tab) {
                    // 当某个Tab从选中状态变为未选中状态时的回调
                    new ToastDialog(MainAbility.this)
                            .setText("从选中状态变为未选中状态时的回调")
                            .setAlignment(LayoutAlignment.CENTER)
                            .show();
                }

                @Override
                public void onReselected(TabList.Tab tab) {
                    // 当某个Tab已处于选中状态，再次被点击时的状态回调
                    new ToastDialog(MainAbility.this)
                            .setText("已处于选中状态，再次被点击时的状态回调")
                            .setAlignment(LayoutAlignment.CENTER)
                            .show();
                }
            });

```
   - 响应监听事件效果图：
![QQ截图20201220170627.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-a4c543f442807258.png)

![QQ截图20201220170635.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-ad67184f01f95630.png)
##  TabList常用接口
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-4fb7c132d9897363.png)
## Tab的使用
- 设置Tab属性
```
tab.setMinWidth(64);
tab.setPadding(12, 0, 12, 0);
```
- 选中某个Tab 
```
tab.select();
```
- 获取Tab在TabList中的位置索引 
```
tab.getPosition();
```
- 完整java代码：
```
package com.example.tablist;
import com.example.tablist.slice.MainAbilitySlice;
import ohos.aafwk.ability.Ability;
import ohos.aafwk.content.Intent;
import ohos.agp.components.TabList;
import ohos.agp.utils.LayoutAlignment;
import ohos.agp.window.dialog.ToastDialog;

/**
 *
 * 创建人：xuqing
 * 创建时间：2020年12月20日15:33:53
 * 类说明：  tablist 示例
 *
 *
 */
public class MainAbility extends Ability {
    private  String[] str={"image","Video","Audio","HuaweiShare"};
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_ability_main);
        initview();
    }

    private void initview() {
        TabList tabList = (TabList) findComponentById(ResourceTable.Id_tab_list);
        if(tabList!=null){
            for (int i = 0; i < str.length; i++) {
                TabList.Tab tab = tabList.new Tab(getContext());
                tab.setText(str[i]);
                tabList.addTab(tab);
            }
           /* tabList.setTabLength(60); // 设置Tab的宽度
            tabList.setTabMargin(26); // 设置两个Tab之间的间距*/
            tabList.addTabSelectedListener(new TabList.TabSelectedListener() {
                @Override
                public void onSelected(TabList.Tab tab) {
                    // 当某个Tab从未选中状态变为选中状态时的回调

                    new ToastDialog(MainAbility.this)
                            .setText("从未选中状态变为选中状态时的回调")
                            .setAlignment(LayoutAlignment.CENTER)
                            .show();
                }
                @Override
                public void onUnselected(TabList.Tab tab) {
                    // 当某个Tab从选中状态变为未选中状态时的回调
                    new ToastDialog(MainAbility.this)
                            .setText("从选中状态变为未选中状态时的回调")
                            .setAlignment(LayoutAlignment.CENTER)
                            .show();
                }
                @Override
                public void onReselected(TabList.Tab tab) {
                    // 当某个Tab已处于选中状态，再次被点击时的状态回调
                    new ToastDialog(MainAbility.this)
                            .setText("已处于选中状态，再次被点击时的状态回调")
                            .setAlignment(LayoutAlignment.CENTER)
                            .show();
                }
            });
        }
    }
}
```
 到此我们的鸿蒙os中    TabList和Tab  基础用法就讲完了  
## 最后总结：
我们看完 鸿蒙 TabList和Tab基础用法后感觉和安卓里面的  TabLayout以及flutter 中tabbar 很类似 是用来处理APP UI布局中顶部导航 多个标签页切换和滑动效果， 总得来说鸿蒙 TabList和Tab  功能还算齐全 
各种事件的监听方法 和官方暴露给我们调用的方法都是很完备 可以让我们轻松的实现各种复杂的顶部导航效果，由于篇幅有限 我这边就不展开细讲 有兴趣的同学可以自己私下多研究 可以完成其他更炫的交互效果， 以上就是我个人在学习了3天的鸿蒙os开发 对于鸿蒙TabList和Tab 基础用法的总结 如果有纰漏和错误的地方希望大家指正 最后希望我的文章能帮助到各位解决问题 ，以后我还会贡献更多有用的代码分享给大家。各位同学如果觉得文章还不错 ，麻烦给关注和star，小弟在这里谢过啦
## 项目地址：
码云 ：[https://gitee.com/qiuyu123/hm_tablist](https://gitee.com/qiuyu123/hm_tablist)