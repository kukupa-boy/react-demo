
/**
 * @name access.ts
 * @description 权限的控制文件
 * 
 */
/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
// initialState全局初始状态值（包括用户信息等等）
// currentUser?: 的意思可选的，可以有也可以没有
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {}; // ??当左侧的值为undefined的时候返回右侧的值
  return {
    // canAdmin: currentUser && currentUser.access === 'admin',
  };
}
