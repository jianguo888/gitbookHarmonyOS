## 前言:
各位同学大家好，有点时间没有给大家更新文章了具体多久。我也记不清楚了哈， 最近开发中要做一个类似微信聊天的工单系统客服中心界面（安卓版）所以想着也模仿一个鸿蒙版（基于JAVA UI的,JSUI版本的后期更新哈） 那么废话不多数说我们正式开始
## 准备工作
华为鸿蒙系统开发初体验 ：[[https://harmonyos.51cto.com/posts/9190]](https://www.jianshu.com/p/f94c847c7fdc%5D)
## 效果图 
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-5edf1712f4dfa72e.png)
## 具体实现  
mainabiilty布局文件
```
<?xml version="1.0" encoding="utf-8"?>
<DependentLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:alignment="center"
    ohos:orientation="vertical">

    <DependentLayout
        ohos:id="$+id:company_page_dl"
        ohos:height="50vp"
        ohos:width="match_parent"
        ohos:orientation="horizontal"
        ohos:align_parent_bottom="true"
        >

        <Button
            ohos:id="$+id:main_my_btn"
            ohos:width="match_content"
            ohos:height="match_content"
            ohos:text="发送"
            ohos:text_size="35vp"
            ohos:align_parent_right="true"
            ohos:background_element="$graphic:background_btn"
            >
        </Button>
     <TextField
         ohos:id="$+id:main_textfiled"
         ohos:width="match_parent"
         ohos:height="match_parent"
         ohos:hint="请输入你的消息"
         ohos:vertical_center="true"
         ohos:text_size="50"
         ohos:left_of="$id:main_my_btn"
         ohos:layout_alignment="left"
         >
     </TextField>
    </DependentLayout>

    <ListContainer
        ohos:above="$id:company_page_dl"
        ohos:id="$+id:main_list"
        ohos:height="match_parent"
        ohos:width="match_parent"
        >
    </ListContainer>

</DependentLayout>
```
布局预览效果
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-1b909ea86f8bf5f2.png)
我们观察布局文件 我们可以看到我们写了一个列表控件ListContainer 来装载我们发送出去的消息和接收到的消息 然后底部我们写了一个 TextField 控件来处理用户的输入 和一个button来触发发送的动作 
## 逻辑代码   
我们初始化对应控件并且listContainer 和适配器绑定到一起
```
    private void initview() {
        listContainer= (ListContainer) findComponentById(ResourceTable.Id_main_list);
        textField= (TextField) findComponentById(ResourceTable.Id_main_textfiled);
        mainbtn= (Button) findComponentById(ResourceTable.Id_main_my_btn);
        mainbtn.setClickedListener(this);
        myProvider=new MyProvider(data,getAbility());
        listContainer.setItemProvider(myProvider);
        myProvider.notifyDataChanged();//有新消息时，刷新ListView中的显示
    }
```
 - #### 初始默认假数据 
我们方便展示就写了3条假数据仅供展示
```
     private void initMsg() {
        Msg msg1 = new Msg("你好",Msg.RECEIVED);
        data.add(msg1);
        Msg msg2 = new Msg("你好呀",Msg.SENT);
        data.add(msg2);
        Msg msg3 = new Msg("很高兴认识你",Msg.RECEIVED);
        data.add(msg3);
    }

```
- #### 用户输入逻辑
```
 @Override
    public void onClick(Component component) {
        content=textField.getText().toString();
        switch (component.getId()){
            case ResourceTable.Id_main_my_btn:
                if(!flag){
                    Msg msg = new Msg(content, Msg.SENT);
                    data.add(msg);
                    flag=true;
                }else {
                    Msg msg = new Msg(content, Msg.RECEIVED);
                    data.add(msg);
                    flag=false;
                }
                myProvider.notifyDataChanged();//有新消息时，刷新ListView中的显示
                textField.setText("");//清空输入框的内容
                break;

            default:
                break;

        }

    }
```
 我们通过一个布尔值flag来做一个开关处理用户输入的  动作轮流来处理是接收到消息还是发送出消息 
- ##### 发送消息
```
  Msg msg = new Msg(content, Msg.SENT);
                    data.add(msg);
```
- ##### 接收消息  
```
 Msg msg = new Msg(content, Msg.RECEIVED);
                    data.add(msg);
```
## bena类
 ```
package com.example.imdemo.bean;

public class Msg{

    public static final int RECEIVED = 0;//收到一条消息

    public static final int SENT = 1;//发出一条消息

    private String  content;//消息的内容

    private int type;//消息的类型

    public  Msg(String content,int type){
        this.content = content;
        this.type = type;
    }

    public String getContent(){
        return content;
    }

    public int getType(){
        return type;
    }
}

 ```
