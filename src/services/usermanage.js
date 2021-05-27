import request from '@/utils/request';

// 获取用户列表
export async function get_user_list(params) {
  return request('/api/user/all', {
    method: 'GET',
    params,
  });
}

// 新增用户
export async function post_add_user(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}