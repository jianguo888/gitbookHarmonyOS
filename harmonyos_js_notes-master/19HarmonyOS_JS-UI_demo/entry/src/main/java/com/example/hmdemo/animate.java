package com.example.hmdemo;

import ohos.ace.ability.AceAbility;
import ohos.aafwk.content.Intent;

public class animate extends AceAbility {
    @Override
    public void onStart(Intent intent) {
        setInstanceName("animate");
        super.onStart(intent);
    }

    @Override
    public void onStop() {
        super.onStop();
    }
}
