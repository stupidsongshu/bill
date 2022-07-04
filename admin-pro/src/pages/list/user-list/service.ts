import { request } from 'umi'
import { TableListParams, TableListData, TableListItem } from './data'

/** 获取用户列表 POST /api/user/pageList */
export async function getUserPageList(params: TableListParams, options?: { [key: string]: any }) {
  console.log('getUserPageList req:', params)
  const res = await request<TableListData>('/api/user/pageList', {
    method: 'GET',
    params,
    ...(options || {})
  })
  console.log('getUserPageList res:', res)
  return res
}

/** 新建用户 POST /api/user/save */
export async function addUser(data: TableListItem, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/user/save', {
    method: 'POST',
    data,
    ...(options || {})
  })
}

/** 更新用户 PUT /api/user/save */
export async function updateUser(data: TableListItem, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/user/save', {
    method: 'PUT',
    data,
    ...(options || {})
  })
}
