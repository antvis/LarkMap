import { Scene, LineLayer, ILayer, PointLayer } from '@antv/l7';
import { CustomControl, LarkMap, LarkMapProps } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import { linear, animate } from 'popmotion';
import { Select } from 'antd';
import 'antd/dist/antd.css';

export default () => {
  const [scene, setScene] = useState<Scene>();
  const [subwayData, setSubwayData] = useState({
    subways: '',
    lines: [],
  });
  const [lineName, setLineName] = useState('');
  const [lineLayer, setLinelayer] = useState<ILayer>();
  const [imgeLayer, setImagelayer] = useState<ILayer>();

  const icons =
    'https://gw.alipayobjects.com/zos/bmw-prod/e21321e0-8f4a-474f-a0ee-2176492bb824.svg';
  // const icons = "https://gw.alipayobjects.com/zos/bmw-prod/b2585d77-6ef3-460b-872f-fe3a7a94163b.svg"
  let timer: any = null;
  let count = 0;
  let lineData: any = [];
  let imageData = {
    lng: 120.3984375,
    lat: 30.565473550710278,
    img: 'img',
  };

  function reRender() {
    count = 0;
    clearInterval(timer);
  }

  const goWays = (ms: number, scene: Scene, findData: any[]) => {
    if (count < findData.length) {
      timer = setInterval(() => {
        if (count === findData.length) {
          reRender();
        }
        const data = findData[count];
        if (findData[count - 1]) {
          const t = animate({
            from: {
              lng: findData[count - 1].x,
              lat: findData[count - 1].y,
            },
            to: { lng: data.x, lat: data.y },
            ease: linear,
            duration: ms,
            onUpdate: (o) => {
              lineData.push([o.lng, o.lat]);
              lineLayer?.setData([{ points: lineData }]);
              imgeLayer?.setData([
                {
                  lng: o.lng,
                  lat: o.lat,
                  img: 'img',
                },
              ]);
              scene.setCenter([o.lng, o.lat]);
            },
            onComplete: () => {
              t.stop();
            },
          });
        }
        count++;
      }, ms);
    }
  };

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/81cae4de-ccd7-45e5-8800-4d742956f93a.json')
      .then((res) => res.json())
      .then((res) => setSubwayData(res));
  }, []);

  const config = {
    mapOptions: {
      style: 'dark',
      center: [120.210792, 30.246026],
      zoom: 10,
      maxZoom: 12.5,
      minZoom: 8,
    },
    mapType: 'GaodeV2',
  };

  const onSceneLoaded = (scene: Scene) => {
    setScene(scene);
    scene.addImage('img', icons);
    // 线图层
    const lineLayer = new LineLayer()
      .source(
        [
          {
            points: [
              [120.32, 23.0],
              [120.31, 20.0],
            ],
          },
        ],
        {
          parser: {
            type: 'json',
            coordinates: 'points',
          },
        },
      )
      .shape('line')
      .size(3)
      .color('#FC0601');
    scene.addLayer(lineLayer);
    setLinelayer(lineLayer);
    // 图片
    const imageLayer = new PointLayer({ layerType: 'fillImage', zIndex: 2 })
      .source([imageData], {
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat',
        },
      })
      .shape('img', (img) => img)
      .size(30);
    scene.addLayer(imageLayer);
    setImagelayer(imageLayer);
  };

  useEffect(() => {
    if (scene && lineLayer && imgeLayer && subwayData.lines.length) {
      // @ts-ignore
      goWays(1000, scene, subwayData.lines[0].station);
    }
  }, [scene, lineLayer, imgeLayer, subwayData]);

  useEffect(() => {
    // @ts-ignore
    const findLine = subwayData.lines.find((item) => item.kn === lineName);
    if (findLine && scene) {
      // @ts-ignore
      lineLayer?.color(`#${findLine.color}`);
      // @ts-ignore
      goWays(1000, scene, findLine.station);
    }
  }, [lineName, scene, lineLayer, imgeLayer, subwayData]);

  return (
    <LarkMap {...(config as LarkMapProps)} style={{ height: '50vh' }} onSceneLoaded={onSceneLoaded}>
      <h2 style={{ position: 'absolute', left: '10px' }}>{subwayData.subways}</h2>
      <CustomControl position="topcenter">
        <Select
          placeholder="请选择"
          options={subwayData.lines}
          style={{ width: 150 }}
          fieldNames={{ value: 'kn', label: 'kn' }}
          onChange={(e) => setLineName(e)}
        />
      </CustomControl>
    </LarkMap>
  );
};
