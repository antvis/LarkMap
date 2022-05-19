import React from 'react';
import classNames from 'classnames';
import { CLS_PREFIX } from './constant';
import type { TemplateProps } from './types';
import './index.less';

export type { TemplateProps };

export const Template: React.FC<TemplateProps> = ({ title, className, style }) => {
  return (
    <h1 className={classNames(`${CLS_PREFIX}_decoration`, className)} style={style}>
      {title}
    </h1>
  );
};

export default Template;
