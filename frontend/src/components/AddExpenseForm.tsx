import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  DatePicker,
} from 'antd';
import { ExpenseItem } from '../types/type';
import { useEffect } from 'react';

type Props = {
  isModalVisible: boolean;
  handleCloseModal: () => void;
  handleAddExpense: (values: ExpenseItem) => void;
  isSaving: boolean;
  isSuccess: boolean;
};

const { Option } = Select;

export const AddExpenseModal = ({
  isModalVisible,
  handleCloseModal,
  handleAddExpense,
  isSaving,
  isSuccess,
}: Props) => {
  const [form] = Form.useForm();
  const onFinish = (values: ExpenseItem) => {
    handleAddExpense(values);
  };

  useEffect(() => {
    if (isSuccess) form.resetFields();
  }, [form, isSuccess]);
  return (
    <Modal
      title="Add Expense"
      open={isModalVisible}
      onCancel={handleCloseModal}
      footer={null}
      // loading={isSaving}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Item"
          name="item"
          rules={[{ required: true, message: 'Please enter the expense item' }]}
        >
          <Input placeholder="Enter item" />
        </Form.Item>

        <Form.Item
          label="Cost"
          name="cost"
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
          name="category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select category"
            style={{ minWidth: 200 }}
          >
            <Option value="Food">Food</Option>
            <Option value="Transportation">Transportation</Option>
            <Option value="Entertainment">Entertainment</Option>
            <Option value="Utilities">Utilities</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Necessary"
          name="isNecessary"
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
          name="isExpected"
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
          name="date"
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={isSaving}
        >
          Add Expense
        </Button>
      </Form>
    </Modal>
  );
};

// import {
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   Switch,
//   DatePicker,
//   Button,
// } from 'antd';

// import { ExpenseItem } from '../types/type';
// import { useAddExpenseItem } from '../api/hooks/usetAddNewExpenseItemQuery';

// const { Option } = Select;

// const AddExpenseForm = () => {
//   const [form] = Form.useForm();
//   const addExpenseItem = useAddExpenseItem();

//   const onFinish = (values: ExpenseItem) => {
//     const newExpenseItem = {
//       ...values,
//     };
//     addExpenseItem.mutate(newExpenseItem);
//     form.resetFields();
//   };

//   return (
//     <Form
//       form={form}
//       layout="inline"
//       onFinish={onFinish}
//       initialValues={{
//         isNecessary: true,
//         isExpected: true,
//         category: [],
//       }}
//     >
//       <Form.Item
//         name="item"
//         rules={[{ required: true, message: 'Please input an item!' }]}
//       >
//         <Input placeholder="Item name" />
//       </Form.Item>

//       <Form.Item
//         name="cost"
//         rules={[{ required: true, message: 'Please input the cost!' }]}
//       >
//         <InputNumber
//           placeholder="Cost"
//           min={0}
//         />
//       </Form.Item>

//       <Form.Item name="category">
//         <Select
//           mode="multiple"
//           placeholder="Select categories"
//         >
//           <Option value="Food">Food</Option>
//           <Option value="Transport">Transport</Option>
//           <Option value="Entertainment">Entertainment</Option>
//         </Select>
//       </Form.Item>

//       <Form.Item
//         name="isNecessary"
//         valuePropName="checked"
//       >
//         <Switch
//           checkedChildren="Necessary"
//           unCheckedChildren="Not Necessary"
//         />
//       </Form.Item>

//       <Form.Item
//         name="isExpected"
//         valuePropName="checked"
//       >
//         <Switch
//           checkedChildren="Expected"
//           unCheckedChildren="Unexpected"
//         />
//       </Form.Item>

//       <Form.Item
//         name="date"
//         rules={[{ required: true, message: 'Please select a date!' }]}
//       >
//         <DatePicker />
//       </Form.Item>

//       <Form.Item>
//         <Button
//           type="primary"
//           htmlType="submit"
//         >
//           Add Expense
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default AddExpenseForm;
