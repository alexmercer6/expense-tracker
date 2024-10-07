import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import SideNav from '../SideNav';

const RootLayout = () => {
  return (
    <Layout hasSider>
      <SideNav />
      <Layout style={{ marginLeft: '200px', padding: '16px' }}>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default RootLayout;
