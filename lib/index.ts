import { tableConfig } from './config'
import { check, get, insert, remove, scanAll, update } from './dynamo'
import { BaseDataType, KvClient } from './types'

interface Props {
  tableName: string
  model: string
}

export const kvClient = <T extends BaseDataType>(props: Props) => {
  const fns: KvClient<T> = {
    check: () => check(props.tableName),
    get: (id) => get(props.tableName, id, props.model),
    insert: (data) => insert(props.tableName, data, props.model),
    scanAll: () => scanAll(props.tableName, props.model),
    delete: (id) => remove(props.tableName, id),
    update: (id, data) => update(props.tableName, id, data, props.model),
  }

  return fns
}

export const sst = { tableConfig }
export const kvCmd = { check, get, insert, remove, scanAll, update }
export default kvClient
