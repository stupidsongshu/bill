type ValueEnum = {
  [key: string]: {
    text: string;
    status: 'Error' | 'Success';
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
