---
toc: false
order: 2
group:
  title: 同步地图
  order: 2
nav:
  title: 区块
  path: /blocks
  order: 3
---

# 同步地图

## 介绍

用于同步地图状态「缩放层级、地图中心点、旋转角、倾斜角」。

支持 Gaode 和 Mapbox 两种地图引擎类型

### 使用场景

适用于同步多个场景的地图状态，适用于两幅或多幅地图的联动。有两种使用方式，一种为 React 组件，一种为工具方法。

## 代码演示

### 示例一：React 组件使用

<code src="./demos/default.tsx"></code>

### 示例二： 设置 zoomGap

<code src="./demos/zoomGap.tsx"></code>

### 示例三：多地图场景同步

<code src="./demos/multiScenes.tsx"></code>

### 示例四：函数使用

<code src="./demos/defaultUtils.tsx"></code>

## API

### React 组件

`interface SyncSceneProps {scenes: Scene[], options: { zoomGap: number, mainIndex: number }}`

### 函数方式

`syncScene(scenes: Scene[], options: { zoomGap: number, mainIndex: number })`

#### scenes

LarkMap 加载完成的 Scene 实例数组

#### options

| 参数        | 说明                                                                       | 类型     | 默认值 |
| ----------- | -------------------------------------------------------------------------- | -------- | ------ |
| `zoomGap`   | 用于设置同步场景的地图层级差                                               | `number` | 0      |
| `mainIndex` | 搭配 `zoomGap` 使用，用于设置主场景，其余场景为主场景的 `zoom` + `zoomGap` | `number` | 0      |
