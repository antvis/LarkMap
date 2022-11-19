import type { RasterLayerProps } from '@antv/larkmap';
import { LarkMap, RasterLayer } from '@antv/larkmap';
import * as GeoTIFF from 'geotiff';
import React, { useEffect, useState } from 'react';

const layerOptions: Omit<RasterLayerProps, 'source'> = {
  autoFit: true,
  style: {
    opacity: 0.8,
    domain: [0, 2000],
    rampColors: {
      colors: [
        '#FF4818',
        '#F7B74A',
        '#FFF598',
        '#91EABC',
        '#2EA9A1',
        '#206C7C',
      ].reverse(),
      positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    },
  },
};

async function getTiffData() {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/rmsportal/XKgkjjGaAzRyKupCBiYW.dat',
  );
  const arrayBuffer = await response.arrayBuffer();
  const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
  const image = await tiff.getImage();
  const width = image.getWidth();
  const height = image.getHeight();
  const values = await image.readRasters();
  return {
    data: values[0],
    width,
    height,
    min: 0,
    max: 8000,
  };
}

export default () => {
  const [options, setOptions] = useState(layerOptions);
  const [source, setSource] = useState({
    data: [0],
    parser: {
      type: 'raster',
      width: 1,
      height: 1,
      min: 0,
      max: 80,
      extent: [73.482190241, 3.82501784112, 135.106618732, 57.6300459963],
    },
  });

  useEffect(() => {
    getTiffData().then((tiffData) => {
      setSource((prevState) => ({
        ...prevState,
        data: tiffData.data,
        parser: {
          type: 'raster',
          width: tiffData.width,
          height: tiffData.height,
          min: 0,
          max: 80,
          extent: [73.482190241, 3.82501784112, 135.106618732, 57.6300459963],
        },
      }));
    });
  }, []);

  return (
    <LarkMap mapType="Gaode" style={{ height: '300px' }}>
      <RasterLayer {...options} source={source} />
    </LarkMap>
  );
};
