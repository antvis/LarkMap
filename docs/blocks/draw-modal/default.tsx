import { Button, Input } from 'antd';
import type { Feature } from 'geojson';
import React, { useMemo, useState } from 'react';
import { DrawModal } from './DrawModal';

const Default: React.FC = () => {
  const [featureList, setFeatureList] = useState<Feature[]>([]);
  const [visible, setVisible] = useState(false);
  const text = useMemo(() => {
    return JSON.stringify(featureList);
  }, [featureList]);

  return (
    <>
      <DrawModal
        open={visible}
        drawConfig={{
          point: true,
          line: true,
          polygon: true,
          rect: true,
          circle: true,
        }}
        onOk={(drawData) => {
          setFeatureList(
            Object.values(drawData)
              .flat()
              .map((feature) => {
                feature.properties = {};
                return feature;
              }),
          );
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        locationSearchProps={{
          searchParams: {
            key: '4892acc9f825e343bcf1e25a56199826',
            location: '',
          },
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
