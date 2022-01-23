## 前言：
各位同学大家好 有段时间没有给大家更新文章了 （因为之前一直在忙购房贷款的事情 所以停更 实在不好意思）今天要讲的是鸿蒙里面轻量级数据  DatabaseHelper基本用法一些技巧 那么废话不多说我们正式开始  
## 效果图 
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-2cbecdb84dc2dbd8.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-41f26b59289f1996.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-f450d3d210495865.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-41024521ed397be1.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-27af47d1f1c6e011.png)
## 1介绍
轻量级偏好数据库是轻量级存储，主要用于保存应用的一些常用配置。它是使用键值对的形式来存储数据的，保存数据时，需要给这条数据提供一个键，读取数据时再通过这个键把对应的值取出来。
#### 说明
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-792cf63292d97104.png)
通过观察源码 轻量级偏好数据库值的存储数据类型包括整型、长整型、浮点型、布尔型、字符串型、字符串型Set集合。数据存储在本地文件中，同时也加载在内存中，不适合需要存储大量数据和频繁改变数据的场景，建议存储的数据不超过一万条。
## 2 创建数据库
创建数据库使用数据库操作的辅助类[DatabaseHelper](https://developer.harmonyos.com/cn/docs/documentation/doc-references/databasehelper-0000001054678767)，通过DatabaseHelper的getPreferences(String name)方法可以获取到对应文件名的[Preferences](https://developer.harmonyos.com/cn/docs/documentation/doc-references/preferences-0000001054358793)实例，再通过Preferences提供的方法进行数据库的相关操作。
DatabaseHelper的构造需要传入context，[Ability](https://developer.harmonyos.com/cn/docs/documentation/doc-references/ability-0000001054120007)和[AbilitySlice](https://developer.harmonyos.com/cn/docs/documentation/doc-references/abilityslice-0000001054678680)都实现了[ohos.app.Context](https://developer.harmonyos.com/cn/docs/documentation/doc-references/context-0000001054440065)接口。因此可以从应用中的Ability或AbilitySlice调用getContext()方法来获得context。
Preferences的数据存储在文件中，因此需要指定存储的文件名，其取值不能为空，也不能包含路径，默认存储目录可以通过Context.getPreferencesDir()获取。
```
DatabaseHelper databaseHelper = new DatabaseHelper(context);  
String filename = "pdb";  
Preferences preferences = databaseHelper.getPreferences(filename);
```
## 3 写入数据 
我们这边在拿到输入框输入的数字和文字 然后在按钮点击的是调用preferences 里面put 方法将数据存储起来 
通过Preferences的putString(String var1, String var2)和putInt(String var1, int var2)方法可以将数据写入Preferences实例，通过flush()或者flushSync()将Preferences实例持久化。
flush()会立即更改内存中的Preferences对象，但会将更新异步写入磁盘。flushSync()更改内存中的数据的同时会将数据同步写入磁盘。由于flushSync()是同步的，建议不要从主线程调用它，以避免界面卡顿。
```
  /***
     *  写入数据
     *
     *
     */
    private void btnWrite() {
        btnWrite.setClickedListener(new Component.ClickedListener() {
            @Override
            public void onClick(Component component) {
                String fruit = textFiledFruit.getText();
                try {
                    int number = Integer.parseInt(textFiledNumber.getText());
                    preferences.putInt("number",number);
                    preferences.putString("fruit",fruit);
                    preferences.flush();
                    new ToastDialog(context).setText("Write to DB file success").show();
                } catch (NumberFormatException e) {
                    new ToastDialog(context).setText("Please input number in Number row").show();
                }
            }
        });
    }
```
 ## 4 读取数据
我们通过调用 preferences  中的get方法来获取存储在DataBase库中的数据   
通过Preferences的getString(String var1, String var2)和getInt(String var1, int var2)方法传入键来获取对应的值；如果键不存在，则返回默认值。
例如获取上述fruit和number键的值，如果fruit和number键不存在，则会分别返回""和0值。通过默认值的设置，来避免程序出现异常。
```
    /***
     *
     * 读取数据
     *
     */
    private void btnRead() {
        btnRead.setClickedListener(new Component.ClickedListener() {
            @Override
            public void onClick(Component component) {
                String string = String.format(Locale.ENGLISH,"Fruit: %s,Number: %d",
                        preferences.getString("fruit", ""),preferences.getInt("number", 0));
                new ToastDialog(context).setText(string).show();
            }
        });
    }
```

## 5  删除数据库
通过DatabaseHelper的deletePreferences(String name)方法删除指定文件。
删除指定文件时，应用不允许再使用该实例进行数据操作，否则会出现数据一致性问题。以删除上述名称为"pdb"的文件为例。

```
  /**
     * 删除数据
     *
     */
    private void btnDelete() {
        btnDelete.setClickedListener(new Component.ClickedListener() {
            @Override
            public void onClick(Component component) {
                if (databaseHelper.deletePreferences(filename)) {
                    preferences.clear();
                    new ToastDialog(context).setText("Delete DB file success").show();
                } else {
                    new ToastDialog(context).setText("Delete DB file failed").show();
                }
            }
        });
    }
```
#### 说明 
轻量级偏好数据库支持数据库文件的创建、移动，数据的查询、插入、删除，以及支持注册观察者来观察数据是否发生变化。详细信息可参考[轻量级偏好数据库](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/database-preference-overview-0000000000030086)。
## 6 缓存list 数据 
通过观察源码我们发现 DatabaseHelper轻量级数据库是没有办法直接存储我们的list集合 这个是我们该怎么办 我们通过将List转成json字符串 然后将json存起来 我们在取值的拿到json字符串在还原成list就可以实现了 为了方便演示我们这边写了一个工具类
- ##### 1存储list的方法 
 ```
    /**
     * 4.存储list
     */
    public static void putSelectBean(Context context, List<UserBean> phoneList, String key) {
        databaseHelper = new DatabaseHelper(context);
        preferences = databaseHelper.getPreferences(filename);
        Gson gson = new Gson();
        String json = gson.toJson(phoneList);
        preferences.putString(key, json);
        preferences.flush();
    }
 ```
我们写了一个  putSelectBean 来存储我们的list  
  - ##### 2读取 list的方法
```
   /**
     * 读取list
     */
    public static List<UserBean> getSelectBean(Context context, String key) {
        databaseHelper = new DatabaseHelper(context);
        preferences = databaseHelper.getPreferences(filename);
        Gson gson = new Gson();
        String json = preferences.getString(key, null);
        Type type = new TypeToken<List<UserBean>>() {
        }.getType();
        List<UserBean> arrayList = gson.fromJson(json, type);
        return arrayList;
    }
```
- ##### 3具体存储list调用  
```
    /***
     *
     * 缓存list 集合类型数据
     *
     */
    private void btnSavelist() {

      btnsavelist.setClickedListener(new Component.ClickedListener() {
          @Override
          public void onClick(Component component) {
              UserBean userBean=new UserBean();
              userBean.setUsername("test");
              userBean.setPassword("123456");
              List<UserBean> datalist=new ArrayList<>();
              datalist.add(userBean);
              DataBaseUtil.putSelectBean(context,datalist,"datalist");
              new ToastDialog(context).setText("写入成功").show();

          }
      });
    }
```
- ##### 4读取list类型数据调用
```
     /***
     *
     * 读取list 集合类型数据
     *
     */

    private  void  btnReadList(){
        btn_read_list.setClickedListener(new Component.ClickedListener() {
            @Override
            public void onClick(Component component) {

                List<UserBean>getData= (List<UserBean>) DataBaseUtil.getSelectBean(context,"datalist");
                UserBean userBean= getData.get(0);
                new ToastDialog(context).setText(userBean.getUsername()+userBean.getPassword()).show();
            }
        });
    }
```
## 7 DatabaseHelper存储的简单封装  
我们在使用 DatabaseHelper的时候每次都要  
```
DatabaseHelper databaseHelper = new DatabaseHelper(context);  
String filename = "pdb";  
Preferences preferences = databaseHelper.getPreferences(filename);
```
然后调用 preferences  的put方法存储 和get方法读取 代码显得不是很简洁 我们做一个简单的工具类封装即可
-  ##### 1存储方法的封装  
```
 private static  String filename = "pdb";
    private static  Preferences preferences;
    private static  DatabaseHelper databaseHelper;

    /**
     * 保存数据的方法，我们需要拿到保存数据的具体类型，然后根据类型调用不同的保存方法


     *
     * @param context
     * @param key
     * @param object
     * @param ：DataBaseUtil.setParam(this, "key", "value");
     *                                               key -- userid / accountId obj==
     */
    public static void setParam(Context context, String key, Object object) {
        String type = "String";
        if (object != null) {
            type = object.getClass().getSimpleName();
        }
        databaseHelper = new DatabaseHelper(context);
        preferences = databaseHelper.getPreferences(filename);

        if ("String".equals(type)) {
            preferences.putString(key, (String) object);
        } else if ("Integer".equals(type) || "int".equals(type)) {
            preferences.putInt(key, (Integer) object);
        } else if ("Boolean".equals(type) || "boolean".equals(type)) {
            preferences.putBoolean(key, (Boolean) object);
        } else if ("Float".equals(type) || "float".equals(type)) {
            preferences.putFloat(key, (Float) object);
        } else if ("Long".equals(type) || "long".equals(type)) {
            preferences.putLong(key, (Long) object);
        }
        preferences.flush();
    }
```
- ##### 2 读取方法的简单封装 
```
    /**
     * 得到保存数据的方法，我们根据默认值得到保存的数据的具体类型，然后调用相对于的方法获取值
     *
     * @param context
     * @param key                                             关键字
     * @param defaultObject                                   若取回空值则返回此默认值
     * @param ：DataBaseUtil.getParam(Activity.this, "key", "defaultValue");
     * @return
     */
    public static Object getParam(Context context, String key, Object defaultObject) {
        String type = "String";
        if (defaultObject != null) {
            type = defaultObject.getClass().getSimpleName();
        }
        databaseHelper = new DatabaseHelper(context);
        preferences = databaseHelper.getPreferences(filename);
        if ("String".equals(type)) {
            return preferences.getString(key, (String) defaultObject);
        } else if ("Integer".equals(type) || "int".equals(type)) {
            return preferences.getInt(key, (Integer) defaultObject);
        } else if ("Boolean".equals(type) || "boolean".equals(type)) {
            return preferences.getBoolean(key, (Boolean) defaultObject);
        } else if ("Float".equals(type) || "float".equals(type)) {
            return preferences.getFloat(key, (Float) defaultObject);
        } else if ("Long".equals(type) || "long".equals(type)) {
            return preferences.getLong(key, (Long) defaultObject);
        }
        return null;
    }
```
- ##### 具体调用  
```
   /***
     * 
     * 调用工具类方法存储  
     */
    private void btnSavetoutils() {
     btnsave_toutils.setClickedListener(new Component.ClickedListener() {
         @Override
         public void onClick(Component component) {

             String fruit = textFiledFruit.getText();
             try {
                 int number = Integer.parseInt(textFiledNumber.getText());
                 DataBaseUtil.setParam(context,"number",number);
                 DataBaseUtil.setParam(context,"fruit",fruit);
                 new ToastDialog(context).setText("写入成功").show();
             } catch (NumberFormatException e) {
                 new ToastDialog(context).setText("Please input number in Number row").show();
             }

         }
     });
    }
```
## 完整示例    
- ##### 1 xml布局代码
```
   
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">

    <Text
        ohos:id="$+id:text_fruit_tag"
        ohos:height="35vp"
        ohos:width="match_parent"
        ohos:background_element="$graphic:text_element"
        ohos:layout_alignment="left"
        ohos:text="Fruit"
        ohos:text_size="85"
        ohos:right_margin="20vp"
        ohos:left_margin="20vp"
        ohos:top_margin="25vp"
        ohos:text_color="#000000"
        />

    <TextField
        ohos:id="$+id:text_fruit"
        ohos:height="35vp"
        ohos:width="match_parent"
        ohos:background_element="$graphic:text_element"
        ohos:layout_alignment="left"
        ohos:text="Orange"
        ohos:text_size="50"
        ohos:right_margin="20vp"
        ohos:left_margin="20vp"
        ohos:text_color="#000000"
        ohos:top_margin="25vp"
        ohos:basement="#000099"
        />

    <Text
        ohos:id="$+id:text_number_tag"
        ohos:height="35vp"
        ohos:width="match_parent"
        ohos:background_element="$graphic:text_element"
        ohos:layout_alignment="left"
        ohos:text="Number"
        ohos:text_size="85"
        ohos:right_margin="20vp"
        ohos:left_margin="20vp"
        ohos:text_color="#000000"
        ohos:top_margin="25vp"
        />

    <TextField
        ohos:id="$+id:text_number"
        ohos:height="35vp"
        ohos:width="match_parent"
        ohos:background_element="$graphic:text_element"
        ohos:layout_alignment="left"
        ohos:text="25"
        ohos:text_size="50"
        ohos:right_margin="20vp"
        ohos:left_margin="20vp"
        ohos:text_color="#000000"
        ohos:top_margin="25vp"
        ohos:basement="#000099"
        />

    <Button
        ohos:id="$+id:write_btn"
        ohos:width="match_parent"
        ohos:height="35vp"
        ohos:text="写入缓存"
        ohos:background_element="$graphic:button_element"
        ohos:text_size="50"
        ohos:text_color="#FFFFFF"
        ohos:top_margin="25vp"
        ohos:right_margin="20vp"
        ohos:left_margin="20vp"
        />

    <Button
        ohos:id="$+id:read_btn"
        ohos:width="match_parent"
        ohos:height="35vp"
        ohos:text="读取缓存"
        ohos:background_element="$graphic:button_element"
        ohos:text_size="50"
        ohos:text_color="#FFFFFF"
        ohos:top_margin="25vp"
        ohos:right_margin="20vp"
        ohos:left_margin="20vp"
        />

    <Button
        ohos:id="$+id:delete_btn"
        ohos:width="match_parent"
        ohos:height="35vp"
        ohos:text="删除缓存"
        ohos:background_element="$graphic:button_element"
        ohos:text_size="50"
        ohos:text_color="#FFFFFF"
        ohos:top_margin="25vp"
        ohos:right_margin="20vp"
        ohos:left_margin="20vp"
        />


    <Button
        ohos:id="$+id:save_list"
        ohos:width="match_parent"
        ohos:height="35vp"
        ohos:text="存储list"
        ohos:background_element="$graphic:button_element"
        ohos:text_size="50"
        ohos:text_color="#FFFFFF"
        ohos:top_margin="25vp"
        ohos:right_margin="20vp"
        ohos:left_margin="20vp"
        />

    <Button
        ohos:id="$+id:read_list"
        ohos:width="match_parent"
        ohos:height="35vp"
        ohos:text="读取list"
        ohos:background_element="$graphic:button_element"
        ohos:text_size="50"
        ohos:text_color="#FFFFFF"
        ohos:top_margin="25vp"
        ohos:right_margin="20vp"
        ohos:left_margin="20vp"
        />
    <Button
        ohos:id="$+id:save_toutils"
        ohos:width="match_parent"
        ohos:height="35vp"
        ohos:text="工具类缓存调用"
        ohos:background_element="$graphic:button_element"
        ohos:text_size="50"
        ohos:text_color="#FFFFFF"
        ohos:top_margin="25vp"
        ohos:right_margin="20vp"
        ohos:left_margin="20vp"
        />
</DirectionalLayout>
```
- ##### 2 布局效果图
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-d4aab812447cf872.png)
- ##### 3 java逻辑代码 
```
package com.example.datademo.slice;
import com.example.datademo.ResourceTable;
import com.example.datademo.bean.UserBean;
import com.example.datademo.utils.DataBaseUtil;
import ohos.aafwk.ability.AbilitySlice;
import ohos.aafwk.content.Intent;
import ohos.agp.components.Button;
import ohos.agp.components.Component;
import ohos.agp.components.TextField;
import ohos.agp.window.dialog.ToastDialog;
import ohos.app.Context;
import ohos.data.DatabaseHelper;
import ohos.data.preferences.Preferences;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;


public class MainAbilitySlice extends AbilitySlice {
    private Context context;
    private Button btnWrite;
    private Button btnRead;
    private Button btnDelete;
    private TextField textFiledFruit;
    private TextField textFiledNumber;
    private String filename;
    private Preferences preferences;
    private DatabaseHelper databaseHelper;
    private Button btnsavelist;
    private Button btnsave_toutils;
    private Button btn_read_list;


    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_ability_main);
        context = getContext();
        btnWrite = (Button) findComponentById(ResourceTable.Id_write_btn);
        btnRead = (Button) findComponentById(ResourceTable.Id_read_btn);
        btnDelete = (Button) findComponentById(ResourceTable.Id_delete_btn);
        textFiledFruit = (TextField) findComponentById(ResourceTable.Id_text_fruit);
        textFiledNumber = (TextField) findComponentById(ResourceTable.Id_text_number);
        btnsavelist= (Button) findComponentById(ResourceTable.Id_save_list);
        btnsave_toutils= (Button) findComponentById(ResourceTable.Id_save_toutils);
        btn_read_list= (Button) findComponentById(ResourceTable.Id_read_list);
        databaseHelper = new DatabaseHelper(context);
        filename = "pdb";
        preferences = databaseHelper.getPreferences(filename);
        btnWrite();
        btnRead();
        btnDelete();
        btnSavelist();
        btnSavetoutils();
        btnReadList();
    }
    /***
     *  写入数据
     *
     *
     */
    private void btnWrite() {
        btnWrite.setClickedListener(new Component.ClickedListener() {
            @Override
            public void onClick(Component component) {
                String fruit = textFiledFruit.getText();
                try {
                    int number = Integer.parseInt(textFiledNumber.getText());
                    preferences.putInt("number",number);
                    preferences.putString("fruit",fruit);
                    preferences.flush();
                    new ToastDialog(context).setText("Write to DB file success").show();
                } catch (NumberFormatException e) {
                    new ToastDialog(context).setText("Please input number in Number row").show();
                }
            }
        });
    }

    /***
     *
     * 读取数据
     *
     */
    private void btnRead() {
        btnRead.setClickedListener(new Component.ClickedListener() {
            @Override
            public void onClick(Component component) {
                String string = String.format(Locale.ENGLISH,"Fruit: %s,Number: %d",
                        preferences.getString("fruit", ""),preferences.getInt("number", 0));
                new ToastDialog(context).setText(string).show();
            }
        });
    }

    /**
     * 删除数据
     *
     */
    private void btnDelete() {
        btnDelete.setClickedListener(new Component.ClickedListener() {
            @Override
            public void onClick(Component component) {
                if (databaseHelper.deletePreferences(filename)) {
                    preferences.clear();
                    new ToastDialog(context).setText("Delete DB file success").show();
                } else {
                    new ToastDialog(context).setText("Delete DB file failed").show();
                }
            }
        });
    }

    /***
     *
     * 缓存list 集合类型数据
     *
     */
    private void btnSavelist() {

      btnsavelist.setClickedListener(new Component.ClickedListener() {
          @Override
          public void onClick(Component component) {
              UserBean userBean=new UserBean();
              userBean.setUsername("test");
              userBean.setPassword("123456");
              List<UserBean> datalist=new ArrayList<>();
              datalist.add(userBean);
              DataBaseUtil.putSelectBean(context,datalist,"datalist");
              new ToastDialog(context).setText("写入成功").show();

          }
      });
    }
    /***
     *
     * 调用工具类方法存储
     */
    private void btnSavetoutils() {
     btnsave_toutils.setClickedListener(new Component.ClickedListener() {
         @Override
         public void onClick(Component component) {

             String fruit = textFiledFruit.getText();
             try {
                 int number = Integer.parseInt(textFiledNumber.getText());
                 DataBaseUtil.setParam(context,"number",number);
                 DataBaseUtil.setParam(context,"fruit",fruit);
                 new ToastDialog(context).setText("写入成功").show();
             } catch (NumberFormatException e) {
                 new ToastDialog(context).setText("Please input number in Number row").show();
             }

         }
     });
    }
    /***
     *
     * 读取list 集合类型数据
     *
     */
    private  void  btnReadList(){
        btn_read_list.setClickedListener(new Component.ClickedListener() {
            @Override
            public void onClick(Component component) {

                List<UserBean>getData= (List<UserBean>) DataBaseUtil.getSelectBean(context,"datalist");
                UserBean userBean= getData.get(0);
                new ToastDialog(context).setText(userBean.getUsername()+userBean.getPassword()).show();
            }
        });
    }
}
```
 - ##### 4 bean 类  
```
package com.example.datademo.bean;
/***
 *
 * 创建人：xuqing
 * 创建时间：2021年6月20日20:54:28
 * 类说明：用户账号密码  bean类
 *
 *
 */

public class UserBean {
    private  String username;
    private  String password;

    public UserBean() {
    }

    public UserBean(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "UserBean{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
```
- ##### 4 工具类核心代码 
```
package com.example.datademo.utils;
import com.example.datademo.bean.UserBean;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import ohos.app.Context;
import ohos.data.DatabaseHelper;
import ohos.data.preferences.Preferences;
import java.io.*;
import java.lang.reflect.Type;
import java.util.List;






public class DataBaseUtil {

    private static  String filename = "pdb";
    private static  Preferences preferences;
    private static  DatabaseHelper databaseHelper;

    /**
     * 保存数据的方法，我们需要拿到保存数据的具体类型，然后根据类型调用不同的保存方法
     *
     * @param context
     * @param key
     * @param object
     * @param ：DataBaseUtil.setParam(this, "key", "value");
     *                                               key -- userid / accountId obj==
     */
    public static void setParam(Context context, String key, Object object) {
        String type = "String";
        if (object != null) {
            type = object.getClass().getSimpleName();
        }
        databaseHelper = new DatabaseHelper(context);
        preferences = databaseHelper.getPreferences(filename);

        if ("String".equals(type)) {
            preferences.putString(key, (String) object);
        } else if ("Integer".equals(type) || "int".equals(type)) {
            preferences.putInt(key, (Integer) object);
        } else if ("Boolean".equals(type) || "boolean".equals(type)) {
            preferences.putBoolean(key, (Boolean) object);
        } else if ("Float".equals(type) || "float".equals(type)) {
            preferences.putFloat(key, (Float) object);
        } else if ("Long".equals(type) || "long".equals(type)) {
            preferences.putLong(key, (Long) object);
        }
        preferences.flush();
    }

    /**
     * 得到保存数据的方法，我们根据默认值得到保存的数据的具体类型，然后调用相对于的方法获取值
     *
     * @param context
     * @param key                                             关键字
     * @param defaultObject                                   若取回空值则返回此默认值
     * @param ：DataBaseUtil.getParam(Activity.this, "key", "defaultValue");
     * @return
     */
    public static Object getParam(Context context, String key, Object defaultObject) {
        String type = "String";
        if (defaultObject != null) {
            type = defaultObject.getClass().getSimpleName();
        }
        databaseHelper = new DatabaseHelper(context);
        preferences = databaseHelper.getPreferences(filename);
        if ("String".equals(type)) {
            return preferences.getString(key, (String) defaultObject);
        } else if ("Integer".equals(type) || "int".equals(type)) {
            return preferences.getInt(key, (Integer) defaultObject);
        } else if ("Boolean".equals(type) || "boolean".equals(type)) {
            return preferences.getBoolean(key, (Boolean) defaultObject);
        } else if ("Float".equals(type) || "float".equals(type)) {
            return preferences.getFloat(key, (Float) defaultObject);
        } else if ("Long".equals(type) || "long".equals(type)) {
            return preferences.getLong(key, (Long) defaultObject);
        }
        return null;
    }

    //删除数据
    public static void removeParam(Context context,  Object defaultObject) {
        databaseHelper = new DatabaseHelper(context);
        preferences = databaseHelper.getPreferences(filename);
        preferences.clear();
    }

    /**
     * 4.存储list
     */
    public static void putSelectBean(Context context, List<UserBean> phoneList, String key) {
        databaseHelper = new DatabaseHelper(context);
        preferences = databaseHelper.getPreferences(filename);
        Gson gson = new Gson();
        String json = gson.toJson(phoneList);
        preferences.putString(key, json);
        preferences.flush();
    }


    /**
     * 读取list
     */
    public static List<UserBean> getSelectBean(Context context, String key) {
        databaseHelper = new DatabaseHelper(context);
        preferences = databaseHelper.getPreferences(filename);
        Gson gson = new Gson();
        String json = preferences.getString(key, null);
        Type type = new TypeToken<List<UserBean>>() {
        }.getType();
        List<UserBean> arrayList = gson.fromJson(json, type);
        return arrayList;
    }
    //存数据到SD卡里面
    public static void storetosd(File file, List<UserBean> data) {
        try {
            Gson gson = new Gson();
            String json = gson.toJson(data);
            OutputStream os = new FileOutputStream(file);
            os.write(json.getBytes("utf-8"));
            os.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //读取SD卡里面的数据
    public static List<UserBean> readbysd(File file) {
        List<UserBean> arrayList = null;
        Gson gson = new Gson();
        try {
            InputStream is = new FileInputStream(file);
            byte[] data = new byte[is.available()];
            is.read(data);
            String content = new String(data, "utf-8");
            Type type = new TypeToken<List<UserBean>>() {
            }.getType();
            arrayList = gson.fromJson(content, type);
            is.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return arrayList;
    }
}
```
到此DatabaseHelper基本就讲完了 恭喜你看完此文你就会掌握了鸿蒙轻量级数据库DatabaseHelper的用法和使用技巧
## 最后总结
鸿蒙的 DatabaseHelper轻量级数据库和安卓的   sharepreferences 用法和类似都是默认只能存储基本数据类型 但是鸿蒙提供了  flush 和 flushSync 两个方法 将Preferences实例持久化。 flush()会立即更改内存中的Preferences对象，但会将更新异步写入磁盘。flushSync()更改内存中的数据的同时会将数据同步写入磁盘。由于flushSync()是同步的，建议不要从主线程调用它，以避免界面卡顿。 这里和安卓还是有些许区别 同学们要注意。使用起来 DatabaseHelper也比较方便和简单。以及一些非基本数据类型怎么转化来存储我也讲到了 同学有兴趣可以下载代码来看看 最后希望我的文章能帮助到各位解决问题 ，以后我还会贡献更多有用的代码分享给大家。各位同学如果觉得文章还不错 ，麻烦给关注和star，小弟在这里谢过啦!
## 项目地址：
码云 ：https://gitee.com/qiuyu123/database