## 前言 ：
各位同学大家好 有断时间没有给大家更新文章了具体多久我也记得了。最近还在学习鸿蒙开发， 学到了PageSlider  滑动组件类似安卓里面 viewpager 可以实现 屏幕左右滑动的效果 ，那么废话不多说我们正式开始 
## 准备工作 
1 安装鸿蒙开发环境 大家可以看我之前的文章

## 效果图  
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-186d85ac19e152ca.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-da69dd9971481ac0.png)
## 具体实现  
MainAbility 布局文件
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-e30df0442a1d85bc.png)
```
<?xml version="1.0" encoding="UTF-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:background_element="blue"
    ohos:orientation="vertical">

    <PageSlider
        ohos:id="$+id:pager_slider"
        ohos:height="0vp"
        ohos:width="match_parent"
        ohos:background_element="#ffffff"
        ohos:weight="1"/>

    <RadioContainer
        ohos:id="$+id:radio_container"
        ohos:height="60vp"
        ohos:width="match_parent"
        ohos:alignment="horizontal_center"
        ohos:orientation="horizontal">

        <RadioButton
            ohos:height="match_parent"
            ohos:width="match_content"
            ohos:text_size="20fp"
            />

        <RadioButton
            ohos:height="match_parent"
            ohos:width="match_content"
            ohos:text_size="20fp"
            />

    </RadioContainer>
</DirectionalLayout>
```
布局这边是底部写了一个RadioContainer 来处理底部的小圆圈显示影藏效果  上面我们写了一个 PageSlider 组件  
##  具体逻辑代码 
- ####初始化控件
```
 radioContainer = (RadioContainer) findComponentById(ResourceTable.Id_radio_container);
        ((RadioButton) radioContainer.getComponentAt(0)).setChecked(true);
        pageSlider = (PageSlider) findComponentById(ResourceTable.Id_pager_slider);
        LayoutScatter layoutScatter = LayoutScatter.getInstance(getContext());
        DependentLayout dependentLayout1 = (DependentLayout) layoutScatter.parse(ResourceTable.Layout_pageSlider1, null, false);
        DependentLayout dependentLayout2 = (DependentLayout) layoutScatter.parse(ResourceTable.Layout_pageSlider2, null, false);
```
 - ####将view装入数组
```
  pageviews = new ArrayList<Component>();
  pageviews.add(dependentLayout1);
 pageviews.add(dependentLayout2);
```

-  #### 绑定适配器
```
pageSlider.setProvider(new PageSliderProvider() {
            @Override
            //获取当前窗体界面数
            public int getCount() {
                HiLog.info(LOG_LABEL, "--------getCount");
                return pageviews.size();
            }

            //返回一个对象，这个对象表明了PagerAdapter适配器选择哪个对象放在当前的pageviews中
            @Override
            public Object createPageInContainer(ComponentContainer componentContainer, int i) {
                componentContainer.addComponent(pageviews.get(i));
                HiLog.info(LOG_LABEL, "--------createPageInContainer");
                return pageviews.get(i);
            }

            //是从ViewGroup中移出当前View
            @Override
            public void destroyPageFromContainer(ComponentContainer componentContainer, int i, Object o) {
                ((PageSlider) componentContainer).removeComponent(pageviews.get(i));
                HiLog.info(LOG_LABEL, "--------destroyPageFromContainer");
            }

            //断是否由对象生成界面
            @Override
            public boolean isPageMatchToObject(Component component, Object o) {
                HiLog.info(LOG_LABEL, "--------isPageMatchToObject");
                return component == o;
            }
        });
```
  - #### pageSlider滑动监听事件 
```
   pageSlider.addPageChangedListener(new PageSlider.PageChangedListener() {
            @Override
            public void onPageSliding(int i, float v, int i1) {
                //v:指示页面的位置偏移量。值的范围是(0,1]。
                // 0表示正在显示目标页面。
                //i1:指示显示页面的位置偏移像素数。
            }

            @Override
            public void onPageSlideStateChanged(int i) {
                HiLog.info(LOG_LABEL, "--------onPageSlideStateChanged");
            }

            @Override
            public void onPageChosen(int i) {
                ((RadioButton) radioContainer.getComponentAt(i)).setChecked(true);
            }
        });
```
 - #### 完整代码

