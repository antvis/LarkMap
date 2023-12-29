import type { PolygonLayerProps } from '@antv/larkmap';
import { LarkMap, LayerSwitchControl, PolygonLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const polygonLayerOptions: Omit<PolygonLayerProps, 'source'> = {
  autoFit: true,
  shape: 'fill',
  color: {
    field: 'adcode',
    value: ['#0f9960', '#33a02c', '#477eb8'],
  },
  state: {
    active: true,
  },
  style: {
    opacity: 0.6,
  },
};

const lineLayerOptions: Omit<PolygonLayerProps, 'source'> = {
  shape: 'line',
  size: 2,
  color: '#595959',
  state: {
    active: false,
  },
};

export default () => {
  const [source, setSource] = useState({
    data: { type: 'FeatureCollection', features: [] },
    parser: { type: 'geojson' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/Y8eGLb9j9v/hangzhou-district.json')
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="Gaode" style={{ height: '400px' }}>
      <PolygonLayer id="fillLayer" name="填充图层" {...polygonLayerOptions} source={source} />
      <PolygonLayer id="strokeLayer" name="描边图层" {...lineLayerOptions} source={source} />
      <LayerSwitchControl layers={['fillLayer', 'strokeLayer']} multiple={false} />
    </LarkMap>
  );
};
