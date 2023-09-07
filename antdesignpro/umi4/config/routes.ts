
/**
 * 文档查看：https://umijs.org/docs/guides/routes umi的路由配置
 * 
 * 路由组件以./page下面的组件开始，一般都会去 src/pages 下面找对应的组件,
 * 不放在layout里面的组件不要写pagecontaioner，
 * 这个是用于配置面包屑这些的
 *  图表默认使用antdesign的，不加outlined,第一个字母小写
 */
export default [
  { path: '/', redirect: '/controlpanel' }, 
  {
    path:'/controlpanel',
    name:'控制面板',
    icon:'windows',
    component:'./ControlPanel'
  },
  {
    path:"/home",
    name:"首页",
    icon:'home',
    routes:[
      {
        path:"/home",
        redirect:"/home/analysis"
      },
      {
        path:"/home/banner",
        name:"轮播图",
        component:"./Home/Banner",
        icon:"smile"
      },
      {
        path:"/home/hotsale",
        name:"热销商品",
        component:"./Home/HotSale",
        icon:"smile"

      },
      {
        path:"/home/newest",
        name:"最新上架",
        component:"./Home/Newest",
        icon:"smile"
      },
      {
        path:"/home/recommend",
        name:"推荐商品",
        component:"./Home/Recommend",
        icon:"smile"
      },
    ]
  },
  // 分类管理
  {
    path:"/classify",
    name:"分类管理",
    icon:"database",
    component:"./Classify",
  },
  // 商品管理
  {
    path:"/goods",
    name:"商品管理",
    icon:"shopping",
    component:"./Goods",
  },
  // 订单管理
  {
    path:"/order",
    name:"订单管理",
    icon:"PropertySafety",
    component:"./Order",
  },

  { 
    name: '会员页面',
    path: '/member', 
    icon: 'medium', 
    component: './Member'
  },
  // 系统设置
  {
    path:"/system",
    name:"系统设置",
    icon:"setting",
    componnet:"./System",
  },
  { 
    name: '登录',
    path: '/login', 
    layout: false,
    component: './Login'
  },
  { 
    name: '欢迎页面',
    path: '/welcome', 
    icon: 'smile', 
    component: './Welcome' 
  },
 
  {
    path: '/admin',
    icon: 'crown', 
    // 权限标识，可用于做权限校验
    // access: 'canAdmin',
    name: '管理员页面',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', component: './Admin' },
    ],
  },
  { icon: 'table', path: '/list', component: './TableList', name: '表格页' },
  
  

  { path: '*', layout: false, component: './404' },
];

