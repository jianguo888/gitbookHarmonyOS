## 第一篇

## AntV 企业级可视化解决方案

AntV 3.0 主要包含 G2、G6、F2、L7 以及一套完整的图表使用和设计规范。得益于丰富的业务场景和用户需求挑战，AntV 经历多年积累与不断打磨，已支撑阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验后方敢与君见。

## 优势：

简单方便

从数据出发，仅需几行代码可以轻松获得想要的图表展示效果。

方便可靠

大量产品实践之上，提供绘图引擎、完备图形语法，专业设计规范。

无限可能

任何图表，都可以基于图形语法灵活绘制，满足你无限的创意。







## 第一篇

## 什么是 G6

[G6](https://github.com/antvis/g6) 是一个图可视化引擎。它提供了图的绘制、布局、分析、交互、动画等图可视化的基础能力。旨在让关系变得透明，简单。让用户获得关系数据的 Insight。



## G6 的特性

G6 作为一款专业的图可视化引擎，具有以下特性：

- 丰富的元素：内置丰富的节点与边元素，自由配置，支持自定义；
- 可控的交互：内置 10+ 交互行为，支持自定义交互；
- 强大的布局：内置了 10+ 常用的图布局，支持自定义布局；
- 便捷的组件：优化内置组件功能及性能；
- 友好的体验：根据用户需求分层梳理文档，支持 TypeScript 类型推断。

除了默认好用、配置自由的内置功能，元素、交互、布局均具有高可扩展的自定义机制。

新建 index.html 文件，并添加如下代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Tutorial Demo</title>
  </head>
  <body>
    <!-- 引入 G6 -->
    <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.7.1/dist/g6.min.js"></script>
    <!-- 4.x and later versions -->
    <!-- <script src="https://gw.alipayobjects.com/os/lib/antv/g6/4.3.11/dist/g6.min.js"></script> -->

    <script>
      console.log(G6.Global.version);
    </script>
  </body>
</html>
```

使用浏览器打开 index.html 文件，打开控制台，可以看到 G6 的版本号，说明 G6 已成功引入。