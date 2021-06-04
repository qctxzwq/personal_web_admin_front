/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { message } from 'antd';
import { history } from 'umi'
import { extend } from 'umi-request';
import { GetEnduranceToLocal } from './endurance';

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    message.error(errorText || "系统错误，请稍后重试！")
  } else if (!response) {
    message.error("系统错误，请稍后重试！")
  }

  return response;
};

const request = extend({
  errorHandler,
  credentials: 'include',
});

// 携带token
request.interceptors.request.use((url, options) => {
  const token = GetEnduranceToLocal("token")
  const auth = { "AUTHORIZATION": "Bearer " + token }
  let headers = Object.assign(options.headers, auth)
  return {
    url,
    options: { ...options, headers, interceptors: true },
  };
});

request.interceptors.response.use(async response => {
  const data = await response.clone().json();
  if (data && data.code == 401) {
    history.push("/user/login")
  }
  if (data && data.code != 0) {
    let msg = data.message || "系统错误,请稍后重试!"
    message.error(msg)
  }
  return response;
});



export default request;
