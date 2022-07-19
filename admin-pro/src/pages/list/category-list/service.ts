import { request } from 'umi'
import { TableListParams, TableListItem } from './data'

/** 获取用户列表 POST /api/category/list */
export function getCategoryList (params: TableListParams, options?: { [key: string]: any }) {
  return request<TableListItem[]>('/api/category/list', {
    method: 'GET',
    params,
    ...(options || {}),
  })
}

/** 新建/更新用户 POST /api/category/save */
export function categorySave (data: TableListItem, options?: { [key: string]: any }) {
  return request('/api/category/save', {
    method: 'POST',
    data,
    ...(options || {})
  })
}
