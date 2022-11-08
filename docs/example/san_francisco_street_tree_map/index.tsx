import { CustomControl, HeatmapLayer, LarkMap } from '@antv/larkmap';
import { Popover, Select, Slider, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import { cloneDeep, set, get } from 'lodash';
import { heatmapCfg, scaleType, shapeOpt } from './config';
import { SketchPicker } from 'react-color';
import { Scene } from '@antv/l7';

const { Paragraph } = Typography;

function StreetMap() {
  const [heatmapData, setHeatmapData] = useState('');
  const [scene, setScene] = useState<Scene>();

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/44884a0c-b82b-4352-a15d-7c8ba6e44c54.csv')
      .then((res) => res.text())
      .then((res) => setHeatmapData(res));
  }, []);

  const [heatmapCfgs, setHeatmapCfgs] = useState(heatmapCfg);

  const setConfig = useCallback(
    (field: string, value: any) => {
      set(heatmapCfgs, field, value);
      setHeatmapCfgs(cloneDeep(heatmapCfgs));
    },
    [heatmapCfgs],
  );

  const silderStyle = useMemo(() => {
    return {
      trackStyle: { backgroundColor: get(heatmapCfgs, 'color.value[0]') },
    };
  }, [heatmapCfgs]);
  console.log('heatmapCfgs', heatmapCfgs);

  return (
    <LarkMap
      mapType="GaodeV2"
      style={{ height: '50vh' }}
      mapOptions={{
        style: 'normal',
        center: [-122.4413967, 37.77596769],
        zoom: 14,
        pitch: 30,
      }}
      onSceneLoaded={(s: Scene) => setScene(s)}
    >
      {heatmapData && (
        // @ts-ignore
        <HeatmapLayer
          size={{ field: 'sum', value: (v: any) => v.sum }}
          {...heatmapCfgs}
          // shape={"circle"}
          source={{
            ...heatmapCfgs.source,
            data: heatmapData,
          }}
        />
      )}
      <CustomControl position="rightcenter">
        <div className={styles.panel}>
          <div className={styles.setItem}>
            <div>设置地图方向:</div>
            <Slider
              min={0}
              max={300}
              step={10}
              {...silderStyle}
              defaultValue={scene?.getRotation()}
              onChange={(e) => {
                scene?.setRotation(e);
              }}
            />
          </div>
          <div className={styles.setItem}>
            <div>设置地图仰角:</div>
            <Slider
              min={0}
              max={60}
              step={5}
              {...silderStyle}
              defaultValue={scene?.getPitch()}
              onChange={(e) => {
                scene?.setPitch(e);
              }}
            />
          </div>
          <div className={styles.setItem}>
            <div>设置shape:</div>
            <Select
              style={{ width: 170 }}
              defaultValue={heatmapCfgs.shape}
              onChange={(e) => {
                setConfig('shape', e);
              }}
              size="small"
              options={shapeOpt}
            />
          </div>
          <div className={styles.setItem}>
            <div>设置scale:</div>
            <Select
              style={{ width: 170 }}
              defaultValue={get(heatmapCfgs, 'color.scale.type')}
              onChange={(e) => {
                setConfig('color.scale.type', e);
              }}
              size="small"
              options={scaleType}
            />
          </div>
          <div className={styles.setItem}>
            <div>设置区间颜色:</div>
            <div className={styles.pickColor}>
              {heatmapCfgs.color.value.map((item, index) => {
                return (
                  <Popover
                    key={item}
                    content={
                      <SketchPicker
                        color={item}
                        onChangeComplete={(color: any) => {
                          setConfig(`color.value[${index}]`, color.hex);
                        }}
                      />
                    }
                  >
                    <div style={{ background: `${item}`, width: 20, height: 20 }} />
                  </Popover>
                );
              })}
            </div>
          </div>
          <div className={styles.setItem}>
            <div>设置size:</div>
            <Slider
              min={200}
              max={250}
              step={10}
              {...silderStyle}
              defaultValue={get(heatmapCfgs, 'source.transforms[0].size')}
              onChange={(e) => {
                setConfig(`source.transforms[0].size]`, e);
              }}
            />
          </div>
          <Paragraph
            style={{ color: '#fff' }}
            copyable={{
              text: JSON.stringify({
                ...heatmapCfgs,
                data: 'https://gw.alipayobjects.com/os/bmw-prod/44884a0c-b82b-4352-a15d-7c8ba6e44c54.csv',
              }),
              tooltips: false,
            }}
          >
            复制配置
          </Paragraph>
        </div>
      </CustomControl>
    </LarkMap>
  );
}

export default StreetMap;
