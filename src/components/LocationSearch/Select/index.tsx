import classNames from 'classnames';
import { omit } from 'lodash-es';
import type { BaseSelectRef, SelectProps as RcSelectProps } from 'rc-select';
import RcSelect, { OptGroup, Option } from 'rc-select';
import type { OptionProps } from 'rc-select/lib/Option';
import type { BaseOptionType, DefaultOptionType } from 'rc-select/lib/Select';
import * as React from 'react';
import './index.less';

export { OptionProps, BaseOptionType, DefaultOptionType };

export interface InternalSelectProps<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends Omit<RcSelectProps<ValueType, OptionType>, 'mode'> {
  suffixIcon?: React.ReactNode;
  disabled?: boolean;
  mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
  bordered?: boolean;
}

export interface SelectProps<ValueType = any, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>
  extends Omit<
    InternalSelectProps<ValueType, OptionType>,
    'inputIcon' | 'mode' | 'getInputElement' | 'getRawInputElement' | 'backfill' | 'placement'
  > {
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  mode?: 'multiple' | 'tags';
  /**
   * @deprecated `dropdownClassName` is deprecated which will be removed in next major
   *   version.Please use `popupClassName` instead.
   */
  dropdownClassName?: string;
  popupClassName?: string;
}

const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';

const PREFIX_CLS = 'larkmap-select';

const InternalSelect = <OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>(
  {
    prefixCls: customizePrefixCls,
    bordered = true,
    className,
    getPopupContainer,
    dropdownClassName,
    popupClassName,
    listHeight = 256,
    placement,
    listItemHeight = 24,
    disabled,
    notFoundContent,
    ...props
  }: SelectProps<OptionType>,
  ref: React.Ref<BaseSelectRef>,
) => {
  const mode = React.useMemo(() => {
    const { mode: m } = props as InternalSelectProps<OptionType>;

    if ((m as any) === 'combobox') {
      return undefined;
    }

    if (m === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox';
    }

    return m;
  }, [props]);

  const selectProps = omit(props as typeof props & { itemIcon: any }, 'suffixIcon', 'itemIcon');

  const mergedClassName = classNames(
    {
      [`${PREFIX_CLS}-borderless`]: !bordered,
    },
    className,
  );

  return (
    <RcSelect<any, any>
      ref={ref as any}
      {...selectProps}
      listHeight={listHeight}
      listItemHeight={listItemHeight}
      mode={mode as any}
      prefixCls={PREFIX_CLS}
      placement={placement}
      notFoundContent={notFoundContent ?? '当前无数据'}
      className={mergedClassName}
      getPopupContainer={getPopupContainer}
      dropdownClassName={popupClassName}
      disabled={disabled}
    />
  );
};

const Select = React.forwardRef(InternalSelect) as unknown as (<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
  props: React.PropsWithChildren<SelectProps<ValueType, OptionType>> & {
    ref?: React.Ref<BaseSelectRef>;
  },
) => React.ReactElement) & {
  SECRET_COMBOBOX_MODE_DO_NOT_USE: string;
  Option: typeof Option;
  OptGroup: typeof OptGroup;
};

Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = Option;
Select.OptGroup = OptGroup;

export default Select;
