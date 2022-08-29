import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { Form, FormItem, Input, NumberPicker, Select, Switch } from '@formily/antd';
import { createSchemaField } from '@formily/react';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { FormCollapse, FieldSelect, ColorPicker, RibbonSelect, Slider, SliderRange } from '../components';
import type { BubbleLayerStyleAttributeProps } from './types';
import schema from './schema';
import { bubbleLayerStyleConfigToFlat, bubbleLayerStyleFlatToConfig } from './helper';
import { CLS_PREFIX } from './constant';

export const BubbleLayerStyleAttributeSchemaField: React.FC<Pick<BubbleLayerStyleAttributeProps, 'fieldList'>> = (
  props,
) => {
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
        },
      }),
    [],
  );

  const _schema = useMemo(() => schema(props.fieldList), [props.fieldList]);

  return <SchemaField schema={_schema} />;
};

export const BubbleLayerStyleAttribute: React.FC<BubbleLayerStyleAttributeProps> = memo(
  function BubbleLayerStyleAttribute(props) {
    const form = useMemo(() => {
      const initialValues = bubbleLayerStyleConfigToFlat(props.initialValues);
      const _form = createForm({
        initialValues,
        effects() {
          onFormValuesChange((formIns: FormInstance<any>) => {
            props.onChange(bubbleLayerStyleFlatToConfig(formIns.values));
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
        <BubbleLayerStyleAttributeSchemaField fieldList={props.fieldList} />
      </Form>
    );
  },
);
