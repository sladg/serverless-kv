import * as dynamoCommands from './dynamo'
import { KvClient } from './types'

interface Props {
  tableName: string
  model?: string
}

const kvClient = async (props: Props) => {
  // Check if table exists.

  const exists = await dynamoCommands.check(props.tableName)
  if (!exists) {
    throw new Error(`Table ${props.tableName} does not exist.`)
  }

  const fns: KvClient = {
    get: (id) => dynamoCommands.get(props.tableName, id, props.model),
    insert: (data) => dynamoCommands.insert(props.tableName, data, props.model),
    scanAll: () => dynamoCommands.scanAll(props.tableName, props.model),
    delete: (id) => dynamoCommands.remove(props.tableName, id),
    update: (id, data) =>
      dynamoCommands.update(props.tableName, id, data, props.model),
  }

  return fns
}

export const kvCommands = dynamoCommands
export default kvClient
