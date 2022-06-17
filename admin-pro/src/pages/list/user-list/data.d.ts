export type TableListItem = {
  id: number;
  name: string;
  password: string;
  phone: string;
  email: string;
  status: number;
  create_time: string;
  update_time: string;
}

export type TableListPagination = {
  // currentPage: number;
  // pageSize: number;
  // totalCount: number;
  // totalPage: number;

  total: number;
  current: number;
  pageSize: number;
}

// export type TableListData = TableListPagination & {
//   list?: TableListItem[];
// }

// export type TableListData = {
//   list?: TableListItem[];
//   pagination: TableListPagination;
// }

export type TableListData = {
  // code: number;
  // message: string;
  // data?: TableListPagination & {
  //   list?: TableListItem[];
  // };

  data: TableListItem[];
  /** 列表的内容总数 */
  total?: number;
  status?: boolean;
}

export type TableListParams = {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  status?: number;
  currentPage?: number;
  pageSize?: number;
}
