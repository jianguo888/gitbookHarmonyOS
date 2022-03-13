package com.example.jsuiadvanced;

import ohos.ace.ability.AceAbility;
import ohos.aafwk.content.Intent;

public class SecondAbility extends AceAbility {
    @Override
    public void onStart(Intent intent) {
        super.setInstanceName("second");
        super.onStart(intent);
    }

    @Override
    public void onStop() {
        super.onStop();
    }
}
