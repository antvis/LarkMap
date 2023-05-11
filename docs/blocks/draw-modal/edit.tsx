import { Button, Input } from 'antd';
import type { Feature, Polygon } from 'geojson';
import { cloneDeep } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { DEFAULT_POLYGON_FEATURE } from './constants';
import { DrawModal } from './DrawModal';

const Default: React.FC = () => {
  const [editPolygon, setEditPolygon] = useState<Feature<Polygon> | null>(() => {
    const feature = cloneDeep(DEFAULT_POLYGON_FEATURE);
    feature.properties.isActive = true;
    return feature;
  });
  const [visible, setVisible] = useState(false);

  const text = useMemo(() => {
    return JSON.stringify(editPolygon);
  }, [editPolygon]);

  return (
    <>
      <DrawModal
        open={visible}
        drawConfig={{
          polygon: {
            initialData: editPolygon ? [editPolygon] : [],
            maxCount: 1,
          },
        }}
        larkmapProps={{
          mapOptions: {
            style: 'normal',
            center: [120.14266, 30.251864],
            zoom: 15.29,
          },
        }}
        onOk={(drawData) => {
          const newPolygonFeature = drawData.polygon[0];
          if (newPolygonFeature) {
            newPolygonFeature.properties = {
              isActive: true,
            };
            setEditPolygon(newPolygonFeature);
            setVisible(false);
          }
        }}
        onCancel={() => {
          setVisible(false);
        }}
      />

      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        绘制元素
      </Button>

      <Input.TextArea rows={7} disabled value={text} style={{ marginTop: 16, resize: 'none' }} />
    </>
  );
};

export default Default;
