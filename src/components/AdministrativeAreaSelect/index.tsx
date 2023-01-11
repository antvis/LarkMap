import { CaretDownOutlined } from '@ant-design/icons';
import { Popover, Select, Tabs } from 'antd';
import classNames from 'classnames';
import { groupBy } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { CLS_PREFIX, hotCitys } from './constant';
import './index.less';
import data from './newCity.json';
import { AdministrativeAreaSelectProps } from './types';
import { treeToArr } from './util';

export const AdministrativeAreaSelect: React.FC<AdministrativeAreaSelectProps> = ({
  cityClick,
  onSelectChange,
  style,
  className: cls,
  popoverClassName,
}) => {
  const [cityName, setCityName] = useState('全国');
  const [open, setOpen] = useState(false);

  const selectOptions = treeToArr([data]).map((item) => {
    return {
      value: JSON.stringify(item),
      label: `${item.name}(${item.spell})`,
    };
  });

  const onChange = (value) => {
    setOpen(false);
    onSelectChange(JSON.parse(value));
    setCityName(JSON.parse(value).name);
  };

  const cityData = useMemo(() => {
    return groupBy(treeToArr([data]), 'sequence');
  }, [data]);

  const provinceData = useMemo(() => {
    return groupBy(data.children, 'sequence');
  }, []);

  const onClick = (v: any) => {
    setOpen(false);
    setCityName(v.name);
    cityClick(v);
  };

  const provinceContent = (
    <>
      <div className={`${CLS_PREFIX}__location`}>
        {Object.keys(provinceData)
          .sort()
          .map((item) => {
            return (
              <a className={`${CLS_PREFIX}__location-item`} href={`#province${item}`}>
                {item}
              </a>
            );
          })}
      </div>
      <div className={`${CLS_PREFIX}__province`}>
        {Object.keys(provinceData)
          .sort()
          .map((item) => {
            return provinceData[item].map((v, index) => {
              return (
                <div id={index === 0 ? `province${item}` : 'province'} className={`${CLS_PREFIX}__province-content`}>
                  {v.children.length ? (
                    <div onClick={() => onClick(v)} className={`${CLS_PREFIX}__province-content-label`}>
                      {v.name}:
                    </div>
                  ) : (
                    <div className={`${CLS_PREFIX}__province-content-name`}>
                      <div onClick={() => onClick(v)}>{v.name}</div>
                    </div>
                  )}
                  {v.children.length ? (
                    <div className={`${CLS_PREFIX}__province-content-value`}>
                      {v.children.map((s) => {
                        return (
                          <div onClick={() => onClick(s)} className={`${CLS_PREFIX}__province-content-value-item`}>
                            {s.name}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            });
          })}
      </div>
    </>
  );

  const cityContent = (
    <>
      <div className={`${CLS_PREFIX}__location`}>
        {Object.keys(cityData)
          .sort()
          .map((item) => {
            return (
              <a className={`${CLS_PREFIX}__location-item`} href={`#city${item}`}>
                {item}
              </a>
            );
          })}
      </div>
      <div className={`${CLS_PREFIX}__city`}>
        {Object.keys(cityData)
          .sort()
          .map((item) => {
            return (
              <div className={`${CLS_PREFIX}__city-content`}>
                <div id={`city${item}`} className={`${CLS_PREFIX}__city-content-label`}>
                  {item}:
                </div>
                <div className={`${CLS_PREFIX}__city-content-value`}>
                  {cityData[item].map((v) => {
                    return (
                      <div onClick={() => onClick(v)} className={`${CLS_PREFIX}__city-content-value-item`}>
                        {v.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );

  const content = (
    <div className={`${CLS_PREFIX}__content`}>
      <div className={`${CLS_PREFIX}__content-header`}>
        {hotCitys.map((v) => {
          return (
            <div onClick={() => onClick(v)} className={`${CLS_PREFIX}__content-header-item`}>
              {v.name}
            </div>
          );
        })}
      </div>
      <div>
        <Tabs
          defaultActiveKey="province"
          type="card"
          tabBarExtraContent={
            <Select
              showSearch
              placeholder="请输入城市"
              optionFilterProp="children"
              onChange={onChange}
              style={{ width: 200 }}
              filterOption={(input, option) => (option?.label).toLowerCase().includes(input.toLowerCase())}
              options={selectOptions}
            />
          }
          items={[
            {
              label: `按省份`,
              key: 'province',
              children: provinceContent,
            },
            {
              label: `按城市`,
              key: 'city',
              children: cityContent,
            },
          ]}
        />
      </div>
    </div>
  );
  return (
    <Popover
      overlayClassName={classNames(`${CLS_PREFIX}__popover`, popoverClassName)}
      placement="bottomLeft"
      title={<div>当前城市：{cityName}</div>}
      content={content}
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
      trigger="click"
      destroyTooltipOnHide
    >
      <div className={classNames(`${CLS_PREFIX}`, cls)} style={style}>
        <div className={`${CLS_PREFIX}__title`}>
          <div className={`${CLS_PREFIX}__title-name`}>{cityName}</div>
          <CaretDownOutlined />
        </div>
      </div>
    </Popover>
  );
};
