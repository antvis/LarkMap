import { DrawModal } from '@antv/larkmap';
import { Button, Input } from 'antd';
import 'antd/dist/antd.less';
import React, { useState } from 'react';

const { TextArea } = Input;

export default () => {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        绘制
      </Button>

      <TextArea value={text} rows={10} placeholder="请点击上方绘制按钮进行绘制" disabled style={{ marginTop: 16 }} />

      <DrawModal
        visible={visible}
        drawControl={{
          defaultActiveType: 'point',
        }}
        onSubmit={(data) => {
          setText(JSON.stringify(data, null, 2));
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};
