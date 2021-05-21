import React from "react"
import ProTable from '@ant-design/pro-table';
import { Button, Image } from "antd"
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { PlusOutlined } from "@ant-design/icons"
import { get_user_list } from "@/services/usermanage"
import moment from "moment"

import AddModal from "./components/addModal"
import UpdateModal from "./components/updateModal"
import { vaildResponse } from "@/utils/vaildMes"

import "./index.less"

class UserMag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentRow: null,
      showDetail: false,
      createModalVisible: false,
      updateModalVisible: false,
      selectedRowsState: []
    }
    this.actionRef = React.createRef()
  }
  render() {
    let { selectedRowsState, createModalVisible, updateModalVisible, currentRow } = this.state
    const columns = [
      {
        title: "用户Id",
        dataIndex: 'id',
        tip: '用户id是唯一的',
        render: (dom, row) => {
          return (
            <a
              onClick={() => {
                this.setState({
                  currentRow: row,
                  showDetail: true,
                })
              }}
            >
              {dom}
            </a>
          );
        },
      },
      {
        title: "用户名",
        dataIndex: 'name',
        valueType: 'textarea',
      },
      {
        title: "用户状态",
        dataIndex: 'status',
        sorter: true,
        hideInForm: true,
        valueEnum: {
          0: {
            text: "超级管理员",
            status: 'Success',
          },
          1: {
            text: "管理员",
            status: 'Success',
          },
          2: {
            text: "超级用户",
            status: 'Processing',
          },
          3: {
            text: "用户",
            status: 'Processing',
          },
          4: {
            text: "一级禁用用户",
            status: 'Error',
          },
          5: {
            text: "二级禁用用户",
            status: 'Error',
          },
          6: {
            text: "游客",
            status: 'Default',
          },
        },
      },
      {
        title: "用户头像",
        dataIndex: 'avatar',
        hideInSearch: true,
        hideInForm: true,
        render: (text) => {
          return (
            <span className="tab_avatar">
              <Image
                src={text}
                fallback="data:image/png;base64,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"
              />
            </span>
          );
        },
      },
      {
        title: "创建时间",
        sorter: true,
        colSize: 2,
        dataIndex: 'ctime',
        hideInSearch: true,
        render: (time) => {
          return <span>{moment(time * 1000).format("YYYY-MM-DD HH:mm:ss")}</span>
        },
      },
      {
        title: "操作",
        hideInSearch: true,
        render: (_, record) =>
          <a
            onClick={() => {
              this.setState({
                updateModalVisible: true,
                currentRow: record
              })
            }}>
            修改
          </a>
      },
    ];
    return <PageContainer>
      <ProTable
        headerTitle="用户管理"
        actionRef={this.actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              console.log("点击新建");
              this.setState({
                createModalVisible: true
              })
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          let res = await get_user_list({ ...params, sorter, filter })
          if (vaildResponse(res)) {
            res.data.user_info.map((item, index) => {
              item.key = index
            })
            return { data: res.data.user_info, success: res.message, total: res.data.total }
          }
          return null
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            this.setState({
              selectedRowsState: selectedRows
            })
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              个用户
            </div>
          }
        >
          <Button
            onClick={async () => {
              console.log("禁用用户");
            }}
          >
            禁用
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.actionRef.current.clearSelected()
              this.setState({ selectedRowsState: [] })
            }
            }>
            取消
          </Button>
        </FooterToolbar>
      )}
      <AddModal
        visible={createModalVisible}
        closeModal={() => { this.setState({ createModalVisible: false }) }}
        actionRef={this.actionRef} />
      <UpdateModal
        visible={updateModalVisible}
        closeModal={() => { this.setState({ updateModalVisible: false }) }}
        actionRef={this.actionRef}
        defaultVal={currentRow} />
    </PageContainer>
  }
}

export default UserMag