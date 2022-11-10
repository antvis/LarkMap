import classNames from 'classnames';
import React from 'react';
import { CLS_PREFIX } from './constant';
import './index.less';
import type { TemplateProps } from './types';

export const Template: React.FC<TemplateProps> = ({ title, className, style }) => {
  return (
    <h1 className={classNames(`${CLS_PREFIX}_decoration`, className)} style={style}>
      {title}
    </h1>
  );
};
