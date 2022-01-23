##前言：
各位同学大家好，有段时间没有给大家更新文章。具体多久呢我也不记得，刚刚过完2020年，我在新的2021年里我还在继续学习鸿蒙的的开发。最近看了一下鸿蒙的网络请求部分的内容（这部分主要还是按照鸿蒙开发文档里面提到 java ui，js  ui的网络请求请大家查看官方的文档即可）那么废话不多说我们正式开始。
##准备工作：
1 安装鸿蒙开发环境 大家可以看我之前的文章
华为鸿蒙系统开发初体验 ：[https://www.jianshu.com/p/f94c847c7fdc](https://www.jianshu.com/p/f94c847c7fdc)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-45d343021eaea30d.png)
##具体实现
###鸿蒙系统网络访问基础配置
- ####1添加网络访问权限
跟Android类似，要访问网络，我们首先要配置网络访问权限，在config.json的"module"节点最后，添加上网络权限代码
```
"reqPermissions": [
      {
        "reason": "",
        "name": "ohos.permission.INTERNET"
      }
    ]
```
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-531208f4c972eaed.png)
- #### 2 设置访问模式
鸿蒙的默认是https访问模式，如果您的请求网址是http开头的，请在config.json文件中的deviceConfig下，添加如下设置
```
deviceConfig": { 
     "default": { 
         "network": { 
             "cleartextTraffic": true 
         } 
     } 
 }, 
```
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-6dcbedc67b6de310.png)
## 具体代码实现：
- ####1JAVA原生请求
由于鸿蒙系统支持Java开发，所以我们可以直接使用Java原生的Api来进行网络访问
该方式使用了java的url.openConnection() Api来获取网络数据
### 请求工具类
我们这边写了一个基于HttpURLConnection 封装的工具类来处理我们的原生网络请求 
```
package com.example.hms_network.net;
import javax.net.ssl.*;
import java.io.*;
import java.net.*;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.Map;
/**
 * 创建人：xuqing
 * 创建时间：2021年1月16日16:11:10
 * 类说明：网络请求工具类
 *
 */
public  class HttpUtils{
    private final static String PARAMETER_SEPARATOR = "&";
    private final static String NAME_VALUE_SEPARATOR = "=";
    /**
     *访问url，获取内容
     * @param urlStr
     * @return
     */
    public static String httpGet(String urlStr){
        StringBuilder sb = new StringBuilder();
        try{
            //添加https信任
            SSLContext sslcontext = SSLContext.getInstance("SSL");//第一个参数为协议,第二个参数为提供者(可以缺省)
            TrustManager[] tm = {new HttpX509TrustManager()};
            sslcontext.init(null, tm, new SecureRandom());
            HostnameVerifier ignoreHostnameVerifier = new HostnameVerifier() {
                public boolean verify(String s, SSLSession sslsession) {
                    System.out.println("WARNING: Hostname is not matched for cert.");
                    return true;
                }
            };
            HttpsURLConnection.setDefaultHostnameVerifier(ignoreHostnameVerifier);
            HttpsURLConnection.setDefaultSSLSocketFactory(sslcontext.getSocketFactory());
            URL url = new URL(urlStr);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setReadTimeout(10000);
            connection.setConnectTimeout(10000);
            connection.connect();
            int code = connection.getResponseCode();
            if (code == HttpURLConnection.HTTP_OK) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String temp;
                while ((temp = reader.readLine()) != null) {
                    sb.append(temp);
                }
                reader.close();
            }
            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
        return sb.toString();
    }



    public static String httpGet(String urlStr ,Map<String, String> params){
        StringBuilder sb = new StringBuilder();
        try{
            //添加https信任
            SSLContext sslcontext = SSLContext.getInstance("SSL");//第一个参数为协议,第二个参数为提供者(可以缺省)
            TrustManager[] tm = {new HttpX509TrustManager()};
            sslcontext.init(null, tm, new SecureRandom());
            HostnameVerifier ignoreHostnameVerifier = new HostnameVerifier() {
                public boolean verify(String s, SSLSession sslsession) {
                    System.out.println("WARNING: Hostname is not matched for cert.");
                    return true;
                }
            };
            HttpsURLConnection.setDefaultHostnameVerifier(ignoreHostnameVerifier);
            HttpsURLConnection.setDefaultSSLSocketFactory(sslcontext.getSocketFactory());
            URL url = new URL(getUrl(urlStr,params));
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setReadTimeout(10000);
            connection.setConnectTimeout(10000);
            connection.connect();
            int code = connection.getResponseCode();
            if (code == HttpURLConnection.HTTP_OK) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String temp;
                while ((temp = reader.readLine()) != null) {
                    sb.append(temp);
                }
                reader.close();
            }
            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
        return sb.toString();
    }


    /**
     * get请求，将键值对凭接到url上
     */
    private static  String getUrl(String path, Map<String, String> paramsMap) {
        if(paramsMap != null){
            path = path+"?";
            for (String key: paramsMap.keySet()){
                path = path + key+"="+paramsMap.get(key)+"&";
            }
            path = path.substring(0,path.length()-1);
        }
        return path;
    }



    /**
     * HttpPost 网络请求工具类
     *
     * @param urlStr
     * @return
     */
    public static String httpPost(String urlStr) {

        String result = null;
        URL url = null;
        HttpURLConnection connection = null;
        InputStreamReader in = null;
        try {
            String paramsEncoded = "";
        /*    if (params != null) {
                paramsEncoded = urlParamsFormat(params, "UTF-8");
            }*/
            url = new URL(urlStr);
            if (url.getProtocol().toUpperCase().equals("HTTPS")) {
                trustAllHost();
                HttpsURLConnection https = (HttpsURLConnection) url.openConnection();
                connection = https;
            } else {
                connection = (HttpURLConnection) url.openConnection();
            }
            connection.setDoInput(true);
            connection.setDoOutput(true);
            connection.setConnectTimeout(5000);
            connection.setReadTimeout(20000);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            connection.setRequestProperty("Charset", "utf-8");
            DataOutputStream dop = new DataOutputStream(
                    connection.getOutputStream());
         //   dop.writeBytes(paramsEncoded);
            dop.flush();
            dop.close();
            if (connection.getResponseCode() == connection.HTTP_OK) {
                in = new InputStreamReader(connection.getInputStream());
                BufferedReader bufferedReader = new BufferedReader(in);
                StringBuffer strBuffer = new StringBuffer();
                String line = null;
                while ((line = bufferedReader.readLine()) != null) {
                    strBuffer.append(line);
                }
                result = strBuffer.toString();
            } else {
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

    /**
     * HttpPost 网络请求工具类
     *
     * @param urlStr
     * @param params
     * @return
     */
    public static String httpPost(String urlStr, Map<String, String> params) {

        String result = null;
        URL url = null;
        HttpURLConnection connection = null;
        InputStreamReader in = null;
        try {
            String paramsEncoded = "";
            if (params != null) {
                paramsEncoded = urlParamsFormat(params, "UTF-8");
            }
            url = new URL(urlStr);
            if (url.getProtocol().toUpperCase().equals("HTTPS")) {
                trustAllHost();
                HttpsURLConnection https = (HttpsURLConnection) url.openConnection();
                connection = https;
            } else {
                connection = (HttpURLConnection) url.openConnection();
            }
            connection.setDoInput(true);
            connection.setDoOutput(true);
            connection.setConnectTimeout(5000);
            connection.setReadTimeout(20000);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            connection.setRequestProperty("Charset", "utf-8");
            DataOutputStream dop = new DataOutputStream(
                    connection.getOutputStream());
            dop.writeBytes(paramsEncoded);
            dop.flush();
            dop.close();
            if (connection.getResponseCode() == connection.HTTP_OK) {
                in = new InputStreamReader(connection.getInputStream());
                BufferedReader bufferedReader = new BufferedReader(in);
                StringBuffer strBuffer = new StringBuffer();
                String line = null;
                while ((line = bufferedReader.readLine()) != null) {
                    strBuffer.append(line);
                }
                result = strBuffer.toString();
            } else {
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

    /**
     * Returns a String that is suitable for use as an application/x-www-form-urlencoded
     * list of parameters in an HTTP PUT or HTTP POST.
     *
     * @param params
     * @param charset
     * @return
     * @throws UnsupportedEncodingException
     */
    public static String urlParamsFormat(Map<String, String> params, String charset) throws UnsupportedEncodingException {
        final StringBuilder sb = new StringBuilder();
        for (String key : params.keySet()) {
            final String val = params.get(key);
            if (!TextUtils.isEmpty(key) && !TextUtils.isEmpty(val)) {
                final String encodedName = URLEncoder.encode(key, charset);
                final String encodedValue = URLEncoder.encode(val, charset);
                if (sb.length() > 0) {
                    sb.append(PARAMETER_SEPARATOR);
                }
                sb.append(encodedName).append(NAME_VALUE_SEPARATOR)
                        .append(encodedValue);
            }
        }

        return sb.toString();
    }

    /**
     * trust all host
     */
    private static void trustAllHost() {
        // Create a trust manager that does not validate certificate chains
        // Android use X509 cert
        TrustManager[] trustAllCerts = new TrustManager[]{new X509TrustManager() {
            public X509Certificate[] getAcceptedIssuers() {
                return new X509Certificate[]{};
            }
            public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
            }
            public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
            }
        }};
        // Install the all-trusting trust manager
        try {
            SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(null, trustAllCerts, new SecureRandom());
            HttpsURLConnection
                    .setDefaultSSLSocketFactory(sc.getSocketFactory());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
处理兼容https 的代码HttpX509TrustManager.java
```
package com.example.hms_network.net;
import javax.net.ssl.X509TrustManager;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

