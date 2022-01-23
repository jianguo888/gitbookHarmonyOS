## 前言：
各位同学大家好有段时间没有给大家更新文章，具体多久我也不记得，最近在学习鸿蒙开发，就模仿boss直聘app的一些经典页面写了一个鸿蒙的开源demo 希望能帮助到各位同学学习 那么废话不多说，我们正式开始。

## 效果图：
![QQ截图20210118222943.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-106c69c3021c89cc.png)

![QQ截图20210118223003.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-54bc10178256680e.png)

![QQ截图20210118223029.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-2087a9068b4f29a7.png)

![QQ截图20210118223042.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-4c797eb862f095c2.png)

## 具体实现：
因为我们要做底部tab切换的效果 ，所以我查阅了很多鸿蒙的文档 希望能够有跟安卓里面的fragment 或者iOS里面的viewcontroller 给我们用这样可以做到每个碎片也逻辑分离  但是事与愿违，最后我想到用布局显示影藏 来做到切换的效果 这样做坏处是当每个切换的页面逻辑复杂了我们不好处理 代码冗余 ，但是没有办法 目前就简单粗暴实现效果 后面再想办法优化 
### 底部tab布局

```java
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
```
底部布局简单说下是一个线性布局  DirectionalLayout 水平方向里面写了四个  DirectionalLayout 线性布局 然后每个线性布局里面嵌套一个inage图片空间和text文本控件来显示底部的tab  
## 控件初始化 
```java
    job_pageimage= (Image) findComponentById(ResourceTable.Id_job_page_image);
        company_page_image= (Image) findComponentById(ResourceTable.Id_company_page_image);
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
        jop_page_module= (DirectionalLayout) findComponentById(ResourceTable.Id_jop_page_module);
        company_page_module= (DirectionalLayout) 
       findComponentById(ResourceTable.Id_company_page_module);
        chat_page_module= (DirectionalLayout) findComponentById(ResourceTable.Id_chat_page_module);
        mine_page_module= (DirectionalLayout) findComponentById(ResourceTable.Id_mine_page_module);
        listContainer= (ListContainer) findComponentById(ResourceTable.Id_jop_page_list);
        companylistComtainer= (ListContainer) findComponentById(ResourceTable.Id_company_page_list);
        messagelistComtainer= (ListContainer) findComponentById(ResourceTable.Id_message_page_list);
        job_pagedl.setClickedListener(this);
        company_page_dl.setClickedListener(this);
        chat_page_dl.setClickedListener(this);
        mine_page_dl.setClickedListener(this);
```
####点击事件  
```java
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
                super.setMainRoute(MinepageAbilitySlice.class.getName());
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
####封装一个方式来处理4个布局显示影藏 
```java
   public  void  layoutShow(int  code){
        switch (code){
            case 0:
                jop_page_module.setVisibility(0);
                company_page_module.setVisibility(1);
                chat_page_module.setVisibility(1);
                mine_page_module.setVisibility(1);
                getPostition();

            break;
            case 1:
                jop_page_module.setVisibility(1);
                company_page_module.setVisibility(0);
                chat_page_module.setVisibility(1);
                mine_page_module.setVisibility(1);
                getCompany();
            break;
          case 2:
              jop_page_module.setVisibility(1);
              company_page_module.setVisibility(1);
              chat_page_module.setVisibility(0);
              mine_page_module.setVisibility(1);
              getMessage();
           break;
            case 3:
                jop_page_module.setVisibility(1);
                company_page_module.setVisibility(1);
                chat_page_module.setVisibility(1);
                mine_page_module.setVisibility(0);
             break;
            default:
            break;
        }
    }
