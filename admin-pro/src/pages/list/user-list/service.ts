import { request } from 'umi'
import { TableListParams, TableListData, TableListItem } from './data'

/** 获取用户列表 POST /api/user/pageList */
export async function getUserPageList(data: TableListParams, options?: { [key: string]: any }) {
  return request<TableListData>('/api/user/pageList', {
    method: 'POST',
    data,
    ...(options || {})
  })
}

export async function userSave(data: TableListItem, options?: { [key: string]: any }) {
  return request<boolean>('/api/user/save', {
    method: 'post',
    data,
    ...(options || {})
  })
}
