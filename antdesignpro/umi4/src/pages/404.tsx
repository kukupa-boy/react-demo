import { history,Helmet } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => (
  <>
    <Helmet>
    <title>404</title>
  </Helmet>
  <Result
    status="404"
    title="404"
    subTitle="对不起，你访问的页面不存在"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        返回首页
      </Button>
    }
  />
  </>
);

export default NoFoundPage;