```
 然后我们观察职位模块 公司模块 消息模块都是上面一个标题 下面是列表 我这边就拿一个模块举例 
###职位模块
```java
   <DirectionalLayout
        ohos:id="$+id:jop_page_module"
        ohos:height="match_parent"
        ohos:width="match_parent"
        ohos:above="$id:bottom_dl"
        ohos:visibility="visible"
        ohos:orientation="vertical"
        >
        <DependentLayout
            ohos:height="50vp"
            ohos:width="match_parent"
            ohos:background_element="$graphic:background_green"
            >
            <Text
                ohos:height="match_content"
                ohos:width="match_content"
                ohos:horizontal_center="true"
                 ohos:vertical_center="true"
                ohos:text="职位"
                ohos:text_color="#ffffff"
                ohos:text_size="25vp"
                ></Text>
        </DependentLayout>
          <ListContainer
           ohos:id="$+id:jop_page_list"
           ohos:height="match_parent"
           ohos:width="match_parent">
         </ListContainer>
    </DirectionalLayout>
```
职位模块布局上门是一个 DependentLayout 嵌套一个text 显示标题  下面是ListContainer 列表组件 
初始化控件  
```
代码块 listContainer= (ListContainer) findComponentById(ResourceTable.Id_jop_page_list);
```
### 获取数据 
这边是本地的模拟的数据 
```java
 public  static  String getPositioninfo(){
        String str="{\n" +
                "    \"msg\": \"获取数据成功\",\n" +
                "    \"code\": 200,\n" +
                "    \"data\": [\n" +
                "        {\n" +
                "            \"id\": 4,\n" +
                "            \"name\": \"资深安卓工程师\",\n" +
                "            \"cname\": \"今日头条\",\n" +
                "            \"size\": \"D轮\",\n" +
                "            \"salary\": \"40K-60K\",\n" +
                "            \"username\": \"Kimi\",\n" +
                "            \"title\": \"HR\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"id\": 5,\n" +
                "            \"name\": \"资深安卓工程师\",\n" +
                "            \"cname\": \"今日头条\",\n" +
                "            \"size\": \"D轮\",\n" +
                "            \"salary\": \"40K-60K\",\n" +
                "            \"username\": \"Kimi\",\n" +
                "            \"title\": \"HR\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"id\": 6,\n" +
                "            \"name\": \"资深安卓工程师\",\n" +
                "            \"cname\": \"今日头条\",\n" +
                "            \"size\": \"D轮\",\n" +
                "            \"salary\": \"40K-60K\",\n" +
                "            \"username\": \"Kimi\",\n" +
                "            \"title\": \"HR\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"id\": 7,\n" +
                "            \"name\": \"资深安卓工程师\",\n" +
                "            \"cname\": \"今日头条\",\n" +
                "            \"size\": \"D轮\",\n" +
                "            \"salary\": \"40K-60K\",\n" +
                "            \"username\": \"Kimi\",\n" +
                "            \"title\": \"HR\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"id\": 8,\n" +
                "            \"name\": \"资深安卓工程师\",\n" +
                "            \"cname\": \"今日头条\",\n" +
                "            \"size\": \"D轮\",\n" +
                "            \"salary\": \"40K-60K\",\n" +
                "            \"username\": \"Kimi\",\n" +
                "            \"title\": \"HR\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"id\": 9,\n" +
                "            \"name\": \"资深安卓工程师\",\n" +
                "            \"cname\": \"今日头条\",\n" +
                "            \"size\": \"D轮\",\n" +
                "            \"salary\": \"40K-60K\",\n" +
                "            \"username\": \"Kimi\",\n" +
                "            \"title\": \"HR\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"id\": 10,\n" +
                "            \"name\": \"资深安卓工程师\",\n" +
                "            \"cname\": \"今日头条\",\n" +
                "            \"size\": \"D轮\",\n" +
                "            \"salary\": \"40K-60K\",\n" +
                "            \"username\": \"Kimi\",\n" +
                "            \"title\": \"HR\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"id\": 11,\n" +
                "            \"name\": \"资深安卓工程师\",\n" +
                "            \"cname\": \"今日头条\",\n" +
                "            \"size\": \"D轮\",\n" +
                "            \"salary\": \"40K-60K\",\n" +
                "            \"username\": \"Kimi\",\n" +
                "            \"title\": \"HR\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"id\": 12,\n" +
                "            \"name\": \"资深安卓工程师\",\n" +
                "            \"cname\": \"今日头条\",\n" +
                "            \"size\": \"D轮\",\n" +
                "            \"salary\": \"40K-60K\",\n" +
                "            \"username\": \"Kimi\",\n" +
                "            \"title\": \"HR\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"id\": 13,\n" +
                "            \"name\": \"移动端架构师\",\n" +
                "            \"cname\": \"银汉游戏\",\n" +
                "            \"size\": \"B轮\",\n" +
                "            \"salary\": \"15K-20K\",\n" +
                "            \"username\": \"刘丽\",\n" +
                "            \"title\": \"人事主管\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"id\": 14,\n" +
                "            \"name\": \"Java工程师\",\n" +
                "            \"cname\": \"37互娱\",\n" +
                "            \"size\": \"D轮\",\n" +
                "            \"salary\": \"25K-30K\",\n" +
                "            \"username\": \"Reiki\",\n" +
                "            \"title\": \"HR-M\"\n" +
                "        }\n" +
                "    ]\n" +
                "}";
        return  str;
    }
