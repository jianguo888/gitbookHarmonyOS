# 前言：
各位同学大家好。有段时间没有给大家更新文章了，具体多久呢我也记不清楚了哈，最近又在看鸿蒙相关的文档 学习了一些鸿蒙里面dialog的用法。所以今天就出一篇dialog的文章分享给大家，那么废话不多说我们正式开始。
## 准备工作：
1 安装鸿蒙开发环境 大家可以看我之前的文章
华为鸿蒙系统开发初体验 ：[[https://www.jianshu.com/p/f94c847c7fdc]](https://www.jianshu.com/p/f94c847c7fdc%5D)
## 效果图：
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-e777ffb7ab6040ca.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-5d5a4e88784077cb.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-f206ef01d3b3dffe.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-4453e370fa91a346.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-27483de20414eea2.png)
## 具体实现 
- #### main_ability_slice 布局文件 
```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:width="match_parent"
    ohos:height="match_parent"
    ohos:orientation="vertical">

    <Button
            ohos:id="$+id:common_dialog"
            ohos:text="普通的弹窗"
            ohos:width="match_parent"
            ohos:text_size="15fp"
            ohos:left_margin="20vp"
            ohos:right_margin="20vp"
            ohos:padding="10vp"
            ohos:background_element="$graphic:button_background"
            ohos:layout_alignment="horizontal_center"
            ohos:top_margin="20vp"
            ohos:height="match_content"/>

    <Button
            ohos:id="$+id:list_dialog"
            ohos:text="列表单选弹窗"
            ohos:width="match_parent"
            ohos:left_margin="20vp"
            ohos:right_margin="20vp"
            ohos:padding="10vp"
            ohos:text_size="15fp"
            ohos:background_element="$graphic:button_background"
            ohos:layout_alignment="horizontal_center"
            ohos:top_margin="20vp"
            ohos:height="match_content"/>

    <Button
            ohos:id="$+id:multiselect_dialog"
            ohos:text="列表多选弹窗"
            ohos:width="match_parent"
            ohos:background_element="$graphic:button_background"
            ohos:text_size="15fp"
            ohos:left_margin="20vp"
            ohos:right_margin="20vp"
            ohos:padding="10vp"
            ohos:top_margin="20vp"
            ohos:layout_alignment="horizontal_center"
            ohos:height="match_content"/>

    <Button
            ohos:id="$+id:custom_dialog"
            ohos:text="自定义弹窗"
            ohos:width="match_parent"
            ohos:background_element="$graphic:button_background"
            ohos:text_size="15fp"
            ohos:left_margin="20vp"
            ohos:right_margin="20vp"
            ohos:padding="10vp"
            ohos:layout_alignment="horizontal_center"
            ohos:top_margin="20vp"
            ohos:height="match_content"/>

    <Text
            ohos:id="$+id:result_text"
            ohos:width="match_content"
            ohos:text_size="15fp"
            ohos:layout_alignment="horizontal_center"
            ohos:top_margin="50vp"
            ohos:height="match_content"/>
</DirectionalLayout>
```
- #### 布局效果 
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-e777ffb7ab6040ca.png)
我们写了几个button点击的时候来触发我们不同的弹窗 方便我们测试  
- #### 普通的dialog
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-5d5a4e88784077cb.png)
```
  CommonDialog commonDialog = new CommonDialog(this);
        commonDialog.setTitleText("这是一个普通弹窗");
        commonDialog.setContentText("你要确认要退出应用吗");
        commonDialog.setCornerRadius(DIALOG_BOX_CORNER_RADIUS);
        commonDialog.setAlignment(TextAlignment.CENTER);
        commonDialog.setSize(DIALOG_BOX_WIDTH, MATCH_CONTENT);
        commonDialog.setAutoClosable(true);
        commonDialog.setButton(IDialog.BUTTON1, "确认", (iDialog, var) -> {
            resultText.setText("您确认了");
            iDialog.destroy();
        });
        commonDialog.setButton(IDialog.BUTTON2, "取消", (iDialog, var) -> {
            resultText.setText("您取消了");
            iDialog.destroy();
        });
        commonDialog.show();
```
  我们实例化  CommonDialog  后分别调用 CommonDialog  里面的方法设置title, ContentText   CornerRadius ,Alignment  等等属性 突然后调用 commonDialog.show() 来显示  这就是我们平常见到退出弹窗的一个简单例子 
