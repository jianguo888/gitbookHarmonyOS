//导入鸿蒙的网络请求模块fetch
import  fetch from '@system.fetch';
import http from '@ohos.net.http';
import prompt from '@system.prompt';
export default {
    data: {
        title: 'World',
        winfo: [{"name": 'zdfasd'}]
    },
    onShow() {
        // fetch发起对心知天气服务器的网络请求
//        fetch.fetch({
//            url: `https://api.it120.cc/conner/shop/goods/category/all`,
//            responseType: "json",
//            success: (resp) => {
//                //  JSON.parse(字符串)转换成json数据格式
//                this.winfo = JSON.parse(resp.data)
//                this.winfo = this.winfo.data
//            }
//        });

        // httpRequest发起对心知天气服务器的网络请求
        let httpRequest = http.createHttp();
        httpRequest.request("https://api.it120.cc/conner/shop/goods/category/all", (err, data) => {
            if (!err) {
                console.info('Result:' + data.result);
                console.info('code:' + data.responseCode);
                console.info('header:' + data.header);
                this.winfo = JSON.parse(data.result)
                this.winfo = this.winfo.data
            } else {
                console.info('error:' + err.data);
            }
        });
    },

}
