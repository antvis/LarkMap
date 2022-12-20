import { Form, FormItem, Input, NumberPicker, Select, Switch } from '@formily/antd';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import classNames from 'classnames';
import { debounce } from 'lodash-es';
import React, { memo, useMemo } from 'react';
import { ColorPicker, ColorType, FieldSelect, FormCollapse, RibbonSelect, Slider, SliderRange } from '../components';
import { CLS_PREFIX } from './constant';
import { lineLayerStyleConfigToFlat, lineLayerStyleFlatToConfig } from './helper';
import schema from './schema';
import type { LineLayerStyleAttributeProps } from './types';

export const LineLayerStyleAttributeSchemaField: React.FC<
  Pick<LineLayerStyleAttributeProps, 'fieldList' | 'ribbonList'>
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
          FieldSelect,
          SliderRange,
          ColorType,
        },
      }),
    [],
  );
  const _schema = useMemo(() => schema(props.fieldList, props.ribbonList), [props.fieldList, props.ribbonList]);

  return <SchemaField schema={_schema} />;
};

export const LineLayerStyleAttribute: React.FC<LineLayerStyleAttributeProps> = memo(function LineLayerStyleAttribute(
  props,
) {
  const form = useMemo(() => {
    const initialValues = lineLayerStyleConfigToFlat(props.initialValues);
    const _form = createForm({
      initialValues,
      effects() {
        onFormValuesChange(
          debounce((formIns: FormInstance<any>) => {
            props.onChange(lineLayerStyleFlatToConfig(formIns.values));
          }, 150),
        );
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
      <LineLayerStyleAttributeSchemaField fieldList={props.fieldList} />
    </Form>
  );
});
