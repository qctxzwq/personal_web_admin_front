import React from 'react';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  MobileFilled
} from '@ant-design/icons';
import { connect } from 'umi';
import { Space, message } from 'antd';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { getFakeCaptcha } from '@/services/login';
import './index.less';

@connect(({ user }) => ({
  currentUser: user.userInfo
}))
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'account',
      loginLoading: false,
    }
  }

  handleSubmit = (values) => {
    const { type } = this.state
    const { dispatch } = this.props;
    this.setState({ loginLoading: true })
    const callback = () => {
      this.setState({ loginLoading: false })
    }
    dispatch({
      type: 'user/login',
      payload: { ...values, type },
      callback
    });
  }

  handleLoginByOth = (type) => {
    this.setState({ type })
  }

  render() {
    const { type, loginLoading } = this.state
    return (
      <div className="main">
        <ProForm
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            render: (_, dom) => dom.pop(),
            searchConfig: {
              submitText: '登录',
            },
            submitButtonProps: {
              loading: loginLoading,
              size: 'large',
              style: {
                width: '100%',
              },
            },
          }}
          onFinish={(values) => {
            this.handleSubmit(values);
            return Promise.resolve();
          }}
        >
          {type === 'account' && (
            <>
              <ProFormText
                name="name"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className="prefixIcon" />,
                }}
                placeholder="请输入用户名"
                rules={[
                  {
                    required: true,
                    message: "用户名不能为空"
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className="prefixIcon" />,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: "密码不能为空"
                  },
                ]}
              />
            </>
          )}

          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className="prefixIcon" />,
                }}
                name="mobile"
                placeholder="请输入手机号"
                rules={[
                  {
                    required: true,
                    message: "请输入手机号"
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: "手机号格式不正确"
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined className="prefixIcon" />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder="请输入验证码"
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count}`;
                  }

                  return "获取验证码"
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: "请输入验证码"
                  },
                ]}
                onGetCaptcha={async (mobile) => {
                  const result = await getFakeCaptcha(mobile);

                  if (result === false) {
                    return;
                  }

                  message.success(
                    'Get the verification code successfully! The verification code is: 1234',
                  );
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </ProForm>
        <Space className="other">
          其他登录方式
          {type != "account" && <UserOutlined onClick={() => this.handleLoginByOth("account")} className="icon" />}
          {type != "mobile" && <MobileFilled onClick={() => this.handleLoginByOth("mobile")} className="icon" />}
          <AlipayCircleOutlined className="icon" />
          <TaobaoCircleOutlined className="icon" />
        </Space>
      </div>
    );
  }
}

export default Login
