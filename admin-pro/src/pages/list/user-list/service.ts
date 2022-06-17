import { request } from 'umi'
import { TableListParams, TableListData } from './data'

/** 获取用户列表 POST /api/user/pageList */
export async function getUserPageList(data: TableListParams, options?: { [key: string]: any }) {
  return request<TableListData>('/api/user/pageList', {
    method: 'POST',
    data,
    ...(options || {})
  })
}