```
package com.example.pagesliderdemo.slice;
import com.example.pagesliderdemo.ResourceTable;
import ohos.aafwk.ability.AbilitySlice;
import ohos.aafwk.content.Intent;
import ohos.agp.components.*;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;
import java.util.ArrayList;
import java.util.List;

public class MainAbilitySlice extends AbilitySlice {
    static final HiLogLabel LOG_LABEL = new HiLogLabel(HiLog.LOG_APP, 0x00002, "MainAbilitySlice");

    private RadioContainer radioContainer;
    private PageSlider pageSlider;
    private List<Component> pageviews;

    @Override
    public void onStart(Intent intent) {
        HiLog.info(LOG_LABEL, "--------onStart2");
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_ability_main);
        radioContainer = (RadioContainer) findComponentById(ResourceTable.Id_radio_container);
        ((RadioButton) radioContainer.getComponentAt(0)).setChecked(true);

        pageSlider = (PageSlider) findComponentById(ResourceTable.Id_pager_slider);
        LayoutScatter layoutScatter = LayoutScatter.getInstance(getContext());
        DependentLayout dependentLayout1 = (DependentLayout) layoutScatter.parse(ResourceTable.Layout_pageSlider1, null, false);
        DependentLayout dependentLayout2 = (DependentLayout) layoutScatter.parse(ResourceTable.Layout_pageSlider2, null, false);
        //将view装入数组
        pageviews = new ArrayList<Component>();
        pageviews.add(dependentLayout1);
        pageviews.add(dependentLayout2);
        //绑定适配器
        pageSlider.setProvider(new PageSliderProvider() {
            @Override
            //获取当前窗体界面数
            public int getCount() {
                HiLog.info(LOG_LABEL, "--------getCount");
                return pageviews.size();
            }

            //返回一个对象，这个对象表明了PagerAdapter适配器选择哪个对象放在当前的pageviews中
            @Override
            public Object createPageInContainer(ComponentContainer componentContainer, int i) {
                componentContainer.addComponent(pageviews.get(i));
                HiLog.info(LOG_LABEL, "--------createPageInContainer");
                return pageviews.get(i);
            }

            //是从ViewGroup中移出当前View
            @Override
            public void destroyPageFromContainer(ComponentContainer componentContainer, int i, Object o) {
                ((PageSlider) componentContainer).removeComponent(pageviews.get(i));
                HiLog.info(LOG_LABEL, "--------destroyPageFromContainer");
            }

            //断是否由对象生成界面
            @Override
            public boolean isPageMatchToObject(Component component, Object o) {
                HiLog.info(LOG_LABEL, "--------isPageMatchToObject");
                return component == o;
            }
        });

        pageSlider.addPageChangedListener(new PageSlider.PageChangedListener() {
            @Override
            public void onPageSliding(int i, float v, int i1) {
                //v:指示页面的位置偏移量。值的范围是(0,1]。
                // 0表示正在显示目标页面。
                //i1:指示显示页面的位置偏移像素数。
            }

            @Override
            public void onPageSlideStateChanged(int i) {
                HiLog.info(LOG_LABEL, "--------onPageSlideStateChanged");
            }

            @Override
            public void onPageChosen(int i) {
                ((RadioButton) radioContainer.getComponentAt(i)).setChecked(true);
            }
        });
        radioContainer.setMarkChangedListener((radioContainer, i) -> pageSlider.setCurrentPage(i));
    }
}
```
###另外附上  Layout_pageSlider1  和  Layout_pageSlider2  的布局文件  
 -  #### pageSlider1.xml
```
<?xml version="1.0" encoding="utf-8"?>
<DependentLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent">
    <Text
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:center_in_parent="true"
        ohos:text="PageSlider1"
        ohos:text_size="25fp"/>
</DependentLayout>
```
 -  #### pageSlider2.xml
```
<?xml version="1.0" encoding="utf-8"?>
<DependentLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent">
    <Text
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:center_in_parent="true"
        ohos:text="PageSlider2"
        ohos:text_size="25fp"/>
</DependentLayout>
```
到此鸿蒙的 PageSlider  滑动组件基本算是讲完了。
## 最后总结：
鸿蒙里面的 PageSlider  组件对标的是安卓的里面viewpager 做过安卓开发同学应该都比较熟悉 也容易理解 PageSlider 的各种用法包添加view 滑动监听 绑定适配器等等。PageSlider 主要使用来处理横向滑动屏幕的一个效果 可以实现轮播图滑动那种效果。关于轮播图篇幅有限就不展开讲了· 后面再更新   最后希望我的文章能帮助到各位解决问题 ，以后我还会贡献更多有用的代码分享给大家。各位同学如果觉得文章还不错 ，麻烦给关注和star，小弟在这里谢过啦