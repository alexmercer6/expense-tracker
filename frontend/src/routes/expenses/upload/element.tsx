import React, { useState } from 'react';
import {
  Upload,
  Button,
  Form,
  Input,
  Checkbox,
  Space,
  DatePicker,
  InputNumber,
  Select,
  Spin,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import dayjs from 'dayjs';
import { ExpenseItem } from '../../../types/type';
import { useAddExpenseItems } from '../../../api/hooks/useAddNewExpenseItems';
import AutoCompleteWithOptions from '../../../components/AutoCompleteWithOptions';
import { UniqueItem, UniqueCategory } from '../../../api/types/dto';
import { useGetAllExpenseItemsQuery } from '../../../api/hooks/useGetAllExpenseItemsQuery';

const { Option } = Select;

const UploadRoute: React.FC = () => {
  const [data, setData] = useState<ExpenseItem[] | null>(null);
  const [form] = Form.useForm();
  const [matchText, setMatchText] = useState<string>('');
  const [replaceText, setReplaceText] = useState<string>('');
  const { mutate: addExpenseItems } = useAddExpenseItems();
  const { data: allExpenses, isLoading } = useGetAllExpenseItemsQuery();

  const uniqueItems = allExpenses?.uniqueItems;
  const uniqueCategories = allExpenses?.uniqueCategories;
  const uniqueSubCategories = allExpenses?.uniqueSubCategories;

  const toDefaultOptionsType = (options: UniqueItem[] | UniqueCategory[]) => {
    if (options.length && 'category' in options[0]) {
      return (options as UniqueCategory[])?.map((c) => ({
        label: c.category,
        value: c.id,
      }));
    }

    return (options as UniqueItem[])?.map((i) => ({
      label: i.item,
      value: i.id,
    }));
  };

  const changeHandler = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const filteredData = results.data
          .filter((d: any) => d.cost.startsWith('-'))
          .map((fd: any) => ({
            ...fd,
            cost: fd.cost.replace('-', ''),
            balance: undefined,
            date: dayjs(fd.date),
          }));
        setData(filteredData);
        console.log(filteredData);
        form.setFieldsValue({ expenses: filteredData });
      },
    });
  };

  const handleReplace = () => {
    if (matchText.trim() === '') return;

    const currentData = form.getFieldValue('expenses') || [];
    console.log(currentData);
    const updatedData = currentData.map((item: ExpenseItem) => {
      if (
        item.item &&
        item.item.toLowerCase().includes(matchText.toLowerCase())
      ) {
        return {
          ...item,
          item: replaceText,
        };
      }
      return item;
    });

    form.setFieldsValue({ expenses: updatedData });
    setData(updatedData);
  };

  const handleSubmit = async () => {
    const formData = form.getFieldsValue();
    console.log(formData, data);
    if (data) addExpenseItems(data);
  };

  if (isLoading) return <Spin />;
  return (
    <>
      <Upload
        accept=".csv"
        beforeUpload={(file) => {
          changeHandler(file);
          return false; // Prevent auto-upload
        }}
      >
        <Button icon={<UploadOutlined />}>Upload CSV</Button>
      </Upload>

      <Space
        direction="horizontal"
        style={{ marginBottom: '16px' }}
      >
        <Input
          placeholder="Match text"
          value={matchText}
          onChange={(e) => setMatchText(e.target.value)}
        />
        <Input
          placeholder="Replace with"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
        />
        <Button
          type="primary"
          onClick={handleReplace}
        >
          Replace
        </Button>
      </Space>

      {data && (
        <Form
          form={form}
          name="expensesForm"
          layout="vertical"
          onFinish={handleSubmit}
        >
          {data.map((item, index) => (
            <Space
              key={index}
              direction="horizontal"
              style={{ marginBottom: '16px', width: '100%' }}
            >
              <Form.Item
                label="Item"
                name={['expenses', index, 'item']}
                initialValue={item.item}
                rules={[
                  { required: true, message: 'Please enter the expense item' },
                ]}
              >
                <AutoCompleteWithOptions
                  autoCompleteOptions={toDefaultOptionsType(uniqueItems ?? [])}
                  onChange={(value: string) =>
                    form.setFieldValue('item', value)
                  } // Sync form value
                  value={form.getFieldValue('item')} // Controlled value from form
                />
              </Form.Item>

              <Form.Item
                label="Cost"
                name={['expenses', index, 'cost']}
                initialValue={item.cost}
                rules={[{ required: true, message: 'Please enter the cost' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  placeholder="Enter cost"
                  formatter={(value) => `$ ${value}`}
                />
              </Form.Item>

              <Form.Item
                label="Category"
                name={['expenses', index, 'category']}
                initialValue={item.category}
                rules={[
                  { required: true, message: 'Please select a category' },
                ]}
              >
                <AutoCompleteWithOptions
                  autoCompleteOptions={toDefaultOptionsType(
                    uniqueCategories ?? []
                  )}
                  onChange={(value: string) =>
                    form.setFieldValue('category', value)
                  } // Sync form value
                  value={form.getFieldValue('category')} // Controlled value from form
                />
              </Form.Item>

              <Form.Item
                label="Sub Category"
                name={['expenses', index, 'subCategory']}
                initialValue={item.subCategory}
              >
                <AutoCompleteWithOptions
                  autoCompleteOptions={toDefaultOptionsType(
                    uniqueSubCategories ?? []
                  )}
                  onChange={(value: string) =>
                    form.setFieldValue('subCategory', value)
                  } // Sync form value
                  value={form.getFieldValue('subCategory')} // Controlled value from form
                />
              </Form.Item>

              <Form.Item
                label="Necessary"
                name={['expenses', index, 'isNecessary']}
                initialValue={item.isNecessary}
                valuePropName="checked"
                required
              >
                <Select>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Expected"
                name={['expenses', index, 'isExpected']}
                initialValue={item.isExpected}
                valuePropName="checked"
                required
              >
                <Select>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Date"
                name={['expenses', index, 'date']}
                initialValue={dayjs(new Date(item.date))}
                getValueFromEvent={(value) => console.log(value)}
                rules={[{ required: true, message: 'Please select a date' }]}
              >
                <DatePicker />
              </Form.Item>
            </Space>
          ))}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onSubmit={handleSubmit}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default UploadRoute;
