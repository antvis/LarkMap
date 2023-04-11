import AMapLoader from '@amap/amap-jsapi-loader';
import { GaodeMap } from '@antv/l7';
import { LarkMap } from '@antv/larkmap';
import React from 'react';

const mapInstance = AMapLoader.load({
  key: 'ff533602d57df6f8ab3b0fea226ae52f', // 申请好的 Web 端开发者Key，首次调用 load 时必填
  version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
}).then((AMap) => {
  return new GaodeMap({
    mapInstance: new AMap.Map('container', {
      zoom: 16, //初始化地图层级
      center: [116.397428, 39.90923], //初始化地图中心点
    }),
  });
});

/**
 * 或者
 */
// const mapInstance = new GaodeMap({
//   style: 'dark',
//   center: [120.210792, 30.246026],
//   zoom: 10,
//   // token: 'xxxx - token',
// });

export default () => {
  return (
    <LarkMap id="container" map={mapInstance} style={{ height: '300px' }}>
      <h2 style={{ position: 'absolute', left: '10px', color: '#fff' }}>LarkMap</h2>
    </LarkMap>
  );
};
