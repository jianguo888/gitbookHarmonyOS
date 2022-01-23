## 前言：
各位同学大家好 ，之前写过一篇鸿蒙模仿boss直聘文章。那个时候我自己天真的以为鸿蒙里面没有类似安卓里面的fragment，所以就用布局显示隐藏来实现的 虽然效果是实现了但是并不是很理想 ，因为所有的逻辑都是写在同一个Ability 视图里面，当逻辑复杂了我们就很难处理了，不过之前·我查文档发现鸿蒙提供了  Fraction 小部分这个控件给我们开发使用，所以就更新一下之前的模仿boss直聘的客户端项目
那么废话不多说，我们正式开始。
## 效果图  
#### 带顶部导航的
![QQ截图20210118222943.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-106c69c3021c89cc.png)
![QQ截图20210118223003.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-54bc10178256680e.png)
![QQ截图20210118223029.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-2087a9068b4f29a7.png)
![QQ截图20210118223042.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-4c797eb862f095c2.png)
#### 不带tabbar顶部导航的
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-3b23edfcd200eb2a.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-0f8feeff00ce37fe.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-f8a5512e20690c88.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-9287beaf9b60cf30.png)
## 具体实现
我们这次更新使用 Fraction 
底部布局 
```
<?xml version="1.0" encoding="utf-8"?>
<DependentLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
     >
    <DirectionalLayout
        ohos:id="$+id:bottom_dl"
        ohos:height="60vp"
        ohos:width="match_parent"
        ohos:orientation="horizontal"
        ohos:align_parent_bottom="true"

        >
    <DirectionalLayout
        ohos:id="$+id:job_page_dl"
        ohos:height="match_parent"
        ohos:width="0"
        ohos:weight="1"
        ohos:orientation="vertical"
        >

        <Image
            ohos:id="$+id:job_page_image"
            ohos:height="match_content"
            ohos:width="match_content"
            ohos:layout_alignment="vertical_center|horizontal_center"
            ohos:image_src="$media:ic_main_tab_find_pre"
            >
        </Image>
        <Text
            ohos:id="$+id:job_page_text"
            ohos:height="match_parent"
            ohos:width="match_parent"
            ohos:layout_alignment="horizontal_center"
            ohos:text="职位"
            ohos:text_color="#008577"
            ohos:layout_direction="locale"
            ohos:text_size="15vp"
            ohos:left_margin="20vp"
            >
        </Text>


    </DirectionalLayout>

        <DirectionalLayout
            ohos:id="$+id:company_page_dl"
            ohos:height="match_parent"
            ohos:width="0"
            ohos:weight="1"
            ohos:orientation="vertical"
            >

            <Image
                ohos:id="$+id:company_page_image"
                ohos:height="match_content"
                ohos:width="match_content"
                ohos:layout_alignment="vertical_center|horizontal_center"
                ohos:image_src="$media:ic_main_tab_company_nor"
                >
            </Image>
            <Text
                ohos:id="$+id:company_page_text"
                ohos:height="match_parent"
                ohos:width="match_parent"
                ohos:layout_alignment="vertical_center|horizontal_center"
                ohos:text="公司"
                ohos:text_color="#6B6B6B"
                ohos:text_size="15vp"
                ohos:left_margin="20vp"
                >
            </Text>
        </DirectionalLayout>

        <DirectionalLayout
            ohos:id="$+id:chat_page_dl"
            ohos:height="match_parent"
            ohos:width="0"
            ohos:weight="1"
            ohos:orientation="vertical"
            >
            <Image
                ohos:id="$+id:chat_page_image"
                ohos:height="match_content"
                ohos:width="match_content"
                ohos:layout_alignment="vertical_center|horizontal_center"
                ohos:image_src="$media:ic_main_tab_company_nor"
                >
            </Image>
            <Text
                ohos:id="$+id:chat_page_text"
                ohos:height="match_parent"
                ohos:width="match_parent"
                ohos:layout_alignment="vertical_center|horizontal_center"
                ohos:text="消息"
                ohos:text_color="#6B6B6B"
                ohos:text_size="15vp"
                ohos:left_margin="20vp"
                >
            </Text>
        </DirectionalLayout>
        <DirectionalLayout
            ohos:id="$+id:mine_page_dl"
            ohos:height="match_parent"
            ohos:width="0"
            ohos:weight="1"
            ohos:orientation="vertical"
            >
            <Image
                ohos:id="$+id:mine_page_image"
                ohos:height="match_content"
                ohos:width="match_content"
                ohos:layout_alignment="vertical_center|horizontal_center"
                ohos:image_src="$media:ic_main_tab_my_nor"
                >
            </Image>
            <Text
                ohos:id="$+id:mine_page_text"
                ohos:height="match_parent"
                ohos:width="match_parent"
                ohos:layout_alignment="vertical_center|horizontal_center"
                ohos:text="我的"
                ohos:text_color="#6B6B6B"
                ohos:text_size="15vp"
                ohos:left_margin="20vp"
                >
            </Text>
        </DirectionalLayout>
    </DirectionalLayout>
    <StackLayout
        ohos:id="$+id:mainstack"
        ohos:height="match_parent"
        ohos:width="match_parent"
        ohos:above="$id:bottom_dl"
        >
    </StackLayout>
</DependentLayout>
```
## 底部布局效果
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-929ef75029b09e86.png)
底部布局简单说下是一个线性布局  DirectionalLayout 水平方向里面写了四个  DirectionalLayout 线性布局 然后每个线性布局里面嵌套一个inage图片空间和text文本控件来显示底部的tab  然后我们在 底部布局到上面添加了一个StackLayout 布局来装载我们的Fraction  控件
###  MainAbility 逻辑具体具体实现
- #### 1 自己的Ability 继承 FractionAbility
 ```
public class MainAbility extends FractionAbility implements Component.ClickedListener {
     private Image job_pageimage;
     private Image company_page_image;
     private Image chat_page_image;
     private Image mine_page_image;
     private Text job_pagetext,company_page_text ,chat_page_text ,mine_page_text;
     private DirectionalLayout job_pagedl , company_page_dl, chat_page_dl,mine_page_dl;

    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_ability_main);
        addHomeFraction();
        initview();

    }
}
 ```
