## 前言：
各位同学大家好，有段时间没有给大家更新文章 ，最近还在学习鸿蒙开发的支持，就想着把android里面部分用到知识搬到鸿蒙里面 因为基础语言都是java 语言，所以就写了现在这教程 那么废话不多说我们正式开始 

## 效果图    

![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-2efb423ae2b55182.png)

## 准备工作   
1 安装鸿蒙开发环境 大家可以看我之前的文章
## 需要用到的三方库  
```
   //okhttp3
    implementation 'com.squareup.okhttp3:okhttp:4.2.0'
    implementation "com.squareup.okhttp3:logging-interceptor:3.10.0"
    //retrofit2
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.retrofit2:adapter-rxjava3:2.9.0'
```
请在build.gradle里面添加依赖然后sygn now 同步下载依赖  
具体实现 
MainAbility布局代码 
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
        ohos:text="账户"
        ohos:text_size="85"
        ohos:right_margin="20vp"
        ohos:left_margin="20vp"
        ohos:top_margin="25vp"
        ohos:text_color="#000000"
        />

    <TextField
        ohos:id="$+id:text_username"
        ohos:height="35vp"
        ohos:width="match_parent"
        ohos:background_element="$graphic:text_element"
        ohos:layout_alignment="left"
        ohos:text_size="50"
        ohos:right_margin="20vp"
        ohos:left_margin="20vp"
        ohos:text_color="#000000"
        ohos:top_margin="25vp"
        ohos:basement="#000099"
        ohos:hint="请输入账号"
        />

    <Text
        ohos:id="$+id:text_number_tag"
        ohos:height="35vp"
        ohos:width="match_parent"
        ohos:background_element="$graphic:text_element"
        ohos:layout_alignment="left"
        ohos:text="密码"
        ohos:text_size="85"
        ohos:right_margin="20vp"
        ohos:left_margin="20vp"
        ohos:text_color="#000000"
        ohos:top_margin="25vp"
        />

    <TextField
        ohos:id="$+id:text_password"
        ohos:height="35vp"
        ohos:width="match_parent"
        ohos:background_element="$graphic:text_element"
        ohos:layout_alignment="left"
        ohos:text_size="50"
        ohos:right_margin="20vp"
        ohos:left_margin="20vp"
        ohos:text_color="#000000"
        ohos:top_margin="25vp"
        ohos:basement="#000099"
        ohos:hint="请输入密码"
        />
    <Button
        ohos:id="$+id:login_btn"
        ohos:width="match_parent"
        ohos:height="50vp"
        ohos:text="登录"
        ohos:background_element="$graphic:button_element"
        ohos:text_size="50"
        ohos:text_color="#FFFFFF"
        ohos:top_margin="25vp"
        ohos:right_margin="20vp"
        ohos:left_margin="20vp"
        />
</DirectionalLayout>
```
## 布局效果
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-0347fae59a38ba18.png)
我们的目的很明确 我们想拿到2个输入框的内容然后调用网络接口来实现登录的操作 业务非常简单 
但是今天要用  MVP+ Rxjava+Retrofit+okhttp 来实现
##  网络核心部分  
- ##### RetrofitClient 类封装  
```
package com.example.hmsrxjava_demo.net;
import java.io.IOException;

import io.reactivex.rxjava3.annotations.NonNull;
import ohos.agp.render.render3d.BuildConfig;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava3.RxJava3CallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * description：
 */
public class RetrofitClient {

    private static volatile RetrofitClient instance;
    private APIService apiService;
    private String baseUrl = "https://www.wanandroid.com";
    private Retrofit retrofit;
    private OkHttpClient okHttpClient;

    private RetrofitClient() {
    }

    public static RetrofitClient getInstance() {
        if (instance == null) {
            synchronized (RetrofitClient.class) {
                if (instance == null) {
                    instance = new RetrofitClient();
                }
            }
        }
        return instance;
    }

    /**
     * 设置Header
     *
     * @return
     */
    private Interceptor getHeaderInterceptor() {
        return new Interceptor() {
            @Override
            public Response intercept(@NonNull Chain chain) throws IOException {
                Request original = chain.request();
                Request.Builder requestBuilder = original.newBuilder();
                //添加Token    如果需要添加请求头可以统一在这里添加
                 // Request.Builder requestBuilder = original.newBuilder().header("token", "");

                Request request = requestBuilder.build();
                return chain.proceed(request);
            }
        };

    }

