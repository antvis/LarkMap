import { CustomControl } from '@antv/larkmap';
import React from 'react';
import { typeList } from './helper';

const Legend = () => {
  return (
    <CustomControl
      position="bottomleft"
      style={{ background: '#fff', width: '130px', padding: '10px' }}
    >
      {typeList.map((item) => {
        return (
          <div style={{ marginBottom: 5 }}>
            <div
              style={{
                background: item.color,
                marginRight: 3,
                width: 10,
                height: 10,
                display: 'inline-block',
                borderRadius: '50%',
              }}
            />
            {item.label}
          </div>
        );
      })}
    </CustomControl>
  );
};

export default Legend;
