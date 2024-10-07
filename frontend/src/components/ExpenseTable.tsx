import { useEffect, useState } from 'react';
import {
  Table,
  Tabs,
  DatePicker,
  Button,
  notification,
  Typography,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useGetAllExpenseItemsQuery } from '../api/hooks/useGetAllExpenseItemsQuery';
import { ColumnsType } from 'antd/es/table';
import { ExpenseItem } from '../types/type';
import { AddExpenseModal } from './AddExpenseForm';
import { useAddExpenseItem } from '../api/hooks/usetAddNewExpenseItemQuery';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ExpenseTable = () => {
  const [timePeriod, setTimePeriod] = useState<string | undefined>(undefined);
  const [referenceDate, setReferenceDate] = useState<string>(
    dayjs().format('YYYY-MM-DD')
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, error: string) => {
    api[type]({
      message: type.toUpperCase(),
      description: error,
    });
  };

  const {
    data: expenseItems,
    refetch,
    isLoading,
    error,
  } = useGetAllExpenseItemsQuery(timePeriod, referenceDate);
  const addExpenseItem = useAddExpenseItem();

  const totalSpend = expenseItems?.totalSpend;

  useEffect(() => {
    refetch();
  }, [timePeriod, referenceDate, refetch]);

  const columns: ColumnsType<ExpenseItem> = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost: number) => `$${cost.toFixed(2)}`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Sub Category',
      dataIndex: 'subCategory',
      key: 'subCategory',
    },
    {
      title: 'Necessary',
      dataIndex: 'isNecessary',
      key: 'isNecessary',
      render: (isNecessary: boolean) => (isNecessary ? 'Yes' : 'No'),
    },
    {
      title: 'Expected',
      dataIndex: 'isExpected',
      key: 'isExpected',
      render: (isExpected: boolean) => (isExpected ? 'Yes' : 'No'),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
      defaultSortOrder: 'ascend',
      sorter: (a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 0 : 1),
    },
  ];

  const handleTabChange = (key: string) => {
    setTimePeriod(key === 'all' ? undefined : key);
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setReferenceDate(date.format('YYYY-MM-DD'));
    }
  };

  const handleSetToToday = () => {
    const today = dayjs().format('YYYY-MM-DD');
    setReferenceDate(today);
  };

  const handleAddExpense = async (values: ExpenseItem) => {
    addExpenseItem.mutate(values);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleDisplayedDateFormat = (
    referenceDate: string,
    currentTimePeriod?: string
  ) => {
    const { label } = tabItems.find((i) => i.key === currentTimePeriod) || {
      label: 'All',
    };
    const date = dayjs(referenceDate); // Example date
    const getWeek = (date: Dayjs) => {
      // Get the day of the month
      const dayOfMonth = date.date(); // 13

      // Get the first day of the month
      const firstDayOfMonth = date.startOf('month').day(); // 0 (Sunday) to 6 (Saturday)

      // Calculate the week number in the month
      const weekOfMonth = Math.ceil((dayOfMonth + firstDayOfMonth) / 7); // Calculates the week number

      return (
        ' Week ' +
        weekOfMonth +
        ' ' +
        date.format('MMMM') +
        ' ' +
        date.format('YYYY')
      );
    };

    switch (label) {
      case 'Day':
        return date.format('dddd');
      case 'Week':
        return getWeek(date);
      case 'Month':
        return date.format('MMMM') + ' ' + date.format('YYYY');
      case 'Year':
        return date.format('YYYY');
      default:
        return label;
    }
  };

  const tabItems = [
    { label: 'All', key: 'all' },
    { label: 'Day', key: 'day' },
    { label: 'Week', key: 'week' },
    { label: 'Month', key: 'month' },
    { label: 'Year', key: 'year' },
  ];

  useEffect(() => {
    if (addExpenseItem.isSuccess) handleCloseModal();
  }, [addExpenseItem.isSuccess]);

  if (error) return <div>Oops...</div>;
  if (addExpenseItem.error)
    openNotificationWithIcon('error', addExpenseItem.error.message);

  console.log(expenseItems?.expenseItems);

  return (
    <div>
      {contextHolder}
      <Typography.Title>
        {handleDisplayedDateFormat(referenceDate, timePeriod)} ${totalSpend}
      </Typography.Title>
      <Tabs
        defaultActiveKey="all"
        items={tabItems}
        onChange={handleTabChange}
      />

      <DatePicker
        value={dayjs(referenceDate)}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
      />

      <Button
        onClick={handleSetToToday}
        style={{ marginLeft: '10px' }}
      >
        Set to Today
      </Button>

      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginLeft: '10px' }}
      >
        Add Expense
      </Button>

      <Table
        loading={isLoading}
        dataSource={expenseItems?.expenseItems || []}
        columns={columns}
        rowKey="id" // Ensure a unique row key
        scroll={{ y: '100vh', x: 'max-content' }}
      />
      <AddExpenseModal
        handleAddExpense={handleAddExpense}
        handleCloseModal={handleCloseModal}
        isModalVisible={isModalVisible}
        isSaving={addExpenseItem.isPending}
        isSuccess={addExpenseItem.isSuccess}
        uniqueItems={expenseItems?.uniqueItems ?? []}
        uniqueCategories={expenseItems?.uniqueCategories ?? []}
        uniqueSubCategories={expenseItems?.uniqueSubCategories ?? []}
      />
    </div>
  );
};

export default ExpenseTable;
