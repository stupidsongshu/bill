import React from 'react'

export type TableListItem = {
  id: React.Key;
  name: string;
  type: number;
  status: number;
  create_time: string;
  update_time: string;
}

export type TableListParams = {
  id?: React.Key;
  name?: string;
  type?: number;
  status?: number;
}
