import request from '@/utils/request';

// 用户登录
export async function login(params) {
  return request('/api/login', {
      method: 'POST',
      data: params,
  });
}

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
