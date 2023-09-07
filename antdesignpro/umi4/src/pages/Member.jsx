import React from 'react';
import { PageContainer,ProCard} from '@ant-design/pro-components';
import { Button } from 'antd'

import clientRoutes from '../../config/routes';
function Member(){

    return(
        // 相当于layout的pageheader
        <PageContainer
        tabList={[
          {
            tab: '基本信息',
            key: 'base',
          },
          {
            tab: '详细信息',
            key: 'info',
          },
        ]}

        extra={[
          <Button key="3">操作</Button>,
          <Button key="2">操作</Button>,
          <Button key="1" type="primary">
            主操作
          </Button>,
        ]}
        // footer={[
        //   <Button key="rest">重置</Button>,
        //   <Button key="submit" type="primary">
        //     提交
        //   </Button>,
        // ]}
        >
        <ProCard direction="column" ghost gutter={[0, 16]}>
        <ProCard style={{ height: 200 }} />
        <ProCard gutter={16} ghost>
          <ProCard colSpan={16} style={{ height: 200 }} />
          <ProCard colSpan={8} style={{ height: 200 }} />
        </ProCard>
        <ProCard gutter={16} ghost>
          <ProCard colSpan={8} style={{ height: 200 }} />
          <ProCard colSpan={16} style={{ height: 200 }} />
        </ProCard>
      </ProCard>

        </PageContainer>
    )
}
export default Member;