我们分别定义了2个常量和2个变量 来处理我们的消息逻辑 
 ## 适配器 
-  #### 适配器item.xml布局
```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_content"
    ohos:width="match_parent"
    ohos:orientation="vertical">
   <DirectionalLayout
       ohos:id="$+id:left_layout"
       ohos:height="match_content"
       ohos:width="match_content"
       ohos:layout_alignment="left"
        ohos:background_element="$graphic:background_blue"
       ohos:left_margin="5vp"
       ohos:visibility="visible"
       ohos:top_margin="10vp"
       >

   <Text
       ohos:id="$+id:left_msg"
       ohos:height="match_content"
       ohos:width="match_content"
       ohos:text="哈哈哈测试"
       ohos:text_color="#fff"
       ohos:text_size="20vp"
       ohos:margin="10vp"
       >
   </Text>

   </DirectionalLayout>



    <DirectionalLayout
        ohos:id="$+id:right_Layout"
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:layout_alignment="right"
        ohos:background_element="$graphic:background_red"
        ohos:right_margin="5vp"
        ohos:visibility="visible"
        >
        <Text
            ohos:id="$+id:right_msg"
            ohos:height="match_content"
            ohos:width="match_content"
            ohos:text="哈哈哈测试"
            ohos:text_color="#fff"
            ohos:text_size="20vp"
            ohos:margin="10vp"
            >
        </Text>
    </DirectionalLayout>
</DirectionalLayout>
```
- #### item 布局预览效果
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-7081e0236feeb6b1.png)
-  ####  适配器逻辑代码
```
package com.example.imdemo.provider;
import com.example.imdemo.ResourceTable;
import com.example.imdemo.bean.Msg;
import ohos.aafwk.ability.Ability;
import ohos.agp.components.*;

import java.util.List;

public class MyProvider extends BaseItemProvider {

    private List<Msg> list;
    private Ability  ability;


    public MyProvider(List<Msg> list, Ability ability) {
        this.list = list;
        this.ability = ability;
    }

    @Override
    public int getCount() {
        return list.size();
    }

    @Override
    public Object getItem(int i) {
        return list.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public Component getComponent(int i, Component component, ComponentContainer componentContainer) {

        ViewHodler hodler=null;
        Msg msg = list.get(i);
        if (component== null) {
            component = LayoutScatter.getInstance(ability).parse(ResourceTable.Layout_item,null,false);
            hodler=new ViewHodler();
            hodler.leftLayout = (DirectionalLayout) component.findComponentById(ResourceTable.Id_left_layout);
            hodler.rightLayout = (DirectionalLayout) component.findComponentById(ResourceTable.Id_right_Layout);
            hodler.leftMsg = (Text) component.findComponentById(ResourceTable.Id_left_msg);
            hodler.rightMsg = (Text) component.findComponentById(ResourceTable.Id_right_msg);
           component.setTag(hodler);
        } else {
           hodler= (ViewHodler) component.getTag();
        }
        System.out.println("type--- >  "+msg.getType());
        if(msg.getType()==Msg.RECEIVED){
            System.out.println("左边消息");
            //如果是收到的消息，则显示左边消息布局，将右边消息布局隐藏
            hodler.leftLayout.setVisibility(0);
            hodler.rightLayout.setVisibility(1);
            hodler.leftMsg.setText(msg.getContent());
        }else if(msg.getType()==Msg.SENT){
            System.out.println("右边消息");
            //如果是发出去的消息，显示右边布局的消息布局，将左边的消息布局隐藏
            hodler.rightLayout.setVisibility(0);
            hodler.leftLayout.setVisibility(1);
            hodler.rightMsg.setText(msg.getContent());
        }
        return  component;
    }

    class ViewHodler{
        DirectionalLayout leftLayout;
        DirectionalLayout rightLayout;
        Text leftMsg;
        Text rightMsg;

    }
}
```
我们通过在  getComponent 方法中通过小标i来遍历集合然后拿到里面每一个对应里面的 type属性来判断是显示左边布局还是右边布局  也就是对应的发送消息和接收消息的UI 我们通过简单布局显示影藏来实现消息的左右2边显示效果 到此整个仿微信聊天的布局UI效果就讲完了 。
##  最后总结
鸿蒙的仿微信聊天UI效果 实现起来相对比较简单  其实还有一种办法那就是  ListContainer的多布局也是通过bean来里面的标识来显示左右不同的布局来实现聊天界面的效果  因为篇幅有限这里就不展开讲了有兴趣的同学可以私下研究 最后希望我的文章能帮助到各位解决问题 ，以后我还会贡献更多有用的代码分享给大家。各位同学如果觉得文章还不错 ，麻烦给关注和star，小弟在这里谢过啦
## 项目地址：
码云 https://gitee.com/qiuyu123/hms_im_demo