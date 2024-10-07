import { useState } from 'react';
import { AutoComplete } from 'antd';
import type { AutoCompleteProps } from 'antd';

const AutoCompleteWithOptions = ({
  autoCompleteOptions,
  onChange, // Pass onChange from Form.Item
  value, // Receive the value from Form.Item
}: {
  autoCompleteOptions: AutoCompleteProps['options'];
  onChange: (value: string) => void;
  value?: string;
}) => {
  const [options, setOptions] =
    useState<AutoCompleteProps['options']>(autoCompleteOptions);

  const handleSelect = (data: string) => {
    const option = options?.find((o) => o.value === data);
    if (option?.label) {
      onChange(option.label as string); // Update the form's value
    }
  };

  const handleBlur = () => {
    if (value && !options?.some((o) => o.label === value)) {
      const uuid = new Date().getMilliseconds();
      setOptions([
        ...(options ?? []),
        { label: value, value: 'new-' + uuid.toString() },
      ]);
    }
  };

  return (
    <AutoComplete
      style={{ minWidth: '200px' }}
      value={value}
      options={options}
      filterOption={(inputValue, option) => {
        if (option?.label)
          return (option?.label as string).includes(inputValue);
        return false;
      }}
      onSelect={handleSelect}
      onBlur={handleBlur}
      onChange={onChange} // Pass the input value change to the form
      placeholder="Select or enter a new item"
    />
  );
};

export default AutoCompleteWithOptions;