- #### 2控件初始化、
```
    private void initview() {
        job_pageimage= (Image) findComponentById(ResourceTable.Id_job_page_image);
        company_page_image= (Image) 
        findComponentById(ResourceTable.Id_company_page_image);
        chat_page_image= (Image) findComponentById(ResourceTable.Id_chat_page_image);
        mine_page_image= (Image) findComponentById(ResourceTable.Id_mine_page_image);
        job_pagetext= (Text) findComponentById(ResourceTable.Id_job_page_text);
        company_page_text= (Text) findComponentById(ResourceTable.Id_company_page_text);
        chat_page_text= (Text) findComponentById(ResourceTable.Id_chat_page_text);
        mine_page_text= (Text) findComponentById(ResourceTable.Id_mine_page_text);
        job_pagedl= (DirectionalLayout) findComponentById(ResourceTable.Id_job_page_dl);
        company_page_dl= (DirectionalLayout) 
        findComponentById(ResourceTable.Id_company_page_dl);
        chat_page_dl= (DirectionalLayout) findComponentById(ResourceTable.Id_chat_page_dl);
        mine_page_dl= (DirectionalLayout) findComponentById(ResourceTable.Id_mine_page_dl);
        job_pagedl.setClickedListener(this);
        company_page_dl.setClickedListener(this);
        chat_page_dl.setClickedListener(this);
        mine_page_dl.setClickedListener(this);

    }
```
- ##### 3 点击事件
```
   @Override
    public void onClick(Component component) {
        switch (component.getId()){
            case ResourceTable.Id_job_page_dl:
                job_pageimage.setPixelMap(ResourceTable.Media_ic_main_tab_find_pre);
                company_page_image.setPixelMap(ResourceTable.Media_ic_main_tab_company_nor);
                chat_page_image.setPixelMap(ResourceTable.Media_ic_main_tab_contacts_nor);
                mine_page_image.setPixelMap(ResourceTable.Media_ic_main_tab_my_nor);
                job_pagetext.setTextColor(Color.GREEN);
                company_page_text.setTextColor(Color.GRAY);
                chat_page_text.setTextColor(Color.GRAY);
                mine_page_text.setTextColor(Color.GRAY);
                layoutShow(0);

                break;
            case ResourceTable.Id_company_page_dl:
                job_pageimage.setPixelMap(ResourceTable.Media_ic_main_tab_find_nor);
                company_page_image.setPixelMap(ResourceTable.Media_ic_main_tab_company_pre);
                chat_page_image.setPixelMap(ResourceTable.Media_ic_main_tab_contacts_nor);
                mine_page_image.setPixelMap(ResourceTable.Media_ic_main_tab_my_nor);
                job_pagetext.setTextColor(Color.GRAY);
                company_page_text.setTextColor(Color.GREEN);
                chat_page_text.setTextColor(Color.GRAY);
                mine_page_text.setTextColor(Color.GRAY);
                layoutShow(1);
                break;
            case ResourceTable.Id_chat_page_dl:
                job_pageimage.setPixelMap(ResourceTable.Media_ic_main_tab_find_nor);
                company_page_image.setPixelMap(ResourceTable.Media_ic_main_tab_company_nor);
                chat_page_image.setPixelMap(ResourceTable.Media_ic_main_tab_contacts_pre);
                mine_page_image.setPixelMap(ResourceTable.Media_ic_main_tab_my_nor);
                job_pagetext.setTextColor(Color.GRAY);
                company_page_text.setTextColor(Color.GRAY);
                chat_page_text.setTextColor(Color.GREEN);
                mine_page_text.setTextColor(Color.GRAY);
                layoutShow(2);
                break;
            case ResourceTable.Id_mine_page_dl:
                job_pageimage.setPixelMap(ResourceTable.Media_ic_main_tab_find_nor);
                company_page_image.setPixelMap(ResourceTable.Media_ic_main_tab_company_nor);
                chat_page_image.setPixelMap(ResourceTable.Media_ic_main_tab_contacts_nor);
                mine_page_image.setPixelMap(ResourceTable.Media_ic_main_tab_my_pre);
                job_pagetext.setTextColor(Color.GRAY);
                company_page_text.setTextColor(Color.GRAY);
                chat_page_text.setTextColor(Color.GRAY);
                mine_page_text.setTextColor(Color.GREEN);
                layoutShow(3);
                break;
            default:
                break;
        }
    }
```
 - #### 4多个Fraction切换逻辑
