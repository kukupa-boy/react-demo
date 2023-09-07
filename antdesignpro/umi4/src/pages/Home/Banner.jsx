import React,{useRef,useState} from 'react';
import { PageContainer,ProTable,ModalForm,ProFormUploadButton,ProFormText} from '@ant-design/pro-components';
import { Button,Form,Space,message} from 'antd';
import { PlusOutlined,MinusOutlined} from '@ant-design/icons';
const waitTime = (time = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };
function Add(){
    const [form] = Form.useForm();
    const uploadfn= async (aa)=>{
        // 提交
    }
    return <>
         <ModalForm
            title="新增Banner"
            layout="horizontal"
            labelAlign="right"
            labelCol={{
                xs: { span: 24 },
                sm: { span: 6 },
              }}
            width={400}
            trigger={
                <Button type="primary">
                <PlusOutlined />
                    新增
                </Button>
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
                onCancel: () => console.log('run'),
            }}
            // 提交数据前禁用按钮多少秒
            submitTimeout={2000}

            onFinish={async (values) => {
                await waitTime(2000);
                console.log(values);
                message.success('提交成功');
                return true;
            }}> 
            <ProFormUploadButton
                name="upload"
                label="上传图片"
                max={3}
                fieldProps={{
                    name: 'file',
                    listType: 'picture-card',
                }}
                rules={[{ required: true, message: '请上传图片' }]}
                onChange={uploadfn}
                action="/upload.do"
            />
            <ProFormText 
                name="order"
                label="排序值"
                placeholder="范围100-200之间"
                rules={[{ required: true, message: '请填写排序值' }]}
            />
            <ProFormText 
                name="link"
                label="跳转链接"
                placeholder="请输入正确的网址"
                rules={[{ required: true, message: '请填写跳转链接' }]}
            />
         </ModalForm>
     </>
}

function Banner(){
    let [visible,setVisible] = useState(false);
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      }
    const columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title:"操作",
        key:"tags",
        dataIndex:"tags",
        render:()=>(
            <Space>
                <a>修改</a>
                <a>删除</a>
            </Space>
        )
    }
    ]
    const datasouce = [
        {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
        },
        {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
        },
    ]
    const getData = async(params,)=>{
        /**
         * 符合ProTable组件的数据格式
         * (params)=>{data,sucess,total}这样格式的请求函数
         */
            return {
                data:datasouce, // 自动赋值给datasource
                success:true,
                total:datasouce.length
            }
        }
    const deleteAll = ()=>{
            
    }

    return(
        <>
            <PageContainer>
                <ProTable
                    // 表格头部右上角的操作栏旁边的显示
                    toolBarRender={()=>[
                        <Add />,
                        <Button danger icon={<MinusOutlined />} onClick={deleteAll}>批量删除</Button>
                    ]}
                    // 表格头部右上角的操作栏
                    options={{
                        density:false
                    }}
                    // formRef = {formRef}
                    // 请求数据的函数
                    request = {getData}
                    // 是否显示搜索表单的选项(可以自定义dom)
                    // search={false}
                    dataSource = {datasouce}
                    columns={columns}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection
                    }}
                    />
            </PageContainer>
            
        </>
    )


}
export default Banner;