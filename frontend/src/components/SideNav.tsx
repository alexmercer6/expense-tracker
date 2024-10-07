import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useNavigate, useNavigation } from 'react-router-dom';

const SideNav = () => {
  type MenuItem = Required<MenuProps>['items'][number];
  // const navigation = useNavigation();
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Home',
      icon: <MailOutlined />,
      type: 'item',
      onClick: () => navigate('/'),
    },
    {
      key: 'expenses',
      label: 'Expenses',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: 'expenseTable',
          label: 'Expense Table',
          onClick: () => navigate('/expenses/table'),
        },
        {
          key: 'expenseUpload',
          label: 'Upload File',
          onClick: () => navigate('/expenses/upload'),
        },
      ],
      type: 'submenu',
    },
    {
      type: 'divider',
    },
    {
      key: 'sub4',
      label: 'Navigation Three',
      icon: <SettingOutlined />,
      type: 'item',
    },
  ];

  // const onClick: MenuProps['onClick'] = (e) => {
  //   console.log('click ', e);
  // };

  return (
    <Sider style={{ height: '100vh', position: 'fixed', width: '200px' }}>
      <Menu
        // onClick={onClick}
        style={{ position: 'static' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
        // inlineCollapsed
      />
    </Sider>
  );
};

export default SideNav;
