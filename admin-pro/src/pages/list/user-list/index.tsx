import { useState, useRef } from 'react'
import type { FC } from 'react'
import { Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form'
import type { TableListItem, TableListParams } from './data'
import { getUserPageList, userSave } from './service'

const columns: ProColumns<TableListItem>[] = [
  {
    dataIndex: 'id',
    title: '编号',
    valueType: 'checkbox',
    hideInSearch: true,
    width: 80,
  },
  {
    dataIndex: 'name',
    title: '用户名',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项'
        }
      ]
    }
  },
  {
    dataIndex: 'password',
    title: '用户密码',
    hideInTable: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项'
        }
      ]
    }
  },
  {
    dataIndex: 'phone',
    title: '手机号',
  },
  {
    dataIndex: 'email',
    title: '邮箱',
  },
  {
    dataIndex: 'status',
    title: '状态',
    valueType: 'select',
    valueEnum: {
      // 状态，0-无效，1-正常
      0: {
        text: '无效',
        status: 'Error'
      },
      1: {
        text: '正常',
        status: 'Success'
      }
    }
  },
  {
    dataIndex: 'option',
    title: '操作',
    valueType: 'option',
    render: (text, record, index, action) => [
      <a
        key='editable'
        onClick={() => {
          action?.startEditable?.(record.id)
        }}
      >
        编辑
      </a>
    ]
  }
]

const UserList: FC = () => {
  const actionRef= useRef<ActionType>()
  const [createModalVisible, handleModalVisible] = useState<boolean>(false)

  async function handleAdd(fields: TableListItem): Promise<boolean> {
    const hide = message.loading('正在添加')
    try {
      await userSave(fields)
      hide()
      message.success('添加成功')
      return true
    } catch (error) {
      hide()
      message.error('添加失败请重试！')
      return false
    }
  }

  return <PageContainer>
    <ProTable<TableListItem, TableListParams>
      headerTitle='查询用户列表'
      actionRef={actionRef}
      cardBordered
      rowKey='id'
      rowSelection={{}}
      columns={columns}
      editable={{
        type: 'single'
      }}
      toolBarRender={() => [
        <Button
          type="primary"
          onClick={() => {
            handleModalVisible(true)
          }}
        >
          <PlusOutlined /> 新建
        </Button>
      ]}
      request={getUserPageList}>
    </ProTable>

    <ModalForm
      title="新建"
      width={500}
      layout="horizontal"
      labelCol={{span: 4}}
      wrapperCol={{span: 20}}
      visible={createModalVisible}
      onVisibleChange={handleModalVisible}
      onFinish={async (values) => {
        const success = await handleAdd(values as TableListItem)
        if (success) {
          handleModalVisible(false)
          if (actionRef.current) {
            actionRef.current.reload()
          }
        }
      }}
      >
      <ProFormText
        label="用户名"
        name="name"
        width="md"
        rules={[
          { required: true, message: '请输入用户名' }
        ]}
      >
      </ProFormText>
      <ProFormText.Password
        label="密码"
        name="password"
        width='md'
        rules={[
          { required: true, message: '请输入密码' }
        ]}>
      </ProFormText.Password>
      <ProFormText label="手机号" name="phone" width="md"></ProFormText>
      <ProFormText label="邮箱" name="email" width="md"></ProFormText>
      <ProFormSelect
        label="状态"
        name="status"
        width='md'
        valueEnum={{
          0: '无效',
          1: '正常'
        }}
        initialValue="1"
        placeholder="请选择用户状态"
      ></ProFormSelect>
    </ModalForm>
  </PageContainer>
}

export default UserList
