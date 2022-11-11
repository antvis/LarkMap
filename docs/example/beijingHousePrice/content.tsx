import { CustomControl } from '@antv/larkmap';
import { message } from 'antd';
import React from 'react';
import './index.less';

interface Props {
  setSelectLabel: (label: undefined | { value: string; label: string }) => void;
}

message.config({
  top: 100,
  duration: 2,
  maxCount: 1,
});

const HousePrice = ({ setSelectLabel }: Props) => {
  const data = [
    { value: 'rgba(239, 243, 255, .8)', label: '0 到 80' },
    { value: 'rgba(198, 219, 239, .8)', label: '80 到 176 ' },
    { value: 'rgba(158, 202, 225, .8)', label: '176 到 250 ' },
    { value: 'rgba(107, 174, 214, .8)', label: '250 到 331 ' },
    { value: 'rgba(49, 130, 189, .8)', label: '331 到 531 ' },
    { value: 'rgba(8, 81, 156, .8)', label: '531 到 2238 ' },
  ];

  return (
    <CustomControl position="bottomleft" style={{ background: '#fff', width: '130px', padding: '10px' }}>
      <div style={{ padding: 8, background: 'rgb(255,255,255)', borderRadius: '8px' }}>
        房子数量
        {data.map((item) => {
          return (
            <div
              key={item.label}
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => {
                setSelectLabel(item);
                message.info({ content: '按ESC可退出选择' });
              }}
            >
              <div className="circle" style={{ background: item.value }} />
              {item.label}
            </div>
          );
        })}
      </div>
    </CustomControl>
  );
};
export default HousePrice;
