import classNames from 'classnames';
import React, { useMemo, memo } from 'react';
import { Form, FormItem, Input, NumberPicker, Select, Switch } from '@formily/antd';
import { createSchemaField } from '@formily/react';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { FormCollapse, FieldSelect, ColorPicker, RibbonSelect, Slider, SliderRange } from '../components';
import type { HeatmapLayerStyleAttributeProps } from './types';
import schema from './schema';
import { heatmapLayerStyleConfigToFlat, heatmapLayerStyleFlatToConfig } from './helper';
import { CLS_PREFIX } from './constant';

export const HeatmapLayerStyleAttributeSchemaField: React.FC<Pick<HeatmapLayerStyleAttributeProps, 'fieldList'>> = (
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

export const HeatmapLayerStyleAttribute: React.FC<HeatmapLayerStyleAttributeProps> = memo(
  function HeatmapLayerStyleAttribute(props) {
    const form = useMemo(() => {
      const initialValues = heatmapLayerStyleConfigToFlat(props.initialValues);
      const _form = createForm({
        initialValues,
        effects() {
          onFormValuesChange((formIns: FormInstance<any>) => {
            props.onChange(heatmapLayerStyleFlatToConfig(formIns.values));
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
        <HeatmapLayerStyleAttributeSchemaField fieldList={props.fieldList} />
      </Form>
    );
  },
);
