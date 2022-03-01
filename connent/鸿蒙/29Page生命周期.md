Page生命周期


Page生命周期的不同状态转换及其对应的回调，如下图所示：

![【HarmonyOS应用开发】【HCIA认证】模拟题每日1练（第113题）-鸿蒙HarmonyOS技术社区](https://luckly007.oss-cn-beijing.aliyuncs.com/image/d77cf3e695c2b181d3b597b3b420521e5aba46.png)

- **onStart()**

当系统首次创建Page实例时，触发该回调。对于一个Page实例，该回调在其生命周期过程中仅触发一次，Page在该逻辑后将进入INACTIVE状态。开发者必须重写该方法，并在此配置默认展示的AbilitySlice。

- **onActive()**

Page会在进入INACTIVE状态后来到前台，然后系统调用此回调。Page在此之后进入ACTIVE状态，该状态是应用与用户交互的状态。Page将保持在此状态，除非某类事件发生导致Page失去焦点，比如用户点击返回键或导航到其他Page。当此类事件发生时，会触发Page回到INACTIVE状态，系统将调用onInactive()回调。此后，Page可能重新回到ACTIVE状态，系统将再次调用onActive()回调。因此，开发者通常需要成对实现onActive()和onInactive()，并在onActive()中获取在onInactive()中被释放的资源。

- **onInactive()**

当Page失去焦点时，系统将调用此回调，此后Page进入INACTIVE状态。开发者可以在此回调中实现Page失去焦点时应表现的恰当行为。

- **onBackground()**

如果Page不再对用户可见，系统将调用此回调通知开发者用户进行相应的资源释放，此后Page进入BACKGROUND状态。开发者应该在此回调中释放Page不可见时无用的资源，或在此回调中执行较为耗时的状态保存操作。

- **onForeground()**

处于BACKGROUND状态的Page仍然驻留在内存中，当重新回到前台时（比如用户重新导航到此Page），系统将先调用onForeground()回调通知开发者，而后Page的生命周期状态回到INACTIVE状态。开发者应当在此回调中重新申请在onBackground()中释放的资源，最后Page的生命周期状态进一步回到ACTIVE状态，系统将通过

- **onActive()**

回调通知开发者用户。

- **onStop()**

系统将要销毁Page时，将会触发此回调函数，通知用户进行系统资源的释放。