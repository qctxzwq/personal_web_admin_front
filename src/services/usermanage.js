import request from '@/utils/request';

// 获取用户列表
export async function get_user_list(params) {
  return request('/api/user/all', {
    method: 'GET',
    params,
  });
}