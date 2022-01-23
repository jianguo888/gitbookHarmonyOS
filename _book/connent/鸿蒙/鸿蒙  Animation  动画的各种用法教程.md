## 前言：
各位同学大家好 ，有段时间没有给大家更新文章了，最近在学习鸿蒙开发 今天要讲的内容是动画。跟安卓里面的动画有点相似但是也有不同的地方 那么我们废话不多说正式开始  
## 准备工作  
华为鸿蒙系统开发初体验 ：[https://www.jianshu.com/p/f94c847c7fdc](https://www.jianshu.com/p/f94c847c7fdc)

##  效果图

![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-4ce04ffa289728d5.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-5f62d47c0c7764f4.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-6bdf73bddaaecb30.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-18488b2ec8cd16b5.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-e6a8e72c2b71225c.png)
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-d80d903611bfe4de.png)

## 具体实现：
 - #### 帧动画 
帧动画是利用视觉暂留现象，将一系列静止的图片按序播放，给用户产生动画的效果
- 1. 在Project窗口，打开“entry > src > main > resources > base > media”，添加一系列图片至media目录下。
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-d384a54dd3aefa58.png)
- 2. 在graphic目录下，新建“animation_element.xml”文件，在XML文件中使用animation-list标签来配置图片资源，duration用来设置显示时长，单位为毫秒。oneshot表示是否只播放一次。
```
 <?xml version="1.0" encoding="utf-8"?>
<animation-list xmlns:ohos="http://schemas.huawei.com/res/ohos"
                ohos:oneshot="false">
    <item ohos:duration="100" ohos:element="$media:01"/>
    <item ohos:duration="100" ohos:element="$media:02"/>
    <item ohos:duration="100" ohos:element="$media:03"/>
    <item ohos:duration="100" ohos:element="$media:04"/>
    <item ohos:duration="100" ohos:element="$media:05"/>
    <item ohos:duration="100" ohos:element="$media:06"/>
    <item ohos:duration="100" ohos:element="$media:07"/>
    <item ohos:duration="100" ohos:element="$media:08"/>
    <item ohos:duration="100" ohos:element="$media:09"/>
    <item ohos:duration="100" ohos:element="$media:10"/>
    <item ohos:duration="100" ohos:element="$media:11"/>
    <item ohos:duration="100" ohos:element="$media:12"/>
</animation-list>
```
- 3 然后我们在AnimationFrameAbilitySlice 中来实现帧动画 
```
package com.example.animation_demo.slice;

import com.example.animation_demo.ResourceTable;
import ohos.aafwk.ability.AbilitySlice;
import ohos.aafwk.content.Intent;
import ohos.agp.components.Component;
import ohos.agp.components.DirectionalLayout;
import ohos.agp.components.element.FrameAnimationElement;

public class AnimationFrameAbilitySlice extends AbilitySlice {
    private FrameAnimationElement frameAnimationElement;
    private DirectionalLayout componentContainer;
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_ability_animation_frame);
        initAnimator();
        initComponents();
    }
    private void initAnimator() {
        //加载动画资源，生成动画对象。
        frameAnimationElement = new FrameAnimationElement(getContext(), ResourceTable.Graphic_animation_element);
    }
    private void initComponents() {
        componentContainer = (DirectionalLayout) findComponentById(ResourceTable.Id_frame_container);
        Component startButton = findComponentById(ResourceTable.Id_start_animation_button);
        startButton.setClickedListener(this::startAnimation);
        Component component = new Component(getContext());
        component.setWidth(500);
        component.setHeight(500);
        component.setBackground(frameAnimationElement);
        componentContainer.addComponent(component);
    }
    private void startAnimation(Component component) {
        frameAnimationElement.start();
    }
    @Override
    protected void onStop() {
        componentContainer.removeAllComponents();
    }
}
```
我们通过 FrameAnimationElement来加载动画资源 然后我们通过 DirectionalLayout来装载我们的 component（用来显示动画的组件） 最后我们通过  frameAnimationElement.start(); 开始播放动画
我们需要在stop生命周期方法里面   frameAnimationElement.stop();来停止动画播放
动画效果如图所示：![0000000000011111111.20210729150034.63146485264099158326299374564633.gif](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-aafc6a4c42c9cad7.gif)
- #### 数值动画
AnimatorValue数值从0到1变化，本身与Component无关。开发者可以设置0到1变化过程的属性，例如：时长、变化曲线、重复次数等，并通过值的变化改变组件的属性，实现组件的动画效果。
布局文件 
```
  <?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">

    <Component
        ohos:id="$+id:value_animation_image"
        ohos:height="70vp"
        ohos:width="70vp"
        ohos:background_element="#00ffff"
        ohos:top_margin="20vp"/>

    <Button
        ohos:id="$+id:animator_spring_button"
        ohos:height="match_content"
        ohos:width="match_parent"
        ohos:background_element="$graphic:button_background"
        ohos:left_margin="24vp"
        ohos:padding="10vp"
        ohos:right_margin="24vp"
        ohos:text="Spring"
        ohos:text_size="16vp"
        ohos:top_margin="30vp"/>

    <Button
        ohos:id="$+id:animator_anticipate_button"
        ohos:height="match_content"
        ohos:width="match_parent"
        ohos:background_element="$graphic:button_background"
        ohos:left_margin="24vp"
        ohos:padding="10vp"
        ohos:right_margin="24vp"
        ohos:text="Anticipate"
        ohos:text_size="16vp"
        ohos:top_margin="30vp"/>

    <Button
        ohos:id="$+id:animator_cycle_button"
        ohos:height="match_content"
        ohos:width="match_parent"
        ohos:background_element="$graphic:button_background"
        ohos:left_margin="24vp"
        ohos:padding="10vp"
        ohos:right_margin="24vp"
        ohos:text="Cycle"
        ohos:text_size="16vp"
        ohos:top_margin="30vp"/>

    <Button
        ohos:id="$+id:animator_overshoot_button"
        ohos:height="match_content"
        ohos:width="match_parent"
        ohos:background_element="$graphic:button_background"
        ohos:left_margin="24vp"
        ohos:padding="10vp"
        ohos:right_margin="24vp"
        ohos:text="Overshoot"
        ohos:text_size="16vp"
        ohos:top_margin="30vp"/>

    <Button
        ohos:id="$+id:animator_smoothStep_button"
        ohos:height="match_content"
        ohos:width="match_parent"
        ohos:background_element="$graphic:button_background"
        ohos:left_margin="24vp"
        ohos:padding="10vp"
        ohos:right_margin="24vp"
        ohos:text="Smooth Step"
        ohos:text_size="16vp"
        ohos:top_margin="30vp"/>

    <Button
        ohos:id="$+id:animator_cubic_button"
        ohos:height="match_content"
        ohos:width="match_parent"
        ohos:background_element="$graphic:button_background"
        ohos:left_margin="24vp"
        ohos:padding="10vp"
        ohos:right_margin="24vp"
        ohos:text="Cubic Hermit"
        ohos:text_size="16vp"
        ohos:top_margin="30vp"/>
</DirectionalLayout>
```
我们在布局文件中写了一个 Component 用来显示动画的控件和几个button用来测试 
#### 布局效果
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-880f6cadde7fac38.png)
我们定义一个方法通过传入 curvyType 动画类型来方便不同数值所显示动画效果类型
```
 private void startValueAnimator(int curvyType) {
      //创建数值动画对象
        AnimatorValue animator = new AnimatorValue();
       //动画时长 
         animator.setDuration(2000);
        //播放前的延迟时间
        animator.setDelay(0);
       //循环次数
        animator.setLoopedCount(1);
      //动画的播放类型
        animator.setCurveType(curvyType);
     //设置动画过程
        animator.setValueUpdateListener(
                (animatorValue, value) -> valueAnimationImage.setContentPosition((int) (700 * value),
                        valueAnimationImage.getContentPositionY()));
      //开始启动动画
        animator.start();
    }
```
## 具体调用 
```
 package com.example.animation_demo.slice;
import com.example.animation_demo.ResourceTable;
import ohos.aafwk.ability.AbilitySlice;
import ohos.aafwk.content.Intent;
import ohos.agp.animation.Animator;
import ohos.agp.animation.AnimatorValue;
import ohos.agp.components.Component;
public class AnimatorValueAbilitySlice extends AbilitySlice {
    private Component valueAnimationImage;

    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_ability_animator_value);
        initComponents();
    }

    private void initComponents() {
        valueAnimationImage = findComponentById(ResourceTable.Id_value_animation_image);
        Component springButton = findComponentById(ResourceTable.Id_animator_spring_button);
        springButton.setClickedListener(component -> startValueAnimator(Animator.CurveType.SPRING));
        Component anticipateButton = findComponentById(ResourceTable.Id_animator_anticipate_button);
        anticipateButton.setClickedListener(component -> startValueAnimator(Animator.CurveType.ANTICIPATE));
        Component cycleButton = findComponentById(ResourceTable.Id_animator_cycle_button);
        cycleButton.setClickedListener(component -> startValueAnimator(Animator.CurveType.CYCLE));
        Component overshootButton = findComponentById(ResourceTable.Id_animator_overshoot_button);
        overshootButton.setClickedListener(component -> startValueAnimator(Animator.CurveType.OVERSHOOT));
        Component smoothStepButton = findComponentById(ResourceTable.Id_animator_smoothStep_button);
        smoothStepButton.setClickedListener(component -> startValueAnimator(Animator.CurveType.SMOOTH_STEP));
        Component cubicHermit = findComponentById(ResourceTable.Id_animator_cubic_button);
        cubicHermit.setClickedListener(component -> startValueAnimator(Animator.CurveType.CUBIC_HERMITE));
    }

    private void startValueAnimator(int curvyType) {
        AnimatorValue animator = new AnimatorValue();
        animator.setDuration(2000);
        animator.setDelay(0);
        animator.setLoopedCount(1);
        animator.setCurveType(curvyType);
        animator.setValueUpdateListener(
                (animatorValue, value) -> valueAnimationImage.setContentPosition((int) (700 * value),
                        valueAnimationImage.getContentPositionY()));
        animator.start();
    }
}
```
## 属性动画 
为Component的属性设置动画是常见的需求，Java UI框架可以为Component设置某个属性或多个属性的动画。
布局文件 
```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:alignment="horizontal_center"
    ohos:orientation="vertical">
    <Component
        ohos:id="$+id:property_animation_image"
        ohos:height="70vp"
        ohos:width="70vp"
        ohos:background_element="#00ffff"
        ohos:top_margin="20vp"/>

    <Button
        ohos:id="$+id:animator_scale_button"
        ohos:height="match_content"
        ohos:width="match_parent"
        ohos:background_element="$graphic:button_background"
        ohos:left_margin="24vp"
        ohos:padding="10vp"
        ohos:right_margin="24vp"
        ohos:text="Scale"
        ohos:text_size="16fp"
        ohos:top_margin="30vp"/>

    <Button
        ohos:id="$+id:animator_rotate_button"
        ohos:height="match_content"
        ohos:width="match_parent"
        ohos:background_element="$graphic:button_background"
        ohos:left_margin="24vp"
        ohos:padding="10vp"
        ohos:right_margin="24vp"
        ohos:text="Rotate"
        ohos:text_size="16fp"
        ohos:top_margin="30vp"/>

    <Button
        ohos:id="$+id:animator_alpha_button"
        ohos:height="match_content"
        ohos:width="match_parent"
        ohos:background_element="$graphic:button_background"
        ohos:left_margin="24vp"
        ohos:padding="10vp"
        ohos:right_margin="24vp"
        ohos:text="Alpha"
        ohos:text_size="16fp"
        ohos:top_margin="30vp"/>
    <Button
        ohos:id="$+id:animator_translate_button"
        ohos:height="match_content"
        ohos:width="match_parent"
        ohos:background_element="$graphic:button_background"
        ohos:left_margin="24vp"
        ohos:padding="10vp"
        ohos:right_margin="24vp"
        ohos:text="Translate"
        ohos:text_size="16fp"
        ohos:top_margin="30vp"/>
</DirectionalLayout>
```
布局预览效果 
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-df5f14cf338fab3e.png)
我们在布局代码中写一个 Component 组件用来处理属性动画显示然后 写了4个button 来触发各种不同动画的展示
- ####  Scale 效果
```
    private void startScaleAnimation(Component component) {
        propertyAnimationImage.setScale(1, 1);
        AnimatorProperty animator = propertyAnimationImage.createAnimatorProperty();
        animator.setCurveType(Animator.CurveType.ANTICIPATE_OVERSHOOT);
        animator.scaleY(0.7f);
        animator.scaleX(1.5f);
        animator.setDuration(2000);
        animator.setLoopedCount(2);
        animator.start();
    }

```
- #### Rotate 效果
```
    private void startRotateAnimation(Component component) {
        propertyAnimationImage.setRotation(0);
        AnimatorProperty animator = propertyAnimationImage.createAnimatorProperty();
        animator.setCurveType(Animator.CurveType.ANTICIPATE_OVERSHOOT);
        animator.rotate(360);
        animator.setDuration(2000);
        animator.setLoopedCount(2);
        animator.start();
    }

```
- #### Alpha 效果
```
    private void startAlphaAnimation(Component component) {
        propertyAnimationImage.setAlpha(1);
        AnimatorProperty animator = propertyAnimationImage.createAnimatorProperty();
        animator.alpha(0.2f);
        animator.setDuration(1000);
        animator.setLoopedCount(2);
        animator.start();
    }
```
- #### Translate 效果
```
 private void startTranslateAnimation(Component component) {
        AnimatorProperty animator = propertyAnimationImage.createAnimatorProperty();
        animator.moveToX(0);
        animator.setDuration(1000);
        animator.setLoopedCount(2);
        animator.start();
    }
```
##  动画集合
如果需要使用一个组合动画，可以把多个动画对象进行组合，并添加到使用AnimatorGroup中。AnimatorGroup提供了两个方法：runSerially() 和 runParallel()，分别表示动画按顺序开始和动画同时开始
布局文件  
```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">

    <DirectionalLayout
        ohos:height="0vp"
        ohos:width="match_parent"
        ohos:alignment="horizontal_center"
        ohos:orientation="horizontal"
        ohos:padding="10vp"
        ohos:top_margin="20vp"
        ohos:weight="1">

        <Component
            ohos:id="$+id:target_image1"
            ohos:height="60vp"
            ohos:width="60vp"
            ohos:background_element="#00ffff"/>

        <Component
            ohos:id="$+id:target_image2"
            ohos:height="60vp"
            ohos:width="60vp"
            ohos:background_element="#00ffff"
            ohos:left_margin="10vp"/>

        <Component
            ohos:id="$+id:target_image3"
            ohos:height="60vp"
            ohos:width="60vp"
            ohos:background_element="#00ffff"
            ohos:left_margin="10vp"/>

        <Component
            ohos:id="$+id:target_image4"
            ohos:height="60vp"
            ohos:width="60vp"
            ohos:background_element="#00ffff"
            ohos:left_margin="10vp"/>
    </DirectionalLayout>

    <DirectionalLayout
        ohos:height="match_content"
        ohos:width="match_parent"
        ohos:bottom_margin="50vp"
        ohos:margin="24vp">

        <Button
            ohos:id="$+id:serially_animator_button"
            ohos:height="match_content"
            ohos:width="match_parent"
            ohos:background_element="$graphic:button_background"
            ohos:padding="10vp"
            ohos:text="Serially Animator Group"
            ohos:text_size="16vp"/>

        <Button
            ohos:id="$+id:parallel_animator_button"
            ohos:height="match_content"
            ohos:width="match_parent"
            ohos:background_element="$graphic:button_background"
            ohos:padding="10vp"
            ohos:text="Parallel Animator Group"
            ohos:text_size="16vp"
            ohos:top_margin="20vp"/>

        <Button
            ohos:id="$+id:builder_animator_button"
            ohos:height="match_content"
            ohos:width="match_parent"
            ohos:background_element="$graphic:button_background"
            ohos:padding="10vp"
            ohos:text="Animator Group Builder"
            ohos:text_size="16vp"
            ohos:top_margin="20vp"/>
    </DirectionalLayout>
</DirectionalLayout>
```
布局效果
![image.png](https://luckly007.oss-cn-beijing.aliyuncs.com/image/6865547-651ea159807add0d.png)
布局代码中我们写了4个 Component 来处理动画集合效果 以及配合写了3个button 来触发不同组合动画的效果 
- 1动画组按照指定添加顺序来执行 
```
    private void startBuilderAnimator(Component component) {
        AnimatorGroup.Builder animatorGroupBuilder = animatorGroup.build();
        animatorGroupBuilder.addAnimators(targetAnimator1)
                .addAnimators(targetAnimator2, targetAnimator3)
                .addAnimators(targetAnimator4);
        animatorGroup.start();
    }

```
- 2动画组里面动画同时执行
```
    private void startParallelAnimator(Component component) {
        animatorGroup.runParallel(targetAnimator1, targetAnimator2, targetAnimator3, targetAnimator4);
        animatorGroup.start();
    }
```
- 3动画组里面动画按顺序执行
```
    private void startSeriallyAnimator(Component component) {
        animatorGroup.runSerially(targetAnimator1, targetAnimator2, targetAnimator3, targetAnimator4);
        animatorGroup.start();
    }
```
## 完整代码 
```
package com.example.animation_demo.slice;

import com.example.animation_demo.ResourceTable;
import ohos.aafwk.ability.AbilitySlice;
import ohos.aafwk.content.Intent;
import ohos.agp.animation.Animator;
import ohos.agp.animation.AnimatorGroup;
import ohos.agp.animation.AnimatorValue;
import ohos.agp.components.Component;

public class AnimatorGroupAbilitySlice extends AbilitySlice {
    private AnimatorValue targetAnimator1;

    private AnimatorValue targetAnimator2;

    private AnimatorValue targetAnimator3;

    private AnimatorValue targetAnimator4;

    private AnimatorGroup animatorGroup;

    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_ability_animator_group);
        initComponents();
        animatorGroup = new AnimatorGroup();
    }

    private void initComponents() {
        Component targetImage1 = findComponentById(ResourceTable.Id_target_image1);
        targetAnimator1 = getValueAnimator(targetImage1);
        Component targetImage2 = findComponentById(ResourceTable.Id_target_image2);
        targetAnimator2 = getValueAnimator(targetImage2);
        Component targetImage3 = findComponentById(ResourceTable.Id_target_image3);
        targetAnimator3 = getValueAnimator(targetImage3);
        Component targetImage4 = findComponentById(ResourceTable.Id_target_image4);
        targetAnimator4 = getValueAnimator(targetImage4);

        findComponentById(ResourceTable.Id_serially_animator_button).setClickedListener(this::startSeriallyAnimator);
        findComponentById(ResourceTable.Id_parallel_animator_button).setClickedListener(this::startParallelAnimator);
        findComponentById(ResourceTable.Id_builder_animator_button).setClickedListener(this::startBuilderAnimator);
    }

    private void startBuilderAnimator(Component component) {
        AnimatorGroup.Builder animatorGroupBuilder = animatorGroup.build();
        animatorGroupBuilder.addAnimators(targetAnimator1)
                .addAnimators(targetAnimator2, targetAnimator3)
                .addAnimators(targetAnimator4);
        animatorGroup.start();
    }

    private void startParallelAnimator(Component component) {
        animatorGroup.runParallel(targetAnimator1, targetAnimator2, targetAnimator3, targetAnimator4);
        animatorGroup.start();
    }

    private void startSeriallyAnimator(Component component) {
        animatorGroup.runSerially(targetAnimator1, targetAnimator2, targetAnimator3, targetAnimator4);
        animatorGroup.start();
    }

    private AnimatorValue getValueAnimator(Component component) {
        AnimatorValue animator = new AnimatorValue();
        animator.setDuration(2000);
        animator.setLoopedCount(0);
        animator.setCurveType(Animator.CurveType.BOUNCE);
        animator.setValueUpdateListener(
                (animatorValue, value) -> component.setContentPosition(component.getContentPositionX(),
                        (int) (800 * value)));
        return animator;
    }
}
```
到此鸿蒙的集中常用动画已经讲完了
## 最后总结：
鸿蒙系统api里面提供了帧动画 数值动画 和属性动画3中基础动画 我们还可以利用官方提供动画集合几种基础的动画组合起来来实现更为复杂和炫酷的动画效果，有兴趣同学可以私下多研究 这里篇幅有限我就不展开讲了。最后希望我的文章能帮助到各位解决问题 ，以后我还会贡献更多有用的代码分享给大家。各位同学如果觉得文章还不错 ，麻烦给关注和star，小弟在这里谢过啦。
## 项目地址：
https://gitee.com/qiuyu123/animation_demo