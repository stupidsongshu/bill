import { useState, useRef } from 'react'
import type { FC } from 'react'
import { Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form'
import type { TableListItem, TableListParams } from './data'
import { getUserPageList, addUser, updateUser } from './service'
import { statusColumnValueEnum, statusValueEnum } from '../../../utils/enum'

async function handleSave(fields: TableListItem, currentRow?: TableListItem): Promise<boolean> {
  const data = { ...currentRow, ...fields }
  console.log('handleSave currentRow:', currentRow)
  console.log('handleSave fields:', fields)
  console.log('handleSave data:', data)
  const action = data.id ? '更新' : '添加'
  const hide = message.loading('正在' + action)
  try {
    if (data.id) {
      await updateUser(data)
    } else {
      await addUser(data)
    }
    hide()
    message.success(action + '成功')
    return true
  } catch (error) {
    hide()
    message.error(action + '失败请重试！')
    return false
  }
}

const UserList: FC = () => {
  const actionRef= useRef<ActionType>()
  const [currentRow, setCurrentRow] = useState<TableListItem>()
  const [createModalVisible, handleModalVisible] = useState<boolean>(false)

  const columns: ProColumns<TableListItem>[] = [
    {
      dataIndex: 'id',
      title: '编号',
      valueType: 'checkbox',
      hideInSearch: true,
      width: 80,
    },
    {
      dataIndex: 'nickname',
      title: '昵称',
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
      hideInSearch: true,
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
      valueEnum: statusColumnValueEnum,
    },
    {
      dataIndex: 'option',
      title: '操作',
      valueType: 'option',
      render: (text, record, index, action) => [
        <a
          key='editable'
          onClick={() => {
            // action?.startEditable?.(record.id)
            setCurrentRow(record)
            handleModalVisible(true)
          }}
        >
          编辑
        </a>
      ]
    }
  ]

  function onVisibleChange(visible: boolean) {
    console.log('onVisibleChange:', visible)
    handleModalVisible(visible)
    if (!visible) {
      setCurrentRow(undefined)
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
      // editable={{
      //   type: 'single'
      // }}
      toolBarRender={() => [
        <Button
          type="primary"
          onClick={() => {
            setCurrentRow(undefined)
            handleModalVisible(true)
          }}
        >
          <PlusOutlined /> 新建
        </Button>
      ]}
      request={getUserPageList}>
    </ProTable>

    {!createModalVisible ? null : <ModalForm
      title={currentRow && currentRow.id ? '编辑' : '新建'}
      width={500}
      layout="horizontal"
      labelCol={{span: 4}}
      wrapperCol={{span: 20}}
      visible={createModalVisible}
      onVisibleChange={onVisibleChange}
      onFinish={async (values) => {
        const success = await handleSave(values as TableListItem, currentRow)
        if (success) {
          handleModalVisible(false)
          // setCurrentRow(undefined)
          if (actionRef.current) {
            actionRef.current.reload()
          }
        }
      }}
      initialValues={{
        status: '1',
        ...currentRow
      }}
      >
      <ProFormText
        label="昵称"
        name="nickname"
        width="md"
        rules={[
          { required: true, message: '请输入昵称' }
        ]}
      >
      </ProFormText>
      {/* { currentRow && currentRow.id ? null :
        <>
          <ProFormText.Password
            label="密码"
            name="password"
            width='md'
            rules={[
              { required: true, message: '请输入密码' }
            ]}>
          </ProFormText.Password>
          <ProFormText label="手机号" name="phone" width="md"></ProFormText>
        </>
      } */}
      <ProFormText label="邮箱" name="email" width="md"></ProFormText>
      <ProFormSelect
        label="状态"
        name="status"
        width='md'
        convertValue={(val, field) => {
          // [convertValue 前置转化](https://procomponents.ant.design/components/form#convertvalue-%E5%89%8D%E7%BD%AE%E8%BD%AC%E5%8C%96)
          // convertValue 发生在组件获得数据之前，一般是后端直接给前端的数据，有时需要精加工一下。
          return val.toString()
        }}
        valueEnum={statusValueEnum}
        placeholder="请选择用户状态"
      ></ProFormSelect>
    </ModalForm>}
  </PageContainer>
}

export default UserList