```

用gson解析将json数据转成bean 然后获取里面  List<PositionInfo.DataBean> list 
```java
    public  void  getPostition(){
        Gson gson=new Gson();
        PositionInfo positionInfo=gson.fromJson(Api.getPositioninfo(),PositionInfo.class);
        List<PositionInfo.DataBean> list=positionInfo.getData();
        positionProvider=new PositionProvider(list,MainAbility.this);
        listContainer.setItemProvider(positionProvider);
    }
```
## ListContainer的适配器
```java
package com.example.hms_boss.provider;
import com.example.hms_boss.MainAbility;
import com.example.hms_boss.ResourceTable;
import com.example.hms_boss.bean.PositionInfo;
import ohos.agp.components.*;
import java.util.List;

public class PositionProvider extends RecycleItemProvider {

    private List<PositionInfo.DataBean> list;
    private MainAbility slice;
    public PositionProvider(List<PositionInfo.DataBean> list, MainAbility slice) {
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
    public Component getComponent(int i, Component component, ComponentContainer componentContainer) {
        if (component== null) {
            Component     cpt = LayoutScatter.getInstance(slice).parse(ResourceTable.Layout_position_listview_item,null,false);
            PositionInfo.DataBean  dataBean = list.get(i);
            Text position_nametext =(Text) cpt.findComponentById(ResourceTable.Id_position_name);
            Text position_namesizetext =(Text) cpt.findComponentById(ResourceTable.Id_position_namesize);
            Text text_hr =(Text) cpt.findComponentById(ResourceTable.Id_text_hr);
            Text position_salary_text =(Text) cpt.findComponentById(ResourceTable.Id_position_salary);
            position_nametext.setText(dataBean.getName());
            position_namesizetext.setText(dataBean.getCname()+dataBean.getSize());
            text_hr.setText(dataBean.getUsername()+"|"+dataBean.getTitle());
            position_salary_text.setText(dataBean.getSalary());
            return cpt;
        } else {
            return component;
        }
    }
}
```
ListContainer 设置适配器
```
companyProvicer=new CompanyProvicer(datalist,MainAbility.this);
  companylistComtainer.setItemProvider(companyProvicer);
```
到此鸿蒙模仿boss直聘客户端就讲完了 其他页面的实现都差别不大大家可以去下载完整代码查阅

## 最后总结

 这次开发这个鸿蒙模仿boss直聘客户端 demo给我的感觉 鸿蒙跟现在安卓iOS比起来 差距还是有 我这边是用的java UI来布局的 基础的fragment或者viewcontroller 这样的控件都没有提供 感觉这个操纵系统还是很简陋 路还很长 不过好消息是很多基于java的库是在安卓 java EE 鸿蒙上面是通用的 我这边用json解析就是用google的gson来处理 非常方便 总而言之华为很长的路要走 ，我们只能一边默默支持一边耐心的等待华为王者归来

## 项目地址：

码云 ：https://gitee.com/qiuyu123/hmsboss