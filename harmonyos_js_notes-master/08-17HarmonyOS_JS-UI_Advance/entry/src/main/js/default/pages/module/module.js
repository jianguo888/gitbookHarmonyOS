import app from '@system.app';
import configuration from '@system.configuration';
import notification from '@system.notification';
import device from '@system.device';
import pkg from '@system.package';
import geolocation from '@system.geolocation';
import vibrator from '@system.vibrator';

export default {
    obtainAppInfo() {
        console.info("应用名称：" + app.getInfo().appName);
        console.info("版本号：" + app.getInfo().versionCode);
        console.info("版本名称：" + app.getInfo().versionName);
        console.info("区域：" + configuration.getLocale().countryOrRegion);
        console.info("语言：" + configuration.getLocale().language);
        console.info("阅读方向：" + configuration.getLocale().dir);
    },
    terminateThisApp() {
        app.terminate();
    },
    pushNotification() {
        notification.show({
            contentText: "单击进入对话框测试页面",
            contentTitle: "JavaScript UI给您的通知",
            clickAction: {
                bundleName: "com.example.javascriptui",
                abilityName: "com.example.javascriptui.MainAbility",
                uri: "pages/dialogtest/dialogtest"
            }
        })
    },
    obtainDeviceInfo() {
        device.getInfo({
            success: function(data) {
                console.info('设备品牌：' + data.brand);
                console.info('设备生产商：' + data.manufacturer);
                console.info('设备型号：' + data.model);
                console.info('设备代号：' + data.product);
                console.info('系统语言：' + data.language);
                console.info('系统地区：' + data.region);
                console.info('可使用的窗口宽度：' + data.windowWidth);
                console.info('可使用的窗口高度：' + data.windowHeight);
                console.info('屏幕密度：' + data.screenDensity);
                console.info('屏幕形状：' + data.screenShape);

            },
            fail: function(data, code) {
                console.info('设备信息获取错误。错误代码：'+ code + ' 错误信息： ' + data);
            },
            complete: function(){
                console.info("设备信息获取完毕。");
            }

        });
    },
    checkJavaUIAppInstalled() {
        pkg.hasInstalled({
            bundleName: 'com.example.javaui',
            success: function(data) {
                console.info('JavaUI应用程序安装情况: ' + data);
            },
            fail: function(data, code) {
                console.info('安装信息获取错误。错误代码：'+ code + ' 错误信息： ' + data);
            },
            complete: function(){
                console.info("安装信息获取完毕。");
            }
        });
    },
    obtainGeoInformation() {
        geolocation.getLocation({
            success: function(data) {
                console.info('地理位置信息获取成功。经度:' + data.longitude + " 纬度：" + data.latitude);
            },
            fail: function(data, code) {
                console.info('地理位置信息获取错误。错误代码：'+ code + ' 错误信息： ' + data);
            },
            complete: function(){
                console.info("地理位置信息获取完毕。");
            }
        });
    },
    subcribeGeoInformation() {
        geolocation.subscribe({
            success: function(data) {
                console.info('地理位置信息更新成功。经度:' + data.longitude + " 纬度：" + data.latitude);
            },
            fail: function(data, code) {
                console.info('地理位置信息更新错误。错误代码：'+ code + ' 错误信息： ' + data);
            }
        });
    },
    unsubcribeGeoInformation() {
        geolocation.unsubscribe();
    },
    longVibrate() {
        vibrator.vibrate({
            mode: "long"
        });
    },
    shortVibrate() {
        vibrator.vibrate({
            mode: "short"
        });
    },
}
