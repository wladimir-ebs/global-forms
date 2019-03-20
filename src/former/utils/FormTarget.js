import React from 'react';
import { Form, Input, Checkbox, InputNumber, Radio, Select } from 'antd';
import './FormTarget.css';

const FormTarget = ({ type, ...props }) => {
  if (type === 'input') {
    return (
      <Input
        placeholder={props.placeholder || props.label}
        value={props.value}
        onChange={({ target }) => props.onChange(target.value)}
      />
    );
  } else if (type === 'checkbox') {
    return (
      <Checkbox.Group value={props.value} onChange={value => props.onChange(value)}>
        {props.nomenclature.map(({ id, title }) => (
          <Checkbox value={id} key={id}>
            {title}
          </Checkbox>
        ))}
      </Checkbox.Group>
    );
  } else if (type === 'radio') {
    return (
      <Radio.Group value={props.value} onChange={({ target }) => props.onChange(target.value)}>
        {props.nomenclature.map(({ id, title }) => (
          <Radio
            value={id}
            key={id}
            style={props.nomenclature.length > 2 ? { display: 'block', marginBottom: 5 } : null}
          >
            {title}
          </Radio>
        ))}
      </Radio.Group>
    );
  } else if (type === 'select') {
    return (
      <Select
        allowClear
        mode={props.mode || 'default'}
        dropdownMatchSelectWidth={false}
        placeholder={props.placeholder || props.label}
        value={props.value}
        onChange={value => props.onChange(value)}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {props.nomenclature.map(({ id, title }) => (
          <Select.Option
            value={id}
            key={id}
            style={props.nomenclature.length > 2 ? { display: 'block', marginBottom: 5 } : null}
          >
            {title}
          </Select.Option>
        ))}
      </Select>
    );
  } else if (type === 'input-number') {
    const { min, max } = props;

    return (
      <InputNumber
        {...(min ? { min } : {})}
        {...(max ? { max } : {})}
        placeholder={props.placeholder || props.label}
        value={props.value}
        onChange={value => props.onChange(value)}
      />
    );
  }

  return null;
};

export default ({ error, ...props }) => (
  <Form.Item
    label={props.label}
    {...(error
      ? {
          validateStatus: 'error',
          help: error,
        }
      : null)}
  >
    <FormTarget {...props} />
  </Form.Item>
);
