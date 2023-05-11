import { Button, Modal } from 'antd';
import classnames from 'classnames';
import { cloneDeep } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { CustomControl } from '../../../../src/components/Control';
import { LarkMap } from '../../../../src/components/LarkMap';
import { useScene } from '../../../../src/components/LarkMap/hooks';
import { LocationSearch } from '../../../../src/components/LocationSearch';
import type { DrawType } from '../../../../src/components/Draw/types';
import { useDrawGroup } from '../../../../src/components/Draw/use-draw-group';
import type { DrawGroupData } from '../../../../src/components/Draw/use-draw-group/types';
import { CLS_PREFIX, DEFAULT_DRAW_DATA, DRAW_ICON_TYPE_MAP, DRAW_TEXT_TYPE_MAP } from './constants';
import './index.less';
import type { DrawModalProps } from './types';

const DrawModalContent: React.FC<
  Pick<DrawModalProps, 'drawConfig' | 'locationSearchProps'> & {
    setDrawData: (drawData: DrawGroupData) => void;
  }
> = React.memo(({ drawConfig, locationSearchProps, setDrawData }) => {
  const scene = useScene();

  const { activeDrawInfo, setActiveDraw, drawGroupData } = useDrawGroup(drawConfig);

  const activeDrawType: DrawType | undefined = activeDrawInfo?.drawType;

  useEffect(() => {
    setDrawData(drawGroupData);
  }, [drawGroupData, setDrawData]);

  return (
    <>
      <CustomControl className={`${CLS_PREFIX}__btn-group`}>
        {Object.entries(drawConfig).map(([drawType, drawOptions]: [DrawType, any]) => {
          return !!drawOptions ? (
            <Button
              key={drawType}
              type={activeDrawType === drawType ? 'primary' : undefined}
              icon={
                <svg className="anticon" aria-hidden="true">
                  <use xlinkHref={`#${DRAW_ICON_TYPE_MAP[drawType]}`} />
                </svg>
              }
              onClick={() => {
                setActiveDraw(activeDrawType !== drawType ? drawType : undefined);
              }}
            >
              {DRAW_TEXT_TYPE_MAP[drawType]}
            </Button>
          ) : null;
        })}
      </CustomControl>
      {!!locationSearchProps && (
        <CustomControl position="topright">
          <LocationSearch
            {...locationSearchProps}
            onChange={(name, option) => {
              if (option) {
                const { longitude, latitude } = option;
                const currentZoom = scene.getZoom();
                scene.setZoomAndCenter(currentZoom < 14 ? 14 : currentZoom, [longitude, latitude]);
              }
            }}
          />
        </CustomControl>
      )}
    </>
  );
});

export const DrawModal: React.FC<DrawModalProps> = ({
  className,
  larkmapProps,
  drawConfig,
  locationSearchProps,
  onOk,
  ...modalProps
}) => {
  const [drawData, setDrawData] = useState<DrawGroupData>(() => {
    return cloneDeep(DEFAULT_DRAW_DATA);
  });

  const { open, visible } = modalProps;

  useEffect(() => {
    if (open || visible) {
      setDrawData(cloneDeep(DEFAULT_DRAW_DATA));
    }
  }, [open, visible]);

  return (
    <Modal
      bodyStyle={{ padding: 0 }}
      className={classnames([CLS_PREFIX, className])}
      onOk={() => {
        onOk?.(drawData);
      }}
      {...modalProps}
    >
      <LarkMap style={{ height: 400 }} {...larkmapProps}>
        <DrawModalContent drawConfig={drawConfig} locationSearchProps={locationSearchProps} setDrawData={setDrawData} />
      </LarkMap>
    </Modal>
  );
};

DrawModal.defaultProps = {
  drawConfig: {
    point: true,
    line: true,
    polygon: true,
  },
  width: 700,
  title: '绘制弹框',
  cancelText: '取消',
  okText: '提交',
  locationSearchProps: false,
  destroyOnClose: true,
};
