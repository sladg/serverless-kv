import { BaseDataType } from './types'

export const parseFromJson = <T extends BaseDataType>(data: string): T => {
  try {
    return JSON.parse(data)
  } catch (e) {
    console.error(e)
    throw new Error('Failed to parse data.')
  }
}

export const stringifyToJson = (data: object): string => {
  try {
    return JSON.stringify(data)
  } catch (e) {
    console.error(e)
    throw new Error('Failed to stringify data.')
  }
}