    /**
     * 设置拦截器 打印日志
     *
     * @return
     */
    private Interceptor getInterceptor() {

        HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor();
        //显示日志
        interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);

        return interceptor;
    }

    public OkHttpClient getOkHttpClient() {
        if (okHttpClient == null) {
            //如果为DEBUG 就打印日志
            if (BuildConfig.DEBUG) {
                okHttpClient = new OkHttpClient().newBuilder()
                        //设置Header
                        .addInterceptor(getHeaderInterceptor())
                        //设置拦截器
                        .addInterceptor(getInterceptor())
                        .build();
            } else {
                okHttpClient = new OkHttpClient().newBuilder()
                        //设置Header
                        .addInterceptor(getHeaderInterceptor())
                        .build();
            }
        }
        return okHttpClient;
    }
    public APIService getApi() {
        //初始化一个client,不然retrofit会自己默认添加一个
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    //设置网络请求的Url地址
                    .baseUrl(baseUrl)
                    //设置数据解析器
                    .addConverterFactory(GsonConverterFactory.create())
                    //设置网络请求适配器，使其支持RxJava与RxAndroid
                    .addCallAdapterFactory(RxJava3CallAdapterFactory.create())
                    .client(getOkHttpClient())
                    .build();
        }
        //创建—— 网络请求接口—— 实例
        if (apiService==null){
            apiService = retrofit.create(APIService.class);
        }
        return apiService;
    }
}
```
我们写了一个单例来获取  RetrofitClient 实力并且设置的了请求头 handler 和设置OKHTTP 日志拦截器   
然后定义了 getApi 方法来获取 APIService 的实例  
- #### RxScheduler
RXjava 线程调度
```
package com.example.hmsrxjava_demo.net;

import com.example.hmsrxjava_demo.HarmonySchedulers;
import org.reactivestreams.Publisher;
import io.reactivex.rxjava3.core.Flowable;
import io.reactivex.rxjava3.core.FlowableTransformer;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.core.ObservableSource;
import io.reactivex.rxjava3.core.ObservableTransformer;
import io.reactivex.rxjava3.schedulers.Schedulers;
/**
 * description：RXjava 线程调度
 */
public class RxScheduler {
    /**
     * 统一线程处理
     *
     * @param <T> 指定的泛型类型
     * @return FlowableTransformer
     */
    public static <T> FlowableTransformer< T, T> Flo_io_main() {
        return new FlowableTransformer<T, T>() {
            @Override
            public Publisher<T> apply(Flowable<T> upstream) {
                return upstream.subscribeOn(Schedulers.io())
                        .observeOn(HarmonySchedulers.mainThread());
            }
        };
    }

/*    *
     * 统一线程处理
     *
     * @param <T> 指定的泛型类型
     * @return ObservableTransformer*/
    public static <T> ObservableTransformer<T, T> Obs_io_main() {
        return new ObservableTransformer<T, T>() {
            @Override
            public ObservableSource<T> apply( Observable<T> upstream) {
                return upstream.subscribeOn(Schedulers.io())
                        .observeOn(HarmonySchedulers.mainThread());
            }
        };
    }
}
```
这里代码就参考了 安卓里面 部分没有的   HarmonySchedulers.mainThread() 参考了安卓里面的自己实现了一下  
- ##### APIService 
处理网络请求的接口 类 所有网络请求的都写在 APIService 写法和安卓的  Retrofitle类似 
```
package com.example.hmsrxjava_demo.net;
import com.example.hmsrxjava_demo.bean.BaseObjectBean;
import com.example.hmsrxjava_demo.bean.LoginBean;
import io.reactivex.rxjava3.core.Observable;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;
/**
 * Description：
 */
public interface APIService {

    /**
     * 登陆
     *
     * @param username 账号
     * @param password 密码
     * @return
     */
    @FormUrlEncoded
    @POST("user/login")
    Observable<BaseObjectBean<LoginBean>> login(@Field("username") String username,
                                                @Field("password") String password);

}
```
##  base类  
-  #### BaseAbility
```
package com.example.hmsrxjava_demo.base;
import ohos.aafwk.ability.Ability;
import ohos.aafwk.content.Intent;

