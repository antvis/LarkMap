import classNames from 'classnames';
import React, { useMemo } from 'react';
import { Form, FormCollapse, FormItem, Input, NumberPicker, Select, Switch } from '@formily/antd';
import { createSchemaField } from '@formily/react';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import Collapse from '../components/Collapse';
import FieldSelect from '../components/FieldSelect';
import ColorPicker from '../components/ColorPicker';
import RibbonSelect from '../components/RibbonSelect';
import Slider from '../components/Slider';
import SliderRange from '../components/SliderRange';
import type { ChoroplethLayerStyleAttributeProps } from './types';
import schema from './schema';
import { choroplethLayerStyleConfigToFlat, choroplethLayerStyleFlatToConfig } from './helper';
import { CLS_PREFIX } from './constant';

export const ChoroplethLayerStyleAttributeSchemaField: React.FC<
  Pick<ChoroplethLayerStyleAttributeProps, 'fieldList'>
> = (props) => {
  const SchemaField = useMemo(
    () =>
      createSchemaField({
        components: {
          FormItem,
          Input,
          Select,
          FormCollapse,
          NumberPicker,
          Switch,
          Slider,
          RibbonSelect,
          ColorPicker,
          Collapse,
          FieldSelect,
          SliderRange,
        },
      }),
    [],
  );
  const _schema = useMemo(() => schema(props.fieldList), [props.fieldList]);

  return <SchemaField schema={_schema} />;
};

export const ChoroplethLayerStyleAttribute: React.FC<ChoroplethLayerStyleAttributeProps> = (props) => {
  const form = useMemo(() => {
    const initialValues = choroplethLayerStyleConfigToFlat(props.initialValues);
    const _form = createForm({
      initialValues,
      effects() {
        onFormValuesChange((formIns: FormInstance<any>) => {
          props.onChange(choroplethLayerStyleFlatToConfig(formIns.values));
        });
      },
    });

    return _form;
  }, []);

  return (
    <Form
      className={classNames(`${CLS_PREFIX}`, props.className)}
      style={props.style}
      form={form}
      labelCol={8}
      wrapperCol={16}
      colon={false}
      layout="horizontal"
      labelAlign="left"
      wrapperAlign="right"
      feedbackLayout="terse"
    >
      <ChoroplethLayerStyleAttributeSchemaField fieldList={props.fieldList} />
    </Form>
  );
};
