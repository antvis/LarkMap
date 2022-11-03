import { Form, FormItem, Input, NumberPicker, Select, Switch } from '@formily/antd';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import classNames from 'classnames';
import { debounce } from 'lodash-es';
import React, { memo, useMemo } from 'react';
import { ColorPicker, FieldSelect, FormCollapse, Offset, RibbonSelect, Slider, SliderRange } from '../components';
import { CLS_PREFIX } from './constant';
import { choroplethLayerStyleConfigToFlat, choroplethLayerStyleFlatToConfig } from './helper';
import schema from './schema';
import type { ChoroplethLayerStyleAttributeProps } from './types';

export const ChoroplethLayerStyleAttributeSchemaField: React.FC<
  Pick<ChoroplethLayerStyleAttributeProps, 'fieldList' | 'ribbonList'>
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
          Offset,
        },
      }),
    [],
  );
  const _schema = useMemo(() => schema(props.fieldList, props.ribbonList), [props.fieldList, props.ribbonList]);

  return <SchemaField schema={_schema} />;
};

export const ChoroplethLayerStyleAttribute: React.FC<ChoroplethLayerStyleAttributeProps> = memo(
  function ChoroplethLayerStyleAttribute(props) {
    const form = useMemo(() => {
      const initialValues = choroplethLayerStyleConfigToFlat(props.initialValues);
      const _form = createForm({
        initialValues,
        effects() {
          onFormValuesChange(
            debounce((formIns: FormInstance<any>) => {
              props.onChange(choroplethLayerStyleFlatToConfig(formIns.values));
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
        <ChoroplethLayerStyleAttributeSchemaField fieldList={props.fieldList} />
      </Form>
    );
  },
);