```
   public  void  layoutShow(int  code){
        switch (code){
            case 0:
            getFractionManager()
                        .startFractionScheduler()
                        .replace(ResourceTable.Id_mainstack, new JobFraction())
                        .submit();

            break;
            case 1:
            getFractionManager()
                        .startFractionScheduler()
                        .replace(ResourceTable.Id_mainstack, new CompanyFraction())
                        .submit();


            break;
          case 2:
          getFractionManager()
                      .startFractionScheduler()
                      .replace(ResourceTable.Id_mainstack, new MessageFraction())
                      .submit();

           break;
            case 3:
          getFractionManager()
                        .startFractionScheduler()
                        .replace(ResourceTable.Id_mainstack, new MinepageFraction())
                        .submit();

             break;
            default:
            break;
        }
    }
```
- #### 5 默认添加的Fraction 
```
   private void  addHomeFraction(){
        getFractionManager()
                .startFractionScheduler()
                .add(ResourceTable.Id_mainstack, new JobFraction())
                .submit();
    }
```
整个MainAbility 逻辑就比较清晰了我们通过监听底部tab切换的点击事件回调方法我们调用FractionAbility 里面的 replace 和add方法来切换Fraction 和默认加载主页的Fraction 来实现了我们的上面的效果还做到了代码的解耦 我们具体的每个碎片页面的逻辑我们就可以在每个独立的Fraction  单独去实现即可。
  ##具体的fraction的内部逻辑我们简单说一下 
- #### 公司模块
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
 * 类说明： 公司模块
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
几个fraction其实比较·简单都是加载本地死数据显示在listContainer 控件上面，其他几个fraction因为逻辑都差不多我这边就不展开一个一个讲 有兴趣的同学可以下载完整代码去查阅 。
## 顶部的导航问题
之前那一版顶部导航我们也没有去掉 其实这个很容易我们只需要在config.json文件中添加如下代码即可
```
  "metaData":{
      "customizeData":[
        {
          "name": "hwc-theme",
          "value": "androidhwext:style/Theme.Emui.Light.NoTitleBar",
          "extra": ""
        }
      ]
    }
```
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-f787684dcd633d64.png)
到此鸿蒙模仿boss直聘客户端就讲完了 其他页面的实现都差别不大大家可以去下载完整代码查阅 这次算是更新教程。之前教程因为个人知识疏漏说以给大家补上 以免给各位同学造成误导 实在不好意思
## 最后总结
鸿蒙里面提供的 Fraction（字面意思小部分）用法和安卓里面的fragment(碎片页)用法差不多 都是不能单独显示要依附于视图 。生命周期也比较类似 Fraction解决了我们常用app开发中多个tab切换的问题 ，所以这次使用 Fraction 控件 来更新了之前模仿 boss直聘项目，在这里我为之前的文章里面的描述错误给华为和各位同学道歉。当然 Fraction 也有缺陷 在实际开发中，我们可能需要让Fraction嵌套Fraction，目前鸿蒙还不支持Fraction嵌套Fraction。想信华为会尽快解决这个问题 我们也希望华为越来越好 王者归来 最后希望我的文章能帮助到各位解决问题 ，以后我还会贡献更多有用的代码分享给大家。各位同学如果觉得文章还不错 ，麻烦给关注和star，小弟在这里谢过啦!
## 项目地址 
码云 ：https://gitee.com/qiuyu123/newhms_boss