package com.example.myapplication;

import ohos.ace.ability.AceAbility;
import ohos.aafwk.content.Intent;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MainAbility extends AceAbility {
    private void test() {
        int[] intArray = {1,2,3,4,5,6,3,2,4,5};
        String strOutput = "";
        for (int value: intArray) {
            strOutput += "" + value;
        }
        HiLog.info(label,"输出Array："+ strOutput);

        // Hashmap
        Map personInformation = new HashMap();
        personInformation.put("name","aaa");
        personInformation.put("age",99);
        personInformation.put("sex","男");
        personInformation.put("height",166);

        HiLog.info(label,"输出personInfomation："+ personInformation.toString());
    }
    private static final HiLogLabel label = new HiLogLabel(HiLog.LOG_APP, 0x00201, "MY_TAG");
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        HiLog.info(label, "onStart");
        requestPermissions();
        HiLog.info(label,"输出：%{public}d", 100);
        test();
    }
    private void requestPermissions() {
        // 需要处理的权限
        String[] permissions = {
                "ohos.permission.LOCATION",
                "ohos.permission.LOCATION_IN_BACKGROUND"
        };
        // 可动态授权的权限
        List<String> permissionsToProcess = new ArrayList<>();
        // 遍历需要处理的权限
        for (String permission : permissions) {
            // 判断需要处理的权限是否可动态授权
            if (verifySelfPermission(permission) != 0 && canRequestPermission(permission)) {
                permissionsToProcess.add(permission);
            }
        }
        // 弹窗申请权限
        requestPermissionsFromUser(permissionsToProcess.toArray(new String[0]), 0);
    }
    @Override
    public void onActive() {
        super.onActive();
        HiLog.info(label, "onActive");
    }

    @Override
    public void onForeground(Intent intent) {
        super.onForeground(intent);
        HiLog.info(label, "onForeground");
    }

    @Override
    public void onBackground() {
        super.onBackground();
        HiLog.info(label, "onBackground");
    }

    @Override
    public void onInactive() {
        super.onInactive();
        HiLog.info(label, "onInactive");
    }

    @Override
    public void onStop() {
        super.onStop();
        HiLog.info(label, "onStop");
    }

//    @Override
//    public Object onStoreDataWhenConfigChange() {
//        return "需要存储的数据，转换为Object对象";
//    }

}
