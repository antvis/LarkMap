import { CustomControl } from '@antv/larkmap';
import { message } from 'antd';
import React from 'react';
import './index.less';

type LegendItem = { color: string; label: string; value: [number, number] };

interface IProps {
  setSelectLabel: (label: undefined | LegendItem) => void;
}

// @ts-ignore
const data: LegendItem[] = [
  { color: 'rgba(239, 243, 255, .8)', value: [0, 80] },
  { color: 'rgba(198, 219, 239, .8)', value: [80, 176] },
  { color: 'rgba(158, 202, 225, .8)', value: [176, 250] },
  { color: 'rgba(107, 174, 214, .8)', value: [250, 331] },
  { color: 'rgba(49, 130, 189, .8)', value: [331, 531] },
  { color: 'rgba(8, 81, 156, .8)', value: [531, 2238] },
].map((item) => {
  const [min, max] = item.value;
  return {
    ...item,
    label: `${min} 到 ${max}`,
  };
});

const HousePrice = ({ setSelectLabel }: IProps) => {
  return (
    <CustomControl style={{ background: '#fff', width: '130px', padding: '10px' }}>
      <div
        style={{
          padding: 8,
          background: 'rgb(255,255,255)',
          borderRadius: '8px',
        }}
      >
        房子数量
        {data.map((item) => {
          return (
            <div
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSelectLabel(item);
                message.info({ content: '按ESC可退出选择' });
              }}
            >
              <div className="circle" style={{ background: item.color }} />
              {item.label}
            </div>
          );
        })}
      </div>
    </CustomControl>
  );
};
export default HousePrice;
