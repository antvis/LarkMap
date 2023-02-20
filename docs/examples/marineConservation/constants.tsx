import type { LarkMapProps, PointLayerProps } from '@antv/larkmap';

const legendItems = [
  {
    label: '水产种质资源保护区',
    color: '#4092ff',
    value: 'Aquatic Germplasm Reserve',
  },
  {
    label: '海洋自然保护区',
    color: '#ff3e3e',
    value: 'Marine Nature Reserves',
  },
  { label: '海洋公园', color: '#ffd94b', value: 'Marine Park' },
  {
    label: '特别海洋保护区',
    color: '#f137ff',
    value: 'Special Marine Protected Areas',
  },
];

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'dark',
    center: [110.481623, 38.068625],
    zoom: 3.05,
  },
};

const layerConfig: Omit<PointLayerProps, 'source'> = {
  autoFit: false,
  shape: 'circle',
  blend: 'normal',
  color: {
    field: 'Type',
    // @ts-ignore
    value: ({ Type }) => {
      const typeItem = legendItems.find((item) => {
        return item.value === Type;
      });
      return typeItem?.color ?? '#808A87';
    },
  },
  size: {
    field: 'Area',
    // @ts-ignore
    value: ({ Area }) => {
      return 4 + Number(Area) / 1000;
    },
  },
  highlightColor: '#f00',
  state: {
    active: true,
  },
  style: {
    opacity: 1,
    stroke: '#fff',
    strokeWidth: 0.2,
  },
};

export { legendItems, config, layerConfig };
