import React, { useRef, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form'
import { Button } from 'antd'
import type { TableListItem} from './data'
import { categoryColumnValueEnum, categoryValueEnum, statusColumnValueEnum, statusValueEnum } from '../../../utils/enum'
import { getCategoryList } from './service'

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
              console.log(dom, entity, index, action, schema)
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
   />
   {
    !modalVisible ? null : <ModalForm
      title={currentRow && currentRow.id ? '编辑' : '新增'}
      visible={modalVisible}
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
        console.log('onFinish:', values)
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
        convertValue={(val) => val.toString()}
      ></ProFormSelect>
      <ProFormSelect
        label="状态"
        name="status"
        valueEnum={statusValueEnum}
        placeholder="请选择分类状态"
        convertValue={(val) => val.toString()}
      ></ProFormSelect>
    </ModalForm>
   }
  </PageContainer>
}

export default CategoryList
