import { tableConfig } from './config'
import * as dynamo from './dynamo'
import { KvClient } from './types'

interface Props {
  tableName: string
  model: string
}

const kvClient = (props: Props) => {
  const fns: KvClient = {
    check: () => dynamo.check(props.tableName),
    get: (id) => dynamo.get(props.tableName, id, props.model),
    insert: (data) => dynamo.insert(props.tableName, data, props.model),
    scanAll: () => dynamo.scanAll(props.tableName, props.model),
    delete: (id) => dynamo.remove(props.tableName, id),
    update: (id, data) => dynamo.update(props.tableName, id, data, props.model),
  }

  return fns
}

export const sst = { tableConfig }
export const kvCommands = dynamo
export default kvClient
