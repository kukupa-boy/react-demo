import Footer from '@/components/Footer';
import { Question } from '@/components/RightContent';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer ,getMenuData} from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';
import { errorConfig } from './requestErrorConfig';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';
import clientRoutes from '../config/routes';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
/*
  只要页面加载，只要跳转的不是登陆页，就需要从服务器获取登陆者信息，
  存放到initialState.currentUser中,以此处理动态校验，如果没有登陆，
  则直接跳转到登陆页
  return的就是全局对象
*/
export async function getInitialState(){ // 页面打开和刷新时触发（）只会执行一次
  // 获取用户信息
  let currentUser
  if(history.location.pathname !== loginPath){
    // 获取用户信息
      currentUser = {
        name: 'admin',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
      };

      return { 
        currentUser,
        settings: defaultSettings as Partial<LayoutSettings>,
      };
    }
  return { 
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
// initialState全局的状态，setInitialState设置全局的状态
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  // const x = getMenuData(clientRoutes);
  // console.log("x",x)
  return {
    // 自定义头像前的图标
    actionsRender: () => [<Question key="doc" />],
    // 自定义头像图片
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    // 自定义水印
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    // 自定义页脚
    footerRender: () => <Footer />,
    // 页面切换时触发
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        // history.push(loginPath);
      }
    },
    // 配置面包屑
    // headerContentRender:() => {
    //   return <ProBreadcrumb />;;
    // },
    // 工作区域的背景颜色
    // layoutBgImgList: [
    //   {
    //     src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
    //     left: 85,
    //     bottom: 100,
    //     height: '303px',
    //   },
    //   {
    //     src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
    //     bottom: -68,
    //     right: -45,
    //     height: '303px',
    //   },
    //   {
    //     src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
    //     bottom: 0,
    //     left: 0,
    //     width: '331px',
    //   },
    // ],
    // 自定义菜单左下脚的内容
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
      // 自定义菜单头
    // menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    // childrenRender用户编写的页面+右侧漂浮用于设置layout小图标
    childrenRender: (children) => {
      /**
       * 如果没有加载完成可以使用这个显示loading组件（相当于dva的loading）：if (initialState?.loading) return <PageLoading />;
       */
      return (
        <>
        {/* 用户编写的功能页面  */}
          {children}
          {/* SettingDrawer是用于设置页面的小图标 */}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            // 这里是将defaultSettings的值传递给SettingDrawer
            settings={initialState?.settings}
            onSettingChange={(settings) => {  // 设置页面的小图标的设置改变时触发，修改initialState的值
              setInitialState((preInitialState) => ({ 
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    // 其余的配置项
    ...initialState?.settings,
  };
};

/**
 * @name request 配置request请求的统一处理方式包括错误处理和请求拦截等
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  timeout: 10000,
  ...errorConfig,
};
