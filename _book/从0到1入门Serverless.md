
摘要通过本文可以了解什么是Serverless及Serverless演进史，Serverless的常见应用场景及价值。

## 1. Serverless函数计算及应用场景

### 1.1Serverless的概念，特征以及价值

#### 1.1.1Serverless是什么？

##### CNCF定义

一种新的云原生计算模型，无需服务器管理而构建和运行应用程序的架构。一个或多个功能的应用上传到平台后执行、扩展和计费

CNCF定义Serverless的LandScape在多个层面协同发展

![image-20220320165623321](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320165623321.png)

##### 信通院定义

以应用为中心，无需关注基础设施的计算模式，FaaS不是其唯一形态。Serverless是一整套能力的合集，越来越多的第3三方

服务演进为全托管的Serverless形态

Serverless是云上一整套能力的合集，而不是单一的云服务产品

![image-20220320165649837](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320165649837.png)



#### 1.1.2Serverless成国际研究热潮，

预言将成为下一-代默认的计算范式

![image-20220320165850791](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320165850791.png)



Serverless函数计算的价值

![image-20220320170052455](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320170052455.png)

### 1.2Serverless函数计算的典型应用场景

#### 1.2.1Serverless函数计算适用场景

Serverless函数计算适用场景主要有以下三类，Web类应用IoT，媒体处理类应用，AI处理应用

##### Web类应用

解放端侧开发，让端开发者更快、更灵活开发各种应用，无需关注后端服务

- 小程序后端
- Web后端

- 问答机器人

- 前端BFF

![image-20220320170555988](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320170555988.png)

##### IoT，媒体处理类应用

以事件驱动的方式执行服务，按需供给,开发者无需关注业务波峰波谷，节省闲时成本，最终降低运维的成本

- 实时图片处理

- 实时数据流处理

- loT事件处理
- 运维告警处理

![image-20220320170650424](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320170650424.png)

##### AI处理应用

各行各业智能化深入带来更多的应用开发场景，通常需要集成各类服务快速上线

- 视频直播
- Al推理
- 人脸识别

- 车牌识别

![image-20220320170733726](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320170733726.png)



#### 1.2.2六个典型的应用场景

###### 典型场景一: Web/App/小程序后端

场景需求特点:

- 业务变化快，
- 上线周期短

函数计算优势:

- 无需管理服务器，
- 开发上线快

![image-20220320171231340](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320171231340.png)

###### 典型场景二:BFF/SSR 

场景需求特点:

BFF/SSR和业务强相关，通常由前端开发，但前端并不擅长服务器的部署、运维

函数计算优势:

- 无需管理服务器
- 前端可使用熟悉的技术栈开发

![image-20220320172855880](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320172855880.png)

###### 典型场景三:事件触发 

场景需求特点:
1、业务事件频次不高或波峰波谷明显

函数计算优势:

- 按需付费
- 毫秒级自动弹性

![image-20220320172839341](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320172839341.png)

###### 典型场景四:服务间快速集成 

场景需求特点:

- 1、业务需要串联多个服务，被集成服务提供了API或SDK
- 2、业务创新需要方案能快速打通试错，并具有一定的扩展性

函数计算优势:

- 多语言开发，事件驱动特性方便对接各类服务
- 按需自动弹性即保证了扩展性又兼顾了成本

![image-20220320172649970](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320172649970.png)

###### 典型场景五：视频转码函数工作流

场景需求特点:

- 多步骤弹性并发处理，步骤耗时长
- 需要容错

函数工作流优势:

- 自动弹性满足大并发

- 状态维护，失败重试保证可靠

  

  ![image-20220320172618428](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320172618428.png)

###### 典型场景六: 安全运维函数工作流

场景需求特点:

- 灵活编排
- 自动化和人工处理相结合

函数工作流优势:

- 编排更灵活，支持深度自定义逻辑
- 通知+回调的方式支持人工介入流程

![image-20220320171808467](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320171808467.png)

## 2.FunctionGraph产品能力与应用案例

### 2.1Serverless趋势及服务全景

##### 2.1.1Serverless趋势及华为云Serverless服务

Serverless是下一-代默认的计算范式，将在未来5- 10年内成为云的首要交付模式
Serverless的价值:能够为应用屏蔽基础设施，提供自动化运行环境、随时按实际用量计费、免运维的能力



![image-20220320175930960](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320175930960.png)



##### 2.1.2FunctionGraph2.0使用场景与客户选择

![image-20220320180018698](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320180018698.png)





### 2.2典型客户场景



##### 2.2.1华为视频:前端基于函数开发中间层，实现前后端解耦，开发上线效率提升1 00%+

![image-20220320180100293](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320180100293.png)

1.场景&问题

场景:视频App前端展示的内容随业务需要经常变化，包括排版更新，新功能上线
问题:前端变化的内容往往只涉及后端数据的重新组合或者格式转换，但却需要前后端一起配合修改，沟通成本高，版本上线慢

2.解决方案
前端使用自己熟悉的Node.js语言开发函数，作为中间层调用后端微服务，对数据裁剪、聚合以适配前端业务需要。

3.价值&收益

