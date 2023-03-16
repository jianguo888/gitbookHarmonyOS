import router from '@system.router';
import fetch from '@system.fetch';

export default {
    data: {
        aaa: ""
    },
    onShow() {
        fetch.fetch({
            url: 'https://api.it120.cc/api/shop/goods/category/all',
            success: function(response) {
                console.info(JSON.stringify(response))
                console.info(JSON.stringify(response))
            },
            fail: function() {
                console.info("fetch fail");
            }
        });
//        let httpRequest = http.createHttp();
//        httpRequest.request('https://api.it120.cc/api/shop/goods/category/all',{
//            method: "GET"
//        }).then((res) => {
//            console.log(res);
//        })
    },
    gotoComponentPage() {
        // 跳转到component页面
        router.push ({
            uri: 'pages/component/component'
        });
    },
    gotoContainerPage() {
        // 跳转到container页面
        router.push ({
            uri: 'pages/container/container'
        });
    },
    gotoDialogPage() {
        // 跳转到dialog页面
        router.push ({
            uri: 'pages/dialogtest/dialogtest'
        });
    },
    gotoLogicPage() {
        // 跳转到logic页面
        router.push ({
            uri: 'pages/logic/logic'
        });
    },
    gotoUserInformationPage() {
        // 跳转到userinformation页面
        router.push ({
            uri: 'pages/userinformation/userinformation'
        });
    },
    gotoAdaptionPage() {
        // 跳转到adaption页面
        router.push ({
            uri: 'pages/adaption/adaption'
        });
    },
    gotoModulePage() {
        // 跳转到module页面
        router.push ({
            uri: 'pages/module/module'
        });
    }
}
