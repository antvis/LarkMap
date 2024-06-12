import type { DrawGroupData, DrawType } from '@antv/larkmap';
import { CustomControl, LarkMap, LocationSearch, useDrawGroup, useScene } from '@antv/larkmap';
import { Button, Modal } from 'antd';
import classnames from 'classnames';
import { cloneDeep } from 'lodash-es';
import React, { useEffect, useState } from 'react';
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

const defaultModalProps = {
  width: 700,
  title: '绘制弹框',
  cancelText: '取消',
  okText: '提交',
  destroyOnClose: true,
}

export const DrawModal: React.FC<DrawModalProps> = ({
  className,
  larkmapProps,
  drawConfig = {
    point: true,
    line: true,
    polygon: true,
  },
  locationSearchProps = false,
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
      {...defaultModalProps}
      {...modalProps}
    >
      <LarkMap style={{ height: 400 }} {...larkmapProps}>
        <DrawModalContent drawConfig={drawConfig} locationSearchProps={locationSearchProps} setDrawData={setDrawData} />
      </LarkMap>
    </Modal>
  );
};
