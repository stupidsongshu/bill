import { request } from 'umi'
import { TableListParams, TableListItem } from './data'

export function getCategoryList (params: TableListParams, options?: { [key: string]: any }) {
  return request<TableListItem[]>('/api/category/list', {
    method: 'GET',
    params,
    ...(options || {}),
  })
}
