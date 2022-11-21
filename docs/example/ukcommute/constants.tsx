import type { LarkMapProps, LineLayerProps } from '@antv/larkmap';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'dark',
    center: [-0.9, 52.5],
    zoom: 6,
    pitch: 40,
  },
};

const layerConfig: Omit<LineLayerProps, 'source'> = {
  // autoFit: true,
  shape: 'arc3d',
  size: 1,
  blend: 'max',
  state: {
    active: false,
  },
  style: {
    opacity: 0.8,
    lineType: 'solid',
    sourceColor: '#f00',
    targetColor: '#f9f400',
  },
};

export { config, layerConfig };