前后端彻底解耦，前端聚焦业务，后端仅需提供通用接口，不再关心数据如何展示，减少了

沟通成本

前端只需开发中间层业务函数，业务服务器的部署、运维和扩容，都由函数计算平台托管，开发上线效率提升100%以上



##### 2.2.2阿联酋xx: Serverless化构建 车队管理系统，上线周期缩短一 半，总成本降低30%

![image-20220320180302681](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320180302681.png)



##### 2.2.3XX车企:函数结合AI等服务，毫秒级弹性伸缩和NoOps支持实时小碰撞检测

![image-20220320191239740](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320191239740.png)

### 2.3FunctionGraph主要能力

#### 2.3.1FunctionGraph 2.0:基于华为元戎的新一代函数计算与编排服务，8大特性发布

![image-20220320191114600](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320191114600.png)

#### 2.3.2特性1:丰富的函数开发语言及触发方式让设计更灵活

![image-20220320190420928](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320190420928.png)

#### 2.3.3特性2:可视化拖拽式函数流支持编排复杂业务场景

![image-20220320190158242](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320190158242.png)

#### 2.3.4特性3:统一-插件支持云上和云下的开发与调试

![image-20220320190010698](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320190010698.png)

#### 2.3.5特性4: Http函数让WEB服务近乎0成本改造，享受Serverless优势能力

![image-20220320180612732](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320180612732.png)

#### 2.3.6特性5:函数支持容器镜像，简化应用Serverless化

![image-20220320180536247](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320180536247.png)

#### 2.3.7特性6:函数支持在运行时动态指定资源，灵活调度节省成本

![image-20220320180504268](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320180504268.png)

#### 2.3.8特性7:百毫秒冷启动时延,单实例多并发，毫秒级弹性

![image-20220320180435908](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320180435908.png)

#### 2.3.9特性8: 1ms粒度按量计费,节省开支

![image-20220320180350652](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320180350652.png)

## 3.FunctionGraph技术原理与实践

### 3.1.函数计算关键技术原理



#### 3.1.1Serverless架构优势

![image-20220320173252815](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320173252815.png)

#### 3.1.2Serverless函数带来的挑战:冷启动

- 函数被伯克利称为“异步调用的微服务”;
- 从Long Running变为Event Driven,函数的启动时延成为关键指标，直接影响哪些应用能够函数化;

![image-20220320173340773](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320173340773.png)

#### 3.1.3冷启动时延优化

##### 平台侧优化

1.池化
大小自适应的空实例池，按当前池消耗速率和容器产生速度动态调整容器池大小，优化启动速度同时降低增加空函数实例的成本
2.网络优化
简化网络配置，提升启动速度
3.函数代码预加载
基于LRU ( Least Recently Used )的多级代码包缓存，预创建不含代码包的空实例，优化容器首次启动与调度时延
4.解压缩优化
高性能的压缩算法提升解压速度和压缩比

![image-20220320173433710](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320173433710.png)

##### 用户侧优化

##### 预留实例:

预留实例是将函数实例的创建和释放交由用户管理,当您为某一函数创建了预留实例，函数_ I作流收到此函数的调用请求时，会

优先将请求转发给您的预留实例，当请求的峰值超过预留实例处理能力时，剩余部分的请求将会转发给按量实例，由函数工作流自动为您

分配执行环境。预留实例在创建完成后，会自动加载该函数的代码、依赖包以及执行初始化入口函数，且预留实例会常驻环境，消除冷启

动对业务的影响。

1.减少代码包大小

代码包过大会增加传输、解压、加载时间，通过去冗余文件等减少代码包大小对冷启动时延优化效果较明显

2.选择合适语言

nodjs、python、 golang- -般优于java, 针对java也可以尝试编译成本地代码方式

3.降低代码初始化时间

升级依赖包，合并依赖文件等

4.选择合适的内存

函数内存越大，计算能力越强，冷启动表现越优

5.预留实例

1.根据业务 波峰波谷配置固定预留实例，超出部分通过弹性实例解决

2.定制自己业务 需要的预留实例策略

#### 3.1.4Serverless运行模型带来的注意事项

![image-20220320174008419](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320174008419.png)

- Serverless运行模型与传统模型最大区分在于动态伸缩，最小可以缩小到0
- 如果有预留实例，请求优先发到预留实例，预留实例是LongRunning
- 函数平台为了尽量避免冷启动，一般在一次请求执行完并不会立刻销毁，一般会保留N分钟左右，在后续请求会进行实例复用。如果N分钟无请求则会销毁函数实例，内存变量和临时文件也同时销毁
- 因为实例复用，在同一个函数的多次请求之间可能会复用内存变量和临时文件，如果需要在上一-次请求和本次请求调用之间做隔离则需要在代码里做删除文件操作和变量清除
- 如果需要长期保持和共享文件，可以通过挂载文件系统( sfs、sfs turbo、ecs等)，文件系统上的数据不会删除

#### 3.1.5函数调用机制

![image-20220320174033117](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320174033117.png)

##### 同步调用

客户端请求需要明确等到响应结果，也就是说这样的请求必须等调用到用户的函数调用完成才返回