public abstract class BaseAbility  extends Ability {

    @Override
    protected void onStart(Intent intent) {
        super.onStart(intent);
        super.setUIContent(getLayoutId());
        initView();
    }


    @Override
    protected void onStop() {
        super.onStop();
    }


    /**
     * 设置布局
     *
     * @return
     */
    public abstract int getLayoutId();

    /**
     * 初始化视图
     */
    public abstract void initView();
}
```
-  #### BaseMvpAbility
```
package com.example.hmsrxjava_demo.base;
import ohos.aafwk.content.Intent;
public abstract class BaseMvpAbility <T extends  BasePresenter>extends  BaseAbility implements  BaseView {
    protected T mPresenter;
    @Override
    protected void onStart(Intent intent) {
        super.onStart(intent);
    }
    @Override
    protected void onStop() {
        if (mPresenter != null) {
            mPresenter.detachView();
        }
        super.onStop();
    }
}
```

 - ### BasePresenter
```
package com.example.hmsrxjava_demo.base;
/**
 * Description：
 */
public class BasePresenter<V extends BaseView> {
    protected V mView;


    /**
     * 绑定view，一般在初始化中调用该方法
     *
     * @param view view
     */
    public void attachView(V view) {
        this.mView = view;
    }

    /**
     * 解除绑定view，一般在onDestroy中调用
     */

    public void detachView() {
        this.mView = null;
    }

    /**
     * View是否绑定
     *
     * @return
     */
    public boolean isViewAttached() {
        return mView != null;
    }
}
```
- #### BaseView 
```
package com.example.hmsrxjava_demo.base;

/**
 * Description：
 */
public interface BaseView {

    /**
     * 显示加载中
     */
    void showLoading();

    /**
     * 隐藏加载
     */
    void hideLoading();

    /**
     * 数据获取失败
     * @param errMessage
     */
    void onError(String errMessage);
}
```
### Model 层  
```
package com.example.hmsrxjava_demo.contract;
import com.example.hmsrxjava_demo.base.BaseView;
import com.example.hmsrxjava_demo.bean.BaseObjectBean;
import com.example.hmsrxjava_demo.bean.LoginBean;
import io.reactivex.rxjava3.core.Observable;

/**
 * Description：
 */
public interface MainContract {
    interface Model {
        Observable<BaseObjectBean<LoginBean>> login(String username, String password);
    }

    interface View extends BaseView {
        @Override
        void showLoading();

        @Override
        void hideLoading();

        @Override
        void onError(String errMessage);

        void onSuccess(BaseObjectBean<LoginBean> bean);
    }

    interface Presenter {
        /**
         * 登陆
         *
         * @param username
         * @param password
         */
        void login(String username, String password);
    }
}
```
### model 实现层 

```
package com.example.hmsrxjava_demo.model;
import com.example.hmsrxjava_demo.bean.BaseObjectBean;
import com.example.hmsrxjava_demo.bean.LoginBean;
import com.example.hmsrxjava_demo.contract.MainContract;
import com.example.hmsrxjava_demo.net.RetrofitClient;
import io.reactivex.rxjava3.core.Observable;

/**
 * Description：
 */
public class MainModel  implements MainContract.Model {
    private static final String TAG = "MainModel";
    @Override
    public Observable<BaseObjectBean<LoginBean>> login(String username, String password) {
        System.out.println("MainModel login 被调用");
        return RetrofitClient.getInstance().getApi().login(username,password);
    }
}
```
##  Presenter层  
```
package com.example.hmsrxjava_demo.presenter;
import com.example.hmsrxjava_demo.base.BasePresenter;
import com.example.hmsrxjava_demo.bean.BaseObjectBean;
import com.example.hmsrxjava_demo.bean.LoginBean;
import com.example.hmsrxjava_demo.contract.MainContract;
import com.example.hmsrxjava_demo.model.MainModel;
import com.example.hmsrxjava_demo.net.RxScheduler;
import io.reactivex.rxjava3.annotations.NonNull;
import io.reactivex.rxjava3.core.Observer;
import io.reactivex.rxjava3.disposables.Disposable;
/**
 * Description：
 */
public class MainPresenter extends BasePresenter<MainContract.View> implements MainContract.Presenter {
    private MainContract.Model model;
    public MainPresenter() {
        model = new MainModel();
    }
    @Override
    public void login(String username, String password) {
        //View是否绑定 如果没有绑定，就不执行网络请求
        if (!isViewAttached()) {
            return;
        }
        model.login(username, password)
                .compose(RxScheduler.Obs_io_main())
                .subscribe(new Observer<BaseObjectBean<LoginBean>>() {
                    @Override
                    public void onSubscribe(@NonNull Disposable d) {
                        mView.showLoading();
                    }

                    @Override
                    public void onNext(@NonNull BaseObjectBean<LoginBean> loginBeanBaseObjectBean) {
                        mView.onSuccess(loginBeanBaseObjectBean);
                        System.out.println("onNext   -----  >");
                    }

                    @Override
                    public void onError(@NonNull Throwable e) {
                        mView.onError(e.getMessage());
                        mView.hideLoading();
                    }
                    @Override
                    public void onComplete() {
                        mView.hideLoading();
                    }
           });

    }
}
```
## MainAbility  中 具体调用 
```
package com.example.hmsrxjava_demo;
import com.example.hmsrxjava_demo.base.BaseMvpAbility;
import com.example.hmsrxjava_demo.bean.BaseObjectBean;
import com.example.hmsrxjava_demo.bean.LoginBean;
import com.example.hmsrxjava_demo.contract.MainContract;
import com.example.hmsrxjava_demo.presenter.MainPresenter;
import ohos.agp.components.Button;
import ohos.agp.components.Component;
import ohos.agp.components.TextField;
import ohos.agp.window.dialog.ToastDialog;


public class MainAbility extends BaseMvpAbility<MainPresenter>implements MainContract.View {
    private TextField textUsername, textpasswrod;
    private String username, password;
    private Button loginBtn;
    private MainPresenter presenter;
    @Override
    public int getLayoutId() {
        return ResourceTable.Layout_ability_main;
    }
    @Override
    public void initView() {
        textUsername= (TextField) findComponentById(ResourceTable.Id_text_username);
        textpasswrod= (TextField) findComponentById(ResourceTable.Id_text_password);
        presenter=new MainPresenter();
        presenter.attachView(this);
        loginBtn= (Button) findComponentById(ResourceTable.Id_login_btn);
        if(loginBtn!=null){
            loginBtn.setClickedListener(new Component.ClickedListener() {
                @Override
                public void onClick(Component component) {
                    System.out.println("点击登录按钮");
                    username=textUsername.getText();
                    password=textpasswrod.getText();
                    if(username!=null&&password!=null){
                        presenter.login(username,password);
                        // login(username,password);
                    }else {
                        new ToastDialog(MainAbility.this).setText("账号密码不输不能为空").show();                    }
                }
            });
        }
    }
    @Override
    public void onSuccess(BaseObjectBean<LoginBean> bean) {
        System.out.println(bean.getErrorCode()+bean.getErrorMsg());
        new ToastDialog(MainAbility.this).setText(bean.getErrorCode()+bean.getErrorMsg()).show();
    }
    @Override
    public void showLoading() {
    }
    @Override
    public void hideLoading() {

    }
    @Override
    public void onError(String errMessage) {
    }
}
```
到此 鸿蒙  MVP+ Rxjava+Retrofit+okhttp 实现教程  使用起来和安卓的用法非常像 我这里很多代码是复制过来 同学们可以下载完整的代码来尝试 
## 最后总结：
鸿蒙中MVP+ Rxjava+Retrofit+okhttp 和安卓里面基本如出一辙 只是很少地方有些诧异，同学们如果不是很熟悉  Rxjava+Retrofit+okhttp 请先去看看官方教程 还有mvp模式的不熟悉的请切翻阅我之前的文章 。还有跟多关于鸿蒙 网络编程的实现方法同学私下有兴趣可以尝试去实现我这边就不展开讲了 ,最后希望我的文章能帮助到各位解决问题 ，以后我还会贡献更多有用的代码分享给大家。各位同学如果觉得文章还不错 ，麻烦给关注和star，小弟在这里谢过啦
## 项目地址 ：
码云  ：https://gitee.com/qiuyu123/hms_rxjava_demo