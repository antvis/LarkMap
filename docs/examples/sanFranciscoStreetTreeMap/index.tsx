import type { Scene } from '@antv/l7';
import { CustomControl, HeatmapLayer, LarkMap } from '@antv/larkmap';
import { Popover, Select, Slider, Typography } from 'antd';
import { cloneDeep, get, set } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SketchPicker } from 'react-color';
import { heatmapCfg, mapCfg, scaleType, shapeOpt } from './config';
import styles from './index.less';

const { Paragraph } = Typography;

function StreetMap() {
  const [heatmapData, setHeatmapData] = useState('');
  const [scene, setScene] = useState<Scene>();

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/44884a0c-b82b-4352-a15d-7c8ba6e44c54.csv')
      .then((res) => res.text())
      .then((res) => setHeatmapData(res));
  }, []);

  const [heatmapConfig, setHeatmapConfig] = useState(heatmapCfg);

  const setConfig = useCallback(
    (field: string, value: any) => {
      set(heatmapConfig, field, value);
      setHeatmapConfig(cloneDeep(heatmapConfig));
    },
    [heatmapConfig],
  );

  const sliderStyle = useMemo(() => {
    return {
      trackStyle: { backgroundColor: get(heatmapConfig, 'color.value[0]') },
    };
  }, [heatmapConfig]);

  return (
    <LarkMap {...mapCfg} style={{ height: '60vh' }} onSceneLoaded={(newScene: Scene) => setScene(newScene)}>
      {heatmapData && (
        // @ts-ignore
        <HeatmapLayer
          size={{ field: 'sum', value: (v: any) => v.sum }}
          {...heatmapConfig}
          // shape={"circle"}
          source={{
            ...heatmapConfig.source,
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
              {...sliderStyle}
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
              {...sliderStyle}
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
              defaultValue={heatmapConfig.shape}
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
              defaultValue={get(heatmapConfig, 'color.scale.type')}
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
              {/* @ts-ignore */}
              {heatmapConfig.color.value.map((item, index) => {
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
              {...sliderStyle}
              defaultValue={get(heatmapConfig, 'source.transforms[0].size')}
              onChange={(e) => {
                setConfig(`source.transforms[0].size]`, e);
              }}
            />
          </div>
          <Paragraph
            style={{ color: '#fff' }}
            copyable={{
              text: JSON.stringify({
                ...heatmapConfig,
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
