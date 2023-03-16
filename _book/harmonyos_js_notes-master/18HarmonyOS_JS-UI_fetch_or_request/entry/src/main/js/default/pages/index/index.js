import fetch from "@system.fetch";
//import http from '@ohos.net.http';
export default {
    data: {
        title: ""
    },
    onInit() {
        this.title = this.$t('strings.world');
        fetch.fetch({
            url: 'https://api.it120.cc/api/shop/goods/category/all',
            success: function(response) {
                console.log(JSON.stringify(response))
            },
            fail: function() {
                console.info("fetch fail");
            }
        });
//        let httpRequest = http.createHttp();
//        httpRequest.request("https://api.muxiaoguo.cn/api/mobile?phone=17344059697", (err,data) => {
//            if (!err) {
//                console.info('Result:' + JSON.stringify(data));
//            } else {
//                console.info('error:' + err);
//            }
//        })
//        httpRequest.request("https://api.muxiaoguo.cn/api/mobile?phone=17344059697", {
//            method: "POST",
//            connectTimeout: 60000,
//            readTimeout: 60000,
//            header: {
//                'Content-Type': 'application/json'
//            }
//        }).then((data) => {
//            var json = data.result.data;
//            console.info('Result:--->>' + json);
//        })
    }
}