- #### 单选列表dialog 
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-f206ef01d3b3dffe.png)
```
 String[] items = new String[]{"item 1", "item 2", "item 3"};
        ListDialog listDialog = new ListDialog(this);
        listDialog.setAlignment(TextAlignment.CENTER);
        listDialog.setSize(DIALOG_BOX_WIDTH, MATCH_CONTENT);
        listDialog.setTitleText("这是单选框弹窗");
        listDialog.setAutoClosable(true);
        listDialog.setItems(items);
        listDialog.setOnSingleSelectListener((iDialog, index) -> {
            resultText.setText(items[index]);
            iDialog.destroy();
        });
        listDialog.show();
```
我们这边定义了一个  items 数组来模拟选择的多条数据 ，然后我们实例化 ListDialog  分别设置title., size  Alignment 等数据，还有设置数据源    listDialog.setItems(items);   最后我们需要调用 
listDialog.show(); 方法来显示 然后我们在 setOnSingleSelectListenerde的回调方法里面来处理我们点击返回选择数据数组的下标方便我们获取我们选择的数据
- #### 多选框列表dialog
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-4453e370fa91a346.png)
```
    String[] itemsString = new String[]{"item 1", "item 2", "item 3", "item 4"};
        boolean[] areSelected = new boolean[]{false, false, false, false};
        List<String> selectedItems = new ArrayList<>();
        ListDialog listDialog = new ListDialog(this);
        listDialog.setTitleText("这是多选框弹窗");
        listDialog.setAlignment(TextAlignment.CENTER);
        listDialog.setSize(DIALOG_BOX_WIDTH, MATCH_CONTENT);
        listDialog.setAutoClosable(true);
        listDialog.setMultiSelectItems(itemsString, areSelected);
        listDialog.setOnMultiSelectListener((iDialog, index, isSelected) ->
                multiSelect(itemsString[index], selectedItems, listDialog.getItemComponent(index)));
        listDialog.setDialogListener(() -> {
            resultText.setText("");
            for (String selectedItem : selectedItems) {
                resultText.append(selectedItem);
            }
            return false;
        });
        listDialog.show();
```
同上我们顶一个itemsString  数组来模拟器数据   然后定义一个 areSelected  数组来判断是否被选中
我们同上实例化 ListDialog  设置 Title , Alignment, Size 等属性  我们在添加数据的时候需要     listDialog.setMultiSelectItems(itemsString, areSelected); 调用这个方法来传入数据和是否被选中的数组 
然后我们调用  listDialog.show(); 来显示  我们在 setOnMultiSelectListener 回调里面来获取选中的下标方便我们来处理选中的数据
- #### 自定义dialog 
CustomDialog 布局文件 
```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:id="$+id:customDialogContent"
    ohos:width="match_content"
    ohos:height="match_content"
    ohos:padding="10vp"
    ohos:orientation="vertical">

    <Text
            ohos:id="$+id:title_text"
            ohos:width="match_content"
            ohos:height="match_content"
            ohos:text_size="20vp"
            ohos:layout_alignment="horizontal_center"/>

    <DirectionalLayout
            ohos:width="match_content"
            ohos:height="match_content"
            ohos:layout_alignment="horizontal_center"
            ohos:orientation="horizontal"
            ohos:top_margin="10vp">

        <TextField
                ohos:id="$+id:num_1_textfield"
                ohos:text_size="20fp"
                ohos:width="40vp"
                ohos:left_margin="10vp"
                ohos:layout_alignment="horizontal_center"
                ohos:padding="5vp"
                ohos:background_element="$graphic:textfield_background"
                ohos:height="40vp"/>

        <TextField
                ohos:id="$+id:num_2_textfield"
                ohos:text_size="20fp"
                ohos:width="40vp"
                ohos:padding="5vp"
                ohos:left_margin="10vp"
                ohos:background_element="$graphic:textfield_background"
                ohos:height="40vp"/>

        <TextField
                ohos:id="$+id:num_3_textfield"
                ohos:text_size="20fp"
                ohos:width="40vp"
                ohos:padding="5vp"
                ohos:left_margin="10vp"
                ohos:background_element="$graphic:textfield_background"
                ohos:height="40vp"/>

        <TextField
                ohos:id="$+id:num_4_textfield"
                ohos:text_size="20fp"
                ohos:width="40vp"
                ohos:padding="5vp"
                ohos:left_margin="10vp"
                ohos:background_element="$graphic:textfield_background"
                ohos:height="40vp"/>

        <TextField
                ohos:id="$+id:num_5_textfield"
                ohos:text_size="20fp"
                ohos:width="40vp"
                ohos:left_margin="10vp"
                ohos:padding="5vp"
                ohos:background_element="$graphic:textfield_background"
                ohos:height="40vp"/>

        <TextField
                ohos:id="$+id:num_6_textfield"
                ohos:text_size="20fp"
                ohos:left_margin="10vp"
                ohos:width="40vp"
                ohos:padding="5vp"
                ohos:background_element="$graphic:textfield_background"
                ohos:height="40vp"/>
    </DirectionalLayout>

    <Button
            ohos:id="$+id:confirm_button"
            ohos:width="match_content"
            ohos:height="match_content"
            ohos:text="确认"
            ohos:text_size="20vp"
            ohos:top_margin="10vp"
            ohos:layout_alignment="horizontal_center"/>
</DirectionalLayout>
```
##### 布局效果
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-5a9eb1ee6cf7cf8e.png)
自定义  CustomDialog 实现
 ```
package ohos.samples.dialog.custom;

import static ohos.samples.dialog.slice.MainAbilitySlice.DIALOG_BOX_CORNER_RADIUS;
import static ohos.samples.dialog.slice.MainAbilitySlice.DIALOG_BOX_WIDTH;
import static ohos.agp.components.ComponentContainer.LayoutConfig.MATCH_CONTENT;
import ohos.samples.dialog.ResourceTable;
import ohos.agp.components.Component;
import ohos.agp.components.LayoutScatter;
import ohos.agp.components.Text;
import ohos.agp.components.TextField;
import ohos.agp.utils.TextAlignment;
import ohos.agp.window.dialog.CommonDialog;
import ohos.app.Context;

import java.util.regex.Pattern;

/**
 * CustomDialog
 * 类说明 自定义dialog
 *
 *
 */
public class CustomDialog extends CommonDialog {
    private static final String PATTERN = "^\\d{1}$";
    private Component customComponent;
    private TextField checkCode1;
    private TextField checkCode2;
    private TextField checkCode3;
    private TextField checkCode4;
    private TextField checkCode5;
    private TextField checkCode6;
    private Text titleText;
    private Component confirmButton;
    private ConfirmListener confirmListener;
    private Context context;

    /**
     * CustomDialog
     *
     * @param abilityContext Context
     */
    public CustomDialog(Context abilityContext) {
        super(abilityContext);
        this.context = abilityContext;
        initComponents();
        setCornerRadius(DIALOG_BOX_CORNER_RADIUS);
        setAlignment(TextAlignment.CENTER);
        setSize(DIALOG_BOX_WIDTH, MATCH_CONTENT);
    }
    private void initComponents() {
        customComponent = LayoutScatter.getInstance(context)
                .parse(ResourceTable.Layout_custom_dialog_content, null, true);
        checkCode1 = (TextField) customComponent.findComponentById(ResourceTable.Id_num_1_textfield);
        checkCode2 = (TextField) customComponent.findComponentById(ResourceTable.Id_num_2_textfield);
        checkCode3 = (TextField) customComponent.findComponentById(ResourceTable.Id_num_3_textfield);
        checkCode4 = (TextField) customComponent.findComponentById(ResourceTable.Id_num_4_textfield);
        checkCode5 = (TextField) customComponent.findComponentById(ResourceTable.Id_num_5_textfield);
        checkCode6 = (TextField) customComponent.findComponentById(ResourceTable.Id_num_6_textfield);
        titleText = (Text) customComponent.findComponentById(ResourceTable.Id_title_text);
        confirmButton = customComponent.findComponentById(ResourceTable.Id_confirm_button);
        setObserver(checkCode1, checkCode2);
        setObserver(checkCode2, checkCode3);
        setObserver(checkCode3, checkCode4);
        setObserver(checkCode4, checkCode5);
        setObserver(checkCode5, checkCode6);
        setObserver(checkCode6, null);
        super.setContentCustomComponent(customComponent);
        confirm();
    }
    /**
     * set title
     *
     * @param string String
     */
    public void setTitle(String string) {
        titleText.setText(string);
    }
    private void setObserver(TextField textField, Component textFieldNext) {
        textField.addTextObserver((string, start, before, count) -> matchNumber(string, textField, textFieldNext));
    }

    private void matchNumber(String string, TextField textField, Component textFieldNext) {
        boolean isMatch = Pattern.matches(PATTERN, string);
        if (isMatch) {
            textField.setText(string);
        }
        if (textFieldNext != null) {
            textFieldNext.requestFocus();
        }
    }
    private String getContent() {
        return "" + checkCode1.getText() + checkCode2.getText()
                + checkCode3.getText() + checkCode4.getText() + checkCode5.getText() + checkCode6.getText();
    }
    private void confirm() {
        confirmButton.setClickedListener(component -> {
            if (confirmListener != null) {
                confirmListener.onConfirmListener(getContent());
            }
        });
    }
    /**
     * setOnConfirmListener
     *
     * @param confirm ConfirmListener
     */
    public void setOnConfirmListener(ConfirmListener confirm) {
        confirmListener = confirm;
    }
}
 ```
