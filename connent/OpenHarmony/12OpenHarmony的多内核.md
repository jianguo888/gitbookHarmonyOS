## OpenHarmony的多内核

> 作者：坚果
>
> 公众号："[大前端之旅](https://mp.weixin.qq.com/s/aJvihD4dzEJyOV3q6_Zeng)"
>
> 华为云享专家，InfoQ签约作者，阿里云专家博主，51CTO博客首席体验官，[开源项目GVA成员之一](https://www.gin-vue-admin.com/)，专注于大前端技术的分享，包括Flutter,小程序,安卓，VUE，JavaScript。







## Linux内核





Linux内核的作用是将应用层序的请求传递给硬件，并充当底层驱动程序，对系统中的各种设备和组件进行寻址。支持模块的动态装卸(裁剪)。Linux内核就是基于这个策略实现的。选择Linux是因为他的开源性以及成熟度。关于他的更多介绍，其实公开资料更多，就不做介绍了。

## LiteOS内核

Huawei LiteOS 是华为自研、开源的物联网实时操作系统，ARM、RISC-V等主流的CPU架构，以轻量级低功耗，快速启动，互联互通，安全等关键能力，为开发者提供 “一站式” 完整软件平台，有效降低开发门槛、缩短开发周期。

OpenHarmony 轻量级内核是基于IoT领域轻量级物联网操作系统Huawei LiteOS内核演进发展的新一代内核，包含LiteOS-M和LiteOS-A两类内核。

- LiteOS-M
  - LiteOS-M内核主要应用于轻量系统，面向的MCU一般是百K级内存，可支持MPU隔离，业界类似的内核有FreeRTOS或ThreadX等；
- LiteOS-A
  - LiteOS-A内核主要应用于小型系统，面向设备一般是M级内存，可支持MMU隔离，业界类似的内核有Zircon或Darwin等。

## LiteOS-M

LiteOS-M的设计目标是支持小设备的运行

LiteOS-M的系统架构

OpenHarmony LiteOS-M内核是面向IoT领域构建的轻量级物联网操作系统内核，具有小体积、低功耗、高性能的特点，其代码结构简单，主要包括内核最小功能集、内核抽象层、可选组件以及工程目录等，分为硬件相关层以及硬件无关层，硬件相关层提供统一的HAL（Hardware Abstraction Layer）接口，提升硬件易适配性，不同编译工具链和芯片架构的组合分类，满足AIoT类型丰富的硬件和编译工具链的拓展。



它实现了进程，线程，内存等管理机制，提供了常见IPC，软定时器，等公共模块，可以大幅度降低嵌入式设备开发的难度。

### 目录

目录结构如下，

```
/kernel/liteos_m
├── arch                 # 内核指令架构层目录
│   ├── arm              # arm 架构代码
│   │   ├── arm9         # arm9 架构代码
│   │   ├── cortex-m3    # cortex-m3架构代码
│   │   ├── cortex-m33   # cortex-m33架构代码
│   │   ├── cortex-m4    # cortex-m4架构代码
│   │   ├── cortex-m7    # cortex-m7架构代码
│   │   └── include      # arm架构公共头文件目录
│   ├── csky             # csky架构代码
│   │   └── v2           # csky v2架构代码
│   ├── include          # 架构层对外接口存放目录
│   ├── risc-v           # risc-v 架构
│   │   ├── nuclei       # 芯来科技risc-v架构代码
│   │   └── riscv32      # risc-v官方通用架构代码
│   └── xtensa           # xtensa 架构代码
│       └── lx6          # xtensa lx6架构代码
├── components           # 可选组件
│   ├── backtrace        # 栈回溯功能
│   ├── cppsupport       # C++支持
│   ├── cpup             # CPUP功能
│   ├── dynlink          # 动态加载与链接
│   ├── exchook          # 异常钩子
│   ├── fs               # 文件系统
│   ├── lmk              # Low memory killer 机制
│   ├── lms              # Lite memory sanitizer 机制
│   ├── net              # Network功能
│   ├── power            # 低功耗管理
│   ├── shell            # shell功能
│   └── trace            # trace 工具
├── drivers              # 驱动框架Kconfig
├── kal                  # 内核抽象层
│   ├── cmsis            # cmsis标准接口支持
│   └── posix            # posix标准接口支持
├── kernel               # 内核最小功能集支持
│   ├── include          # 对外接口存放目录
│   └── src              # 内核最小功能集源码
├── targets              # 板级工程目录
├── testsuites           # 内核测试用例
├── tools                # 内核工具
├── utils                # 通用公共目录
```



OpenHarmony LiteOS-M内核的编译构建系统是一个基于gn和ninja的组件化构建系统，支持按组件配置、裁剪和拼装，按需构建出定制化的产品。

## LiteOS-A

OpenHarmony LiteOS-A内核是基于Huawei LiteOS内核演进发展的新一代内核，是面向IoT领域构建的轻量级物联网操作系统。新增了丰富的内核机制、更加全面的POSIX标准接口以及统一驱动框架**HDF**（OpenHarmony Driver Foundation）等，为设备厂商提供了更统一的接入方式，为OpenHarmony的应用开发者提供了更友好的开发体验。



![image-20220317165722121](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20220317165722121.png)

### 目录

```
/kernel/liteos_a
├── apps                   # 用户态的init和shell应用程序
├── arch                   # 体系架构的目录，如arm等
│   └── arm                # arm架构代码
├── bsd                    # freebsd相关的驱动和适配层模块代码引入，例如USB等
├── compat                 # 内核接口兼容性目录
│   └── posix              # posix相关接口
├── drivers                # 内核驱动
│   └── char               # 字符设备
│       ├── mem            # 访问物理IO设备驱动
│       ├── quickstart     # 系统快速启动接口目录
│       ├── random         # 随机数设备驱动
│       └── video          # framebuffer驱动框架
├── fs                     # 文件系统模块，主要来源于NuttX开源项目
│   ├── fat                # fat文件系统
│   ├── jffs2              # jffs2文件系统
│   ├── include            # 对外暴露头文件存放目录
│   ├── nfs                # nfs文件系统
│   ├── proc               # proc文件系统
│   ├── ramfs              # ramfs文件系统
│   └── vfs                # vfs层
├── kernel                 # 进程、内存、IPC等模块
│   ├── base               # 基础内核，包括调度、内存等模块
│   ├── common             # 内核通用组件
│   ├── extended           # 扩展内核，包括动态加载、vdso、liteipc等模块
│   ├── include            # 对外暴露头文件存放目录
│   └── user               # 加载init进程
├── lib                    # 内核的lib库
├── net                    # 网络模块，主要来源于lwip开源项目
├── platform               # 支持不同的芯片平台代码，如Hi3516DV300等
│   ├── hw                 # 时钟与中断相关逻辑代码
│   ├── include            # 对外暴露头文件存放目录
│   └── uart               # 串口相关逻辑代码
├── security               # 安全特性相关的代码，包括进程权限管理和虚拟id映射管理
├── syscall                # 系统调用
└── tools                  # 构建工具及相关配置和代码
```



OpenHarmony LiteOS-A内核支持Hi3518EV300、Hi3516DV300单板，开发者可基于两种单板开发运行自己的应用程序。

以上就是关于内核的一些基本介绍。



## 参考文档

https://gitee.com/openharmony