---
title: 设计
order: 2
nav:
  title: 指南
  path: /guide
---

## 背景

#### 为什么要做 LarkMap？

封装位置可视分析 React 组件库 LarkMap，沉底地图组件、分析组件、图层组件等，夯实位置可视分析组件基础，丰富 L7 技术栈生态，沉淀这样一套组件库可方便业务快速开发使用。

#### LarkMap 关系？

LarkMap 是 L7 技术栈的 React 组件库，上层业务直接使用，下游是 L7 技术栈。

![下游技术栈](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cZAVSYJ7xo8AAAAAAAAAAAAADmJ7AQ/original.png)

## 架构

![架构](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*108gQJdC9IgAAAAAAAAAAAAADmJ7AQ/original.png)

## 目标

LarkMap 定位为位置可视分析组件库，组件可分为以下几大类：

- 容器组件：不同底图有高德，Mapbox，L7Map
- 图层组件：有基础图层与复合图层
- 控件组件：地图控制组件，工具栏、鹰眼、比例尺等
- 分析组件：下钻组件、位置搜索组件、行政区划查询等
- 绘制组件：绘制工具、测量工具等
- 属性组件：图层样式属性组件、数据属性组件等

规范组件生产原则：

- 统一：API 设计不能风格迥异，保证使用心智统一
- 灵活：在非共性或模糊地段，允许灵活定制
- 专业：专注于位置“可视、分析”领域，沉淀好位置可视分析组件以及衍生的可视分析组件

规范组件研发：

- 🔗 [组件研发流程规范](https://www.yuque.com/antv/l7/shlzof)
