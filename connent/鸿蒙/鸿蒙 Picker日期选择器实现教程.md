## 前言 ：
各位同学大家好，有段时间没有给大家更新文章了，具体多久呢我也记不清楚了。最近又去鸿蒙开发社区看了一看 有get一些新知识点 我觉得有必要给大家分享下 今天就给大家分享一个Picker 配合CommonDialog 实现的 日期选择器 
## 效果图
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-72e173d5b77c26f7.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-4223ba7b0b92052c.png)
## 具体实现  
```
package com.example.picker.dialog;

import com.example.picker.ResourceTable;
import com.example.picker.listener.PickerdialogListener;
import ohos.aafwk.ability.Ability;
import ohos.agp.components.Button;
import ohos.agp.components.Component;
import ohos.agp.components.LayoutScatter;
import ohos.agp.components.Picker;
import ohos.agp.window.dialog.CommonDialog;
import ohos.app.Context;


/***
 *  创建人： xuqing
 *  创建时间：2021年3月19日15:18:33
 *  类说明：底部选择器弹窗
 *
 */
public class PickerDialog extends CommonDialog implements Component.ClickedListener {
    private Ability context;
    private PickerdialogListener  listener;
    private Picker picker ;
    private Button cancelbtn,affirmbtn;
    private String getdata;
    private  String[]getStr={"星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"};
    Component layout;
    public PickerDialog(Ability context, PickerdialogListener  listener) {
        super(context);
        this.context=context;
        this.listener=listener;
    }

    @Override
    protected void onCreate() {
        super.onCreate();
        layout = LayoutScatter.getInstance(context).
                parse(ResourceTable.Layout_common_dialog, null, true);
      setTransparent(true);
       setContentCustomComponent(layout);
       initview();
    }

    private void initview() {
         picker= (Picker)layout.findComponentById(ResourceTable.Id_test_picker);
        cancelbtn= (Button) layout.findComponentById(ResourceTable.Id_cancel_btn);
        affirmbtn= (Button) layout.findComponentById(ResourceTable.Id_affirm_btn);
        cancelbtn.setClickedListener(this);
        affirmbtn.setClickedListener(this);
        picker.setDisplayedData(getStr);
        picker.setValueChangedListener(new Picker.ValueChangedListener() {
            @Override
            public void onValueChanged(Picker picker, int i, int i1) {

                System.out.println("i  -- > "+i+" i1 --- > "+ i1);
                System.out.println(getStr[i1]);

            }
        });

        picker.setValueChangedListener((picker1, oldVal, newVal) -> {
            // oldVal:上一次选择的值； newVal：最新选择的值
            System.out.println("oldVal  "+oldVal +"newVal   --- > "+newVal);
            System.out.println("getstr  ---  > "+getStr[newVal]);
            getdata=getStr[newVal];
        });

        picker.setFormatter(i -> {
            String value;
            switch (i) {
                case 0:
                    value = "Mon";
                    break;
                case 1:
                    value = "Tue";
                    break;
                case 2:
                    value = "Wed";
                    break;
                case 3:
                    value = "Thu";
                    break;
                case 4:
                    value = "Fri";
                    break;
                case 5:
                    value = "Sat";
                    break;
                case 6:
                    value = "Sun";
                    break;
                default:
                    value = "" + i;
            }
            return value;
        });

    }


    @Override
    public void onClick(Component component) {
        switch (component.getId()){
            case ResourceTable.Id_affirm_btn:
                PickerDialog.this.hide();
                listener.getPickerStrSuccess(getdata);
                break;
            case ResourceTable.Id_cancel_btn:
               PickerDialog.this.hide();
                listener.getPickerStrerror();
                break;
            default:
                break;
        }
    }
}
```
PickerDialog 继承sdk的 CommonDialog  并重写 oncreate 方法 和自己的构造方法 然后我们加载了PickerDialog  的布局文件
```
<?xml version="1.0" encoding="utf-8"?>

    <DirectionalLayout
        xmlns:ohos="http://schemas.huawei.com/res/ohos"
        ohos:height="300vp"
        ohos:width="match_parent"
        ohos:horizontal_center="true"
        ohos:vertical_center="true"
        ohos:orientation="vertical"
        >

      <DirectionalLayout
          ohos:height="50vp"
          ohos:width="match_parent"
          ohos:orientation="horizontal"
          >
          <Button
          ohos:id="$+id:cancel_btn"
          ohos:height="match_parent"
          ohos:width="0vp"
          ohos:weight="1"
          ohos:text="取消"
          ohos:text_size="20vp"
          ohos:text_color="#FF171818"
          >
      </Button>
          <Button
              ohos:id="$+id:affirm_btn"
              ohos:height="match_parent"
              ohos:width="0vp"
              ohos:weight="1"
              ohos:text="确定"
               ohos:text_size="20vp"
              ohos:text_color="#FF171818"
              >
          </Button>
      </DirectionalLayout>
      <Picker
        ohos:id="$+id:test_picker"
        ohos:height="match_parent"
        ohos:width="match_parent"
        ohos:background_element="#E1FFFF"
        ohos:vertical_center="true"
        ohos:horizontal_center="true"
        ohos:normal_text_size="16fp"
        ohos:selected_text_size="16fp"/>

    </DirectionalLayout>
```
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-6b1e315876c1d899.png)
这边我们写了2个button 和一个picker 选择器组件 我们在PickerDialog 中填充我们的布局文件 然后初始化我们的控件  
- 加载布局 
```
    @Override
    protected void onCreate() {
        super.onCreate();
        layout = LayoutScatter.getInstance(context).
                parse(ResourceTable.Layout_common_dialog, null, true);
      setTransparent(true);
       setContentCustomComponent(layout);
       initview();
    }
```
- 初始化控件 
```
  picker= (Picker)layout.findComponentById(ResourceTable.Id_test_picker);
 cancelbtn= (Button) layout.findComponentById(ResourceTable.Id_cancel_btn);
  affirmbtn= (Button) layout.findComponentById(ResourceTable.Id_affirm_btn);
 cancelbtn.setClickedListener(this);
  affirmbtn.setClickedListener(this);
```
- 选择器添加数据  
```
private  String[]getStr={"星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"};
 picker.setDisplayedData(getStr);
```
- 响应选择器变化
```
    picker.setValueChangedListener((picker1, oldVal, newVal) -> {
            // oldVal:上一次选择的值； newVal：最新选择的值
            System.out.println("oldVal  "+oldVal +"newVal   --- > "+newVal);
            System.out.println("getstr  ---  > "+getStr[newVal]);
            getdata=getStr[newVal];
        });
```
- 格式化Picker的显示 通过Picker的setFormatter(Formatter formatter)方法，用户可以将Picker选项中显示的字符串修改为特定的格式。
```
  picker.setFormatter(i -> {
            String value;
            switch (i) {
                case 0:
                    value = "Mon";
                    break;
                case 1:
                    value = "Tue";
                    break;
                case 2:
                    value = "Wed";
                    break;
                case 3:
                    value = "Thu";
                    break;
                case 4:
                    value = "Fri";
                    break;
                case 5:
                    value = "Sat";
                    break;
                case 6:
                    value = "Sun";
                    break;
                default:
                    value = "" + i;
            }
            return value;
        });
```
## 在MainAbility 中显示
```
package com.example.picker;

import com.example.picker.dialog.PickerDialog;
import com.example.picker.listener.PickerdialogListener;
import com.example.picker.slice.MainAbilitySlice;
import ohos.aafwk.ability.Ability;
import ohos.aafwk.content.Intent;
import ohos.agp.components.Button;
import ohos.agp.components.Component;
import ohos.agp.components.TableLayout;
import ohos.agp.components.Text;

import static ohos.agp.utils.LayoutAlignment.BOTTOM;

public class MainAbility extends Ability {
    private Button button;
    private Text text;
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_ability_main);
        initview();
    }

    private void initview() {
        button= (Button) findComponentById(ResourceTable.Id_mainbtn);
        text= (Text) findComponentById(ResourceTable.Id_miantext);
        if(button!=null){
            button.setClickedListener(new Component.ClickedListener() {
                @Override
                public void onClick(Component component) {
                    PickerDialog dialog=new PickerDialog(MainAbility.this, new PickerdialogListener() {
                        @Override
                        public void getPickerStrSuccess(String str) {
                            text.setText(str);
                        }

                        @Override
                        public void getPickerStrerror() {

                        }
                    });
                    dialog.setAlignment(BOTTOM);
                    dialog.show();

                }
            });
        }
    }
}
```
MainAbility 布局文件 
```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">
    <Button
        ohos:id="$+id:mainbtn"
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:layout_alignment="center"
        ohos:text="点击打开弹窗"
        ohos:text_size="15fp"
        ohos:top_margin="20vp"
        ohos:background_element="$graphic:background_ability_main"
        >
    </Button>
    <Text
        ohos:id="$+id:miantext"
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:layout_alignment="center"
        ohos:top_margin="20vp"
        ohos:text="哈哈哈"
        ohos:text_size="15fp"
        >
    </Text>
</DirectionalLayout>
```
到此鸿蒙 Picker日期选择器实现教程 就讲完了。
## 最后总结
鸿蒙里面提供了picker选择器控件给我们用 所以我们配合sdk提供的 CommonDialog 弹窗控件 就很容易实现比较简单的底部的日期选择器 。整个功能实现比较接近原生安卓 但是又比安卓更进一步所以 实现起来不难 有兴趣的同学还可以尝试实现更为复杂多样的选择 这边就不展开讲了 。最后希望我的文章能帮助到各位解决问题 ，以后我还会贡献更多有用的代码分享给大家。各位同学如果觉得文章还不错 ，麻烦给关注和star，小弟在这里谢过啦!
##  项目地址
码云： https://gitee.com/qiuyu123/pickerdialogdemo