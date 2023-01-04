import { Form, FormItem, Input, NumberPicker, Select, Switch } from '@formily/antd';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import classNames from 'classnames';
import { debounce } from 'lodash-es';
import React, { memo, useMemo } from 'react';
import {
  ColorPicker,
  ColorRangeSelector,
  FieldSelect,
  FormCollapse,
  Offset,
  ScaleSelector,
  Slider,
  SliderRange,
} from '../components';
import { CLS_PREFIX } from './constant';
import { bubbleLayerStyleConfigToFlat, bubbleLayerStyleFlatToConfig } from './helper';
import schema from './schema';
import type { BubbleLayerStyleAttributeProps } from './types';

export const BubbleLayerStyleAttributeSchemaField: React.FC<
  Pick<BubbleLayerStyleAttributeProps, 'fieldList' | 'ribbonList'>
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
          ColorRangeSelector,
          ColorPicker,
          FieldSelect,
          SliderRange,
          Offset,
          ScaleSelector,
        },
      }),
    [],
  );

  const _schema = useMemo(() => schema(props.fieldList, props.ribbonList), [props.fieldList, props.ribbonList]);

  return <SchemaField schema={_schema} />;
};

export const BubbleLayerStyleAttribute: React.FC<BubbleLayerStyleAttributeProps> = memo(
  function BubbleLayerStyleAttribute(props) {
    const form = useMemo(() => {
      const initialValues = bubbleLayerStyleConfigToFlat(props.initialValues);
      const _form = createForm({
        initialValues,
        effects() {
          onFormValuesChange(
            debounce((formIns: FormInstance<any>) => {
              props.onChange(bubbleLayerStyleFlatToConfig(formIns.values));
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
        <BubbleLayerStyleAttributeSchemaField fieldList={props.fieldList} />
      </Form>
    );
  },
);
