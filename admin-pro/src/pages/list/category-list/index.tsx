import React, { useRef, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form'
import { Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { TableListItem} from './data'
import { categoryColumnValueEnum, categoryValueEnum, statusColumnValueEnum, statusValueEnum } from '../../../utils/enum'
import { getCategoryList, categorySave } from './service'

const handleSave = async (fields: TableListItem, currentRow?: TableListItem): Promise<boolean> => {
  const data = {...currentRow, ...fields}
  const action = data.id ? '编辑' : '新建'
  const hide = message.loading('正在' + action)
  try {
    const ret = await categorySave(data)
    console.log('handleSave:', action, ret)
    message.success(`${action}成功`)
    hide()
    return true
  } catch (error) {
    message.error(`${action}失败`)
    hide()
    return false
  }
}

const CategoryList: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [currentRow, setCurrentRow] = useState<TableListItem>()
  const [modalVisible, handleModalVisible] = useState<boolean>(false)

  const columns: ProColumns<TableListItem>[] = [
    {
      dataIndex: 'id',
      title: '编号',
      // valueType: 'indexBorder'
    },
    {
      dataIndex: 'name',
      title: '分类名称',
    },
    {
      dataIndex: 'type',
      title: '分类类型',
      valueType: 'select',
      valueEnum: categoryColumnValueEnum,
    },
    {
      dataIndex: 'status',
      title: '状态',
      valueType: 'select',
      valueEnum: statusColumnValueEnum,
    },
    {
      title: '操作',
      // valueType: 'option',
      search: false,
      render(dom, entity, index, action, schema) {
        return [
          <Button
            key='editable'
            type='link'
            size='small'
            onClick={() => {
              setCurrentRow(entity)
              handleModalVisible(true)
            }}
            >编辑
          </Button>
        ]
      },
    }
  ]

  return <PageContainer>
    <ProTable
      rowKey='id'
      columns={columns}
      actionRef={actionRef}
      request={getCategoryList}
      search={{
        filterType: 'query',
        defaultCollapsed: false,
        showHiddenNum: true
      }}
      toolBarRender={() => [
        <Button
          type='primary'
          onClick={() => {
            setCurrentRow(undefined)
            handleModalVisible(true)
          }}
        >
          <PlusOutlined /> 新建
        </Button>
      ]}
    />
    {
      !modalVisible ? null : <ModalForm
        title={currentRow && currentRow.id ? '编辑' : '新增'}
        visible={modalVisible}
        width={500}
        layout="horizontal"
        labelCol={{span: 4}}
        initialValues={{
          status: 1,
          ...currentRow
        }}
        onVisibleChange={(visible: boolean) => {
          handleModalVisible(visible)
          if (!visible) {
            setCurrentRow(undefined)
          }
        }}
        onFinish={async (values) => {
          const success = await handleSave(values as TableListItem, currentRow)
          if (success) {
            handleModalVisible(false)
            actionRef.current?.reload()
          }
        }}
      >
        <ProFormText
          label='分类名称'
          name='name'
          rules={[
            {required: true}
          ]}
        />
        <ProFormSelect
          label="分类类型"
          name="type"
          valueEnum={categoryValueEnum}
          placeholder="请选择分类类型"
          rules={[
            { required: true, message: '请选择分类类型' }
          ]}
          convertValue={(val) => val !== undefined && val.toString()}
        ></ProFormSelect>
        <ProFormSelect
          label="状态"
          name="status"
          valueEnum={statusValueEnum}
          placeholder="请选择分类状态"
          convertValue={(val) => val !== undefined && val.toString()}
        ></ProFormSelect>
      </ModalForm>
    }
  </PageContainer>
}

export default CategoryList
