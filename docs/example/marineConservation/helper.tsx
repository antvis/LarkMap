const typeList = [
  { label: '水产种质资源保护区', color: '#CD853F', value: 'Aquatic Germplasm Reserve' },
  { label: '海洋自然保护区', color: '#483D8B', value: 'Marine Nature Reserves' },
  { label: '海洋公园', color: '#B0171F', value: 'Marine Park' },
  { label: '特别海洋保护区', color: '#2E8B57', value: 'Special Marine Protected Areas' },
];

const MapConfig = {
  mapType: 'GaodeV1',
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