我们CustomDialog 继承我们的 CommonDialog 然后我们在构造方法中传入上下文 然后我们  初始化布局中各个空间 我们提供了  setTitle 方法给外部来设置顶部的title 还有 setOnConfirmListener 回调方法来处理我们结果  
-  ####具体调用 
```
  CustomDialog customDialog = new CustomDialog(this);
        customDialog.setTitle("这是一个自定义弹窗");
        customDialog.setAutoClosable(true);
        customDialog.setOnConfirmListener(string -> {
            resultText.setText(string);
            customDialog.destroy();
        });
        customDialog.show();
```
自定义dialog 属性就看我们的自己封装了,我们可以在 CustomDialog类中完成 这样我们的调用代码就相对简洁 。当然我们也可以尽量封装的更好拓展一点 这具体需求和个人设计了
到此 鸿蒙的dialog用法我们就讲完了
##  最后总结 
鸿蒙里面的 dialog 无论是  自定义的 dialog 还是 listdialog  其实我们观察源码都是集成 CommonDialog
所有我们上面提到 多选listdialog 和多选listdialog 我们都可以同过自定义dilaog来实现的 因为篇幅有限这里就不展开讲了有兴趣同学可以私下研究  最后希望我的文章能帮助到各位解决问题 ，以后我还会贡献更多有用的代码分享给大家。各位同学如果觉得文章还不错 ，麻烦给关注和star，小弟在这里谢过啦