public class HttpX509TrustManager implements X509TrustManager {
    @Override
    public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
    }

    @Override
    public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
    }

    @Override
    public X509Certificate[] getAcceptedIssuers() {
        return null;
    }
}
```
#### 原生网络请求具体调用测试
```
    public  void   nativeNet(){
        new Thread(new Runnable() {
            @Override
            public void run() {
                String  getjson= HttpUtils.httpGet(url);
                System.out.println("nativeNet   getjson  --- >  "+getjson);
            }
        }).start();
    }
```
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-9fec59deb675a1d6.png)
我们在控制台看到日志输出了请求返回的数据   
- ##okhttp 请求 
首先要添加依赖  我这边是用jar包本地依赖 当然你再build.gradle里面去添加gradle命令 然后从仓库去拉取依赖也是可以的
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-759c86ee7c2b649e.png )
具体代码
```
    public  void  okhttpNet() {
        OkHttpClient client = new OkHttpClient();
        final Request request = new Request.Builder()
                .get()
                .url(url)
                .build();
        Call call = client.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
            }
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String responseStr = response.body().string();
                System.out.println("responseStr  --- > "+responseStr);
            }
        });
    }

```
- ###okhttputils请求
  (这个是张鸿样大神对okttp的二次封装的一个框架 也比较好用 现在已经不维护了)依赖也是用jar包在本地依赖 也可以在build.gradle里面去添加gradle命令也行
```
   public   void   okhttpUtilsNet(){
        OkHttpUtils.get().
                url(url)
                .build()
                .execute(new StringCallback() {
                    @Override
                    public void onError(Call call, Exception e, int i) {
                        System.out.println("Exception  --- > "+e);
                    }

                    @Override
                    public void onResponse(String s, int i) {
                        System.out.println("okhttpUtilsNet  s  --- > "+s);
                    }
        });
    }
```
- ##zzrHttp
这个是一个ZZR老师 老师的一个开源库 我这里就不多讲 简单说一下  详细的可以去看他的教程哈  
教程地址 ：https://edu.51cto.com/course/25200.html
zzrhttp使用需要在build.gradle里面去添加依赖 
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-1db02c14df267485.png)
然后sing now 点击拉取依赖 
具体代码演示：
```
  public  void  zzrHttp(){
        ZZRHttp.get(url, new ZZRCallBack.CallBackString() {
            @Override
            public void onFailure(int code, String errorMessage) {
                //http访问出错，此部分在主线程中工作,可以更新UI等操做。
            }
            @Override
            public void onResponse(String response) {
                System.out.println("zzrHttp  -- >  response  " +response);
                //http访问成功，此部分在主线程中工作，可以更新UI等操作。
            }
        });
    }
```
以上呢就是我给大家提供的几种鸿蒙开发中网络请求的方式 当然也还有其他的基于纯java语言封装的网络请求的库 理论上在鸿蒙上面都是可以使用的 有兴趣同学可以私下多了解 我这边由于篇幅原因 就不展开细讲了。
##最后总结：
由于鸿蒙开发里面java ui部分使用的是java做基础语言 所以使得 我们java里面提供的网络请求的api到可以很好直接在鸿蒙上面使用 以及包括出名的okhttp okhttputils 知名框架再鸿蒙上也可以完美的使用 ，所以整个网络部分请求的部分还算简单 当然啦这些都还是基础 更加友好的网络请求的使用方式各位同学可以根据实际情况去适当封装处理 来更好实现的我们的需求。 最后希望我的文章能帮助到各位解决问题 ，以后我还会贡献更多有用的代码分享给大家。各位同学如果觉得文章还不错 ，麻烦给关注和star，小弟在这里谢过啦

  