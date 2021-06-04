import React, { useEffect, useRef, useState } from "react"
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormUploadDragger,
} from '@ant-design/pro-form';
import { Image } from "antd"
import "./index.less"
import { connect } from "umi";

const UpdateModal = (props) => {
  const { visible, closeModal, actionRef, defaultVal, userInfo } = props
  const formRef = useRef()

  // 可选择状态
  const statusOption = [
    { label: '超级管理员', value: 0 },
    { label: '管理员', value: 1 },
    { label: '超级用户', value: 2 },
    { label: '用户', value: 3 },
    { label: '一级禁用用户', value: 4 },
    { label: '二级禁用用户', value: 5 },
    { label: '游客', value: 6 },
  ]
  const [option, setOption] = useState(statusOption)


  useEffect(() => {
    formRef.current?.setFieldsValue(defaultVal);
  }, [props.defaultVal])

  useEffect(() => {
    console.log(userInfo);
    const { status } = userInfo
    let curOption = []
    statusOption.forEach(item => {
      if(item.value >= status) curOption.push(item)
    })
    console.log(curOption);
    setOption(curOption)
  }, [userInfo])
  return <ModalForm
    title="修改用户"
    width="500px"
    visible={visible}
    formRef={formRef}
    modalProps={{
      onCancel: closeModal,
    }}
    onFinish={async (value) => {
      console.log(value);
      return true
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
      initialValue={defaultVal.name}
    />
    <ProFormSelect
      name="status"
      width="lg"
      label="用户等级"
      options={option}
      placeholder="请选择用户等级"
      rules={[{ required: true, message: '请选择用户等级!' }]}
    />
    {defaultVal ?
      <div>
        <span className="edit_ava_txt">
          用户头像
              </span>
        <div className="edit_avatar">
          <Image
            width={100}
            src={defaultVal.avatar}
          />
        </div>
      </div>
      : <ProFormUploadDragger
        label="用户头像"
        name="avatar"
        width="lg"
        description={null}
        action="upload.do" />}
  </ModalForm>
}

export default connect(({ user }) => ({
  userInfo: user.userInfo
}))(UpdateModal)

