import type { BaseMode } from '@antv/l7-draw';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { LarkMap } from '../../LarkMap';
import { DrawControl } from '../DrawControl';
import type { DrawData } from '../DrawControl/types';
import { DrawKeyboardHelper } from '../DrawKeyboardHelper';
import type { DrawModalProps } from './types';

export const DrawModal: React.FC<DrawModalProps> = ({
  onSubmit,
  larkMap,
  drawControl,
  drawKeyboardHelper,
  ...modalProps
}) => {
  const [currentDraw, setCurrentDraw] = useState<BaseMode | null>(null);
  const [drawData, setDrawData] = useState<DrawData>({});

  return (
    <Modal {...modalProps} onOk={() => onSubmit?.(drawData)}>
      <LarkMap {...larkMap}>
        <DrawControl
          {...drawControl}
          data={drawData}
          onChange={setDrawData}
          onDrawChange={(draw) => {
            drawControl?.onDrawChange?.(draw);
            setCurrentDraw(draw);
          }}
        />
        {!!drawKeyboardHelper && (
          <DrawKeyboardHelper
            draw={currentDraw}
            {...(drawKeyboardHelper instanceof Object ? drawKeyboardHelper : {})}
          />
        )}
      </LarkMap>
    </Modal>
  );
};

DrawModal.defaultProps = {
  width: 900,
  title: '地理绘制',
  okText: '确认',
  cancelText: '取消',
  maskClosable: false,
  bodyStyle: {
    padding: 0,
  },
  larkMap: {
    mapType: 'GaodeV1',
    style: {
      height: 400,
    },
  },
  drawControl: {},
  drawKeyboardHelper: {},
};
