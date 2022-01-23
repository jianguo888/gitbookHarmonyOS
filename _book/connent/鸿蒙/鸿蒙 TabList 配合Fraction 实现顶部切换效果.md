## 前言：
各位同学大家好，有段时间没有给大家更新文章，具体多久我也不清楚哈，昨天发了一篇关于  **[Fraction](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.harmonyos.com%2Fcn%2Fdocs%2Fdocumentation%2Fdoc-references%2Ffraction-0000001059908801)**。的基础用法和生命周期的，今天我想着配合鸿蒙里面提供的顶部切换控件 tablist 来实现顶部tab 切换然后下面多个fraction的效果。那么废话不多说我们正式开始 
##准备工作
1 安装鸿蒙开发环境 大家可以看我之前的文章
华为鸿蒙系统开发初体验 ：[https://www.jianshu.com/p/f94c847c7fdc](https://www.jianshu.com/p/f94c847c7fdc)
## 效果图：
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-380c77590fdc3d79.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-c9aca4768a21349b.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-9856db38ae03927f.png)
## 具体实现：
定tablist布局
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

    <StackLayout
        ohos:id="$+id:mainstack"
        ohos:height="match_parent"
        ohos:width="match_parent"
        >
    </StackLayout>
</DirectionalLayout>
```
我们在纵向线性布局上面写了一个tablist 然后下面写了一个 StackLayout 来装载我们的多个fraction 
- java 代码逻辑  
顶部标签数据
```
  private  String[] str={"关注","推荐","热点","问答"};
```
初始化tab并且添加顶部标签文字
```
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
            addHomeFraction();
            tabList.addTabSelectedListener(new TabList.TabSelectedListener() {
                @Override
                public void onSelected(TabList.Tab tab) {
                    // 当某个Tab从未选中状态变为选中状态时的回调
                    System.out.println("当某个Tab从未选中状态变为选中状态时的回调");
                    layoutShow(tab.getPosition());
                }

                @Override
                public void onUnselected(TabList.Tab tab) {
                    // 当某个Tab从选中状态变为未选中状态时的回调
                    System.out.println("当某个Tab从选中状态变为未选中状态时的回调");
                }
                @Override
                public void onReselected(TabList.Tab tab) {
                    // 当某个Tab已处于选中状态，再次被点击时的状态回调
                    System.out.println("当某个Tab已处于选中状态，再次被点击时的状态回调");
                }
            });

        }
    }
```
我们初始化我们的tablist 控件后 我们for循环设置我们的tablist的tab 并添加到tablist组件的addTab方法中
#### 多个fraction 切换逻辑 
```
    private void  addHomeFraction(){
        getFractionManager()
                .startFractionScheduler()
                .add(ResourceTable.Id_mainstack, new AttentionFraction())
                .submit();
    }


    public  void  layoutShow(int  code){
        switch (code){
            case 0:
                getFractionManager()
                        .startFractionScheduler()
                        .replace(ResourceTable.Id_mainstack, new AttentionFraction())
                        .submit();

                break;
            case 1:
                getFractionManager()
                        .startFractionScheduler()
                        .replace(ResourceTable.Id_mainstack, new RecommendFraction())
                        .submit();


                break;
            case 2:
                getFractionManager()
                        .startFractionScheduler()
                        .replace(ResourceTable.Id_mainstack, new HotspotFraction())
                        .submit();

                break;
            case 3:
                getFractionManager()
                        .startFractionScheduler()
                        .replace(ResourceTable.Id_mainstack, new QuestionFraction())
                        .submit();

                break;
            default:
                break;
        }
    }
```
这边我们提供了一个addHomeFraction 方法和layoutShow 方法 我们在进入 MainAbility 的时候我们调用 addHomeFraction 来加载第一个默认的fraction 然后我们在点击顶部的tablist标签的时候 我们在  onSelected 回调方法中调用  layoutShow方法 
```
     public void onSelected(TabList.Tab tab) {
                    // 当某个Tab从未选中状态变为选中状态时的回调
                    System.out.println("当某个Tab从未选中状态变为选中状态时的回调");
                    layoutShow(tab.getPosition());
                }
```
我们只需要传入tab.getPosition() 点击顶部标签的下标即可
这样依赖我们的tablist配合多个fraction切换功能就实现了  
##具体的fraction的内部逻辑我们简单说一下 
- #### 关注模块
布局文件
```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
xmlns:ohos="http://schemas.huawei.com/res/ohos"
ohos:height="match_parent"
ohos:orientation="vertical"
ohos:width="match_parent">

    <ListContainer
        ohos:id="$+id:jop_page_list"
        ohos:height="match_parent"
        ohos:width="match_parent">
    </ListContainer>
</DirectionalLayout>

```
java逻辑代码 
```
package com.example.tablist.fraction;
import com.example.tablist.ResourceTable;
import com.example.tablist.bean.PositionInfo;
import com.example.tablist.config.Api;
import com.example.tablist.provider.PositionProvider;
import com.google.gson.Gson;
import ohos.aafwk.ability.fraction.Fraction;
import ohos.aafwk.content.Intent;
import ohos.agp.components.Component;
import ohos.agp.components.ComponentContainer;
import ohos.agp.components.LayoutScatter;
import ohos.agp.components.ListContainer;
import java.util.List;
/***
 *
 * 创建人：xuqing
 * 创建2021年2月28日17:24:03
 * 类说明： 关注模块
 *
 */
public class AttentionFraction extends Fraction {
    private PositionProvider positionProvider;
    private ListContainer listContainer;
    @Override
    protected Component onComponentAttached(LayoutScatter scatter, ComponentContainer container, 
                  Intent intent) {
        Component component=scatter.parse(ResourceTable.Layout_fraction_attention,container,false);
        return component;
    }
    protected void onStart(Intent intent) {
        super.onStart(intent);
        listContainer= (ListContainer) 
        getFractionAbility().findComponentById(ResourceTable.Id_jop_page_list);
        getPostition();
    }
    public  void  getPostition(){
        Gson gson=new Gson();
        PositionInfo positionInfo=gson.fromJson(Api.getPositioninfo(),PositionInfo.class);
        List<PositionInfo.DataBean> list=positionInfo.getData();
        positionProvider=new PositionProvider(list,  getFractionAbility());
        listContainer.setItemProvider(positionProvider);
    }
}
```
几个fraction其实比较·简单都是加载本地死数据显示在listContainer 控件上面，其他几个fraction因为逻辑都差不多我这边就不展开一个一个讲 有兴趣的同学可以下载完整代码去查阅 ，鸿蒙到此TabList 配合Fraction 实现顶部切换效果就讲完了
##最后总结 ：
鸿蒙里面提供了比较好用的tablist组件   我们只需要简单的基本就能实现顶部tab的切换了 然后我们配合fraction跟我们的   Ability 进行绑定但是我们的 Ability 需要继承 FractionAbility 。这样我们就能完成fraction和ability 的绑定   我们在 tablist的回调方法去调用我们替换fraction的方法 就能实现顶部tablist点击切换的时候下面的fraction跟着一起切换 整个代码逻辑还算比较简单跟上一篇底部切换有异曲同工之妙。 更多的tablist和fraction的联动效果同学们有兴趣可以私下研究 我这边篇幅有限就不展开讲了 最后希望我的文章能帮助到各位解决问题 ，以后我还会贡献更多有用的代码分享给大家。各位同学如果觉得文章还不错 ，麻烦给关注和star，小弟在这里谢过啦
## 项目地址：
码云 ：https://gitee.com/qiuyu123/tablistcut