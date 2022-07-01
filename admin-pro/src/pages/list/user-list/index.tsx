// import React from 'react'
import type { FC } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import type { TableListItem, TableListParams } from './data'
import { getUserPageList} from './service'

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
  return <PageContainer>
    <ProTable<TableListItem, TableListParams>
      headerTitle='查询用户列表'
      cardBordered
      rowKey='id'
      rowSelection={{}}
      columns={columns}
      editable={{
        type: 'single'
      }}
      request={getUserPageList}
      ></ProTable>
  </PageContainer>
}

export default UserList
