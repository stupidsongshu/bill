type ValueEnum = {
  [key: string]: {
    text: string;
    status: 'Default' | 'Success' | 'Error';
  }
}

function getStatusEnum(valueEnum: ValueEnum) {
  return Object.keys(valueEnum).reduce((prev, curr) => {
    prev[curr] = valueEnum[curr].text
    return prev
  }, {})
}

export const statusColumnValueEnum: ValueEnum = {
  0: {
    text: '无效',
    status: 'Error'
  },
  1: {
    text: '正常',
    status: 'Success'
  }
}
export const statusValueEnum = getStatusEnum(statusColumnValueEnum)

export const categoryColumnValueEnum: ValueEnum = {
  0: {
    text: '不计入收支',
    status: 'Default'
  },
  1: {
    text: '支出',
    status: 'Error'
  },
  2: {
    text: '收入',
    status: 'Success'
  }
}
export const categoryValueEnum = getStatusEnum(categoryColumnValueEnum)
