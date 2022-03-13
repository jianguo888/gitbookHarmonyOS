package com.example.jsuiadvanced;

import ohos.aafwk.content.Intent;
import ohos.ace.ability.AceAbility;

public class ThirdAbility extends AceAbility {
    @Override
    public void onStart(Intent intent) {
        super.setInstanceName("third");
        super.onStart(intent);
    }

    @Override
    public void onStop() {
        super.onStop();
    }
}
