type ValueEnum = {
  [key: string]: {
    text: string;
    status: 'Error' | 'Success';
  }
}

export function getSelectValueEnum(valueEnum: ValueEnum) {
  return Object.keys(valueEnum).reduce((prev, curr) => {
    prev[curr] = valueEnum[curr].text
    return prev
  }, {})
}

export const statusEnum = {
  0: {
    text: '无效',
    status: 'Error'
  },
  1: {
    text: '正常',
    status: 'Success'
  }
}
