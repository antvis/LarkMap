import type { CollapsePanelProps, CollapseProps } from 'antd';
import { Badge, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import type { Schema, SchemaKey } from '@formily/json-schema';
import { observer, RecursionField, useField, useFieldSchema } from '@formily/react';
import { markRaw, model } from '@formily/reactive';
import { toArr } from '@formily/shared';
import cls from 'classnames';
import React, { Fragment, useMemo } from 'react';
import './index.less';
import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';

type ActiveKeys = string | number | (string | number)[];

type ActiveKey = string | number;
export interface IFormCollapse {
  activeKeys: ActiveKeys;
  hasActiveKey: (key: ActiveKey) => boolean;
  setActiveKeys: (key: ActiveKeys) => void;
  addActiveKey: (key: ActiveKey) => void;
  removeActiveKey: (key: ActiveKey) => void;
  toggleActiveKey: (key: ActiveKey) => void;
}

export interface IFormCollapseProps extends CollapseProps {
  formCollapse?: IFormCollapse;
}

type ComposedFormCollapse = React.FC<React.PropsWithChildren<IFormCollapseProps>> & {
  CollapsePanel?: React.FC<React.PropsWithChildren<CollapsePanelProps>>;
  createFormCollapse?: (defaultActiveKeys?: ActiveKeys) => IFormCollapse;
};

const usePanels = () => {
  const collapseField = useField();
  const schema = useFieldSchema();
  const panels: { name: SchemaKey; props: any; schema: Schema }[] = [];
  // eslint-disable-next-line @typescript-eslint/no-shadow
  schema.mapProperties((schema, name) => {
    const field = collapseField.query(collapseField.address.concat(name)).take();
    if (field?.display === 'none' || field?.display === 'hidden') return;
    if (schema['x-component']?.indexOf('CollapsePanel') > -1) {
      panels.push({
        name,
        props: {
          ...schema?.['x-component-props'],
          key: schema?.['x-component-props']?.key || name,
        },
        schema,
      });
    }
  });
  return panels;
};

const createFormCollapse = (defaultActiveKeys?: ActiveKeys) => {
  const formCollapse = model({
    activeKeys: defaultActiveKeys,
    setActiveKeys(keys: ActiveKeys) {
      formCollapse.activeKeys = keys;
    },
    hasActiveKey(key: ActiveKey) {
      if (Array.isArray(formCollapse.activeKeys)) {
        if (formCollapse.activeKeys.includes(key)) {
          return true;
        }
      } else if (formCollapse.activeKeys === key) {
        return true;
      }
      return false;
    },
    addActiveKey(key: ActiveKey) {
      if (formCollapse.hasActiveKey(key)) return;
      formCollapse.activeKeys = toArr(formCollapse.activeKeys).concat(key);
    },
    removeActiveKey(key: ActiveKey) {
      if (Array.isArray(formCollapse.activeKeys)) {
        formCollapse.activeKeys = formCollapse.activeKeys.filter((item) => item !== key);
      } else {
        formCollapse.activeKeys = '';
      }
    },
    toggleActiveKey(key: ActiveKey) {
      if (formCollapse.hasActiveKey(key)) {
        formCollapse.removeActiveKey(key);
      } else {
        formCollapse.addActiveKey(key);
      }
    },
  });
  return markRaw(formCollapse);
};

export const FormCollapse: ComposedFormCollapse = observer(({ formCollapse, ...props }) => {
  const field = useField();
  const panels = usePanels();
  const prefixCls = usePrefixCls('custom-formily-collapse', props);
  const _formCollapse = useMemo(() => {
    return formCollapse ? formCollapse : createFormCollapse(props.defaultActiveKey);
  }, []);

  const takeActiveKeys = () => {
    if (props.activeKey) return props.activeKey;
    if (_formCollapse?.activeKeys) return _formCollapse?.activeKeys;
    if (props.accordion) return panels[0]?.name;
    return panels.map((item) => item.name);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const badgedHeader = (key: SchemaKey, props: any) => {
    const errors = field.form.queryFeedbacks({
      type: 'error',
      address: `${field.address.concat(key)}.*`,
    });
    if (errors.length) {
      return (
        <Badge size="small" className="errors-badge" count={errors.length}>
          {props.header}
        </Badge>
      );
    }
    return props.header;
  };
  return (
    <Collapse
      {...props}
      className={cls(prefixCls, props.className)}
      activeKey={takeActiveKeys()}
      onChange={(key) => {
        props?.onChange?.(key);
        _formCollapse?.setActiveKeys?.(key);
      }}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
      {panels.map(({ props, schema, name }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Collapse.Panel key={index} {...props} header={badgedHeader(name, props)} forceRender>
          <RecursionField schema={schema} name={name} />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
});

const CollapsePanel: React.FC<React.PropsWithChildren<CollapsePanelProps>> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

FormCollapse.CollapsePanel = CollapsePanel;
// @ts-ignore
FormCollapse.createFormCollapse = createFormCollapse;

export default FormCollapse;
