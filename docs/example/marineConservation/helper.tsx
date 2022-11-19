const typeList = [
  { label: '水产种质资源保护区', color: '#9AC5FF', value: 'Aquatic Germplasm Reserve' },
  { label: '海洋自然保护区', color: '#5B8FF9', value: 'Marine Nature Reserves' },
  { label: '海洋公园', color: '#085EC0', value: 'Marine Park' },
  { label: '特别海洋保护区', color: '#00318A', value: 'Special Marine Protected Areas' },
];

const MapConfig = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'normal',
    center: [110.481623, 38.068625],
    zoom: 3.05,
  },
};

const LayerConfig = {
  autoFit: false,
  shape: 'circle',
  blend: 'normal',
  color: {
    field: 'Type',
    // @ts-ignore
    value: ({ Type }) => {
      const typeItem = typeList.find((item) => {
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

export { typeList, MapConfig, LayerConfig };