##### 异步调用

异步调用是指客户端不关注请求调用的结果，服务端收到请求后将请求排队，排队成功后请求就返回，服务端在空闲的情况下会逐个处理排队的请求。

##### 如何选择

- 看是否需要等待返回的结果
- 看函数执行时长，如果超过90秒，建议异步
- 异步支持执行完通知特性， 可配置通知机制

#### 3.1.6单实例多并发:支持更多调用

![image-20220320174244216](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320174244216.png)

### 3.2.函数计算实践分享

#### 3.2.1架构模式的变化:从微服务化逐步向Serverless化演进，并将长期共存

![image-20220320174449032](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320174449032.png)



#### 3.2.2客户Serverless化推荐路径:新业务试点，渐进式改造

![image-20220320174525593](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320174525593.png)

#### 3.2.3如何提高调用可靠性

![image-20220320174616024](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320174616024.png)

平台侧

多AZ、多集群、反亲和、内部重试、链路优化等

用户侧

- 1.同步调用从客户端重试、
- 2.异步调用配置重试策略， 如果想获知结果可以配置成功时或失败时的通知目的端



#### 3.2.4如何从架构层面提升可靠性

![image-20220320174717393](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320174717393.png)

- 1.应用程序部署采用跨AZ
- 2.针对高并发高可靠场景， 函数入口之前采用消息队列如Kafka, kafka触发函数执行
- 3.函数交互过程按需使用消息队列

#### 3.2.5如何定位性能问题

![image-20220320174809686](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320174809686.png)

如何定位性能问题，除了可以通过监控、日志，我们对接了APM2.0， 可以做到免侵入式调用链能力，支持自动采集jvm,sql， exception, redis, httpclient, kafka,tomcat等框架， 支持多函数调用拦截



#### 3.2.6如何灰度发布

![image-20220320174840761](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320174840761.png)



用户可以创建别名，指向特定函数版本。别名的优势在于:如果需要回滚到之前的函数版本，则可以将相应别名指向该版本，不再需要修

改代码信息。

函数别名支持绑定两个版本，-个对应版本和开启灰度版本，并且支持配置同一个别名下两个不同版本分流权重。

#### 3.2.7如何零改动迁移现有Web应用到函数

![image-20220320174958785](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320174958785.png)

##### 场景问题

微服务和函数在未来几年会是一个共存的形态，当前存在着大量微服务应用，如何高效的支撑其Serverless化，让现有微服务快速享用到
Serverless的优势能力，是一个待解决的问题。

##### 方案

针对Web服务，推出API网关加FunctionGraph的Http函数方案，用户只需把原有的Web Server代码打包为一个Http函数，即可完成Serverless化改造。

##### 价值体现

- 多语言WEB框架支持，例如: Java - Spring Boot, Nodejs - Express等框架开发的应用极小修改就是能完成Serverless函数化改造。
- 开发人员可以继续使用熟悉的开发框架和测试工具， AP|网关服务随函数自动化创建，降低开发人员学习负担。
- 改造后无需运维资源，简单配置即可实现100ms级自动弹性和灰度升级。

#### 

### 3.2.8HTTP函数原理

![image-20220320175151107](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320175151107.png)

#### 事件函数

事件函数的请求经过API网关或者其他触发器时，会对请求的消息进行编码成固定的事件格式，FunctionGraph 直接调用用户函数里的方法并将事件消息作为参数传入。

#### HTTP函数

用户发送的HTTP请求经过API网关后，网关会将原生HTTP请求直接透传的到FunctionGraph, FunctionGraph讲请求直接转发到用户函数代码里起的webserver里。

### 3.2.9数据库连接池实战



![image-20220320175306194](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320175306194.png)



#### 方案一(单实例多并发+预留实例)

- 预留实例确保了连接池是常驻
- 单实例多并发确保函数实例可以处理更多请求

- 另外需要注意配置函数总并发实例数
- 数据库最大连接数尽 量配置大些

#### 方案二(数据库代理方式)

- 通过数据库代理来访问数据库， 代理到数据库之间为长连接
- 数据库代理可以通过读写分离支持更多请求





### 3.2.10函数调用如何降低成本



![image-20220320175509331](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320175509331.png)



#### 网络访问相关实践

![image-20220320175545441](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320175545441.png)

### 3.3.高阶特性:有状态

#### 3.3.1函数和有状态的关系

![image-20220320175624524](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320175624524.png)

#### 3.3.2有状态函数运行逻辑



![image-20220320175716178](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320175716178.png)

#### 3.3.3有状态应用模式

![image-20220320175743008](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220320175743008.png)



## 总结

通过上面的一些解释，我们了解什么是Serverless及Serverless演进史，Serverless的常见应用场景及价值。Serverless的六个典型的应用场景，以及FunctionGraph的八大特性，以及对函数计算实践分享的一些分享。

> 本文整理自华为云社区【内容共创】活动第14期。
> https://bbs.huaweicloud.com/blogs/336904
> 任务12[从0到1入门Serverless](https://education.huaweicloud.com/courses/course-v1:HuaweiX+CBUCNXNX013+Self-paced/about)