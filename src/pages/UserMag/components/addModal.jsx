import React from "react"
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-form';
import { objToFormdata } from "@/utils/transform"
import { vaildCodeResponse } from "@/utils/vaildMes";
import { message } from "antd";

class AddModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null
    }
  }
  render() {
    const { visible, closeModal, addUser, actionRef } = this.props
    return <ModalForm
      title="新建用户"
      width="500px"
      visible={visible}
      modalProps={{
        onCancel: closeModal,
      }}
      onFinish={async (value) => {
        const res = await addUser(objToFormdata(value))
        console.log(res);
        if (vaildCodeResponse(res)) {
          message.success("创建成功！")
          if (actionRef.current) {
            actionRef.current.reload();
          }
          closeModal()
          return true
        }
        // const success = await handleAdd(value);
        // if (success) {
        //   handleModalVisible(false);
        //   if (actionRef.current) {
        //     actionRef.current.reload();
        //   }
        // }
      }}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: "请输入用户名"
          },
        ]}
        label="用户名"
        width="lg"
        name="name"
      />
      <ProFormText.Password
        label="密码"
        width="lg"
        name="password"
        rules={[
          {
            required: true,
            message: "请输入密码"
          },
        ]} />
      <ProFormText.Password
        label="确认密码"
        width="lg"
        name="confirm"
        rules={[
          {
            required: true,
            message: "请输入确认密码"
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value && getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('请确认两次密码相同!'));
            },
          }),
        ]} />
      <ProFormSelect
        name="status"
        width="lg"
        label="用户等级"
        options={[
          { label: '超级管理员', value: 0 },
          { label: '管理员', value: 1 },
          { label: '超级用户', value: 2 },
          { label: '用户', value: 3 },
          { label: '一级禁用用户', value: 4 },
          { label: '二级禁用用户', value: 5 },
          { label: '游客', value: 6 },
        ]}
        placeholder="请选择用户等级"
        rules={[{ required: true, message: '请选择用户等级!' }]}
      />
    </ModalForm>
  }
}

export default AddModal