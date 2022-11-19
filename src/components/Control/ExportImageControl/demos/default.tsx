import type { PolygonLayerProps } from '@antv/larkmap';
import { ExportImageControl, LarkMap, PolygonLayer } from '@antv/larkmap';
import { Image, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

export default () => {
  const [imageData, setInmageData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [source, setSource] = useState({
    data: { type: 'FeatureCollection', features: [] },
  });

  const layerOptions: Omit<PolygonLayerProps, 'source'> = {
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

  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/antfincdn/Y8eGLb9j9v/hangzhou-district.json',
    )
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  const config = {
    mapType: 'Gaode' as const,
    mapOptions: {
      WebGLParams: {
        preserveDrawingBuffer: true,
      },
    },
  };

  const onExport = (value: string) => {
    setIsModalOpen(true);
    setInmageData(value);
  };

  const handle = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <LarkMap {...config} style={{ height: '400px' }}>
        <PolygonLayer {...layerOptions} source={source} />
        <ExportImageControl onExport={onExport} />
      </LarkMap>
      <Modal
        title="Image Modal"
        visible={isModalOpen}
        onOk={handle}
        onCancel={handle}
      >
        <Image src={imageData} />
      </Modal>
    </>
  );
};
