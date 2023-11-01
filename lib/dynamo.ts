import {
  DeleteItemCommand,
  DeleteItemCommandInput,
  DescribeTableCommand,
  DescribeTableCommandInput,
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  ScanCommand,
  ScanCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb'

import { dataField, defaultModelName, pkField, skField } from './config'
import { BaseDataType } from './types'
import { parseFromJson, stringifyFromObject } from './utils'

const client = new DynamoDBClient({
  //
})

export const check = async (tableName: string) => {
  const params: DescribeTableCommandInput = {
    TableName: tableName,
  }

  try {
    await client.send(new DescribeTableCommand(params))
    return true
  } catch (err) {
    return false
  }
}

export const get = async <T extends BaseDataType>(
  tableName: string,
  id: string,
  model: string = defaultModelName,
): Promise<T | null> => {
  const params: GetItemCommandInput = {
    TableName: tableName,
    Key: {
      [pkField]: { S: id },
      ...(model && { [skField]: { S: model } }),
    },
  }

  const result = await client.send(new GetItemCommand(params))

  const data = result.Item?.data.S
  return !data ? null : parseFromJson<T>(data)
}

export const scanAll = async <T extends BaseDataType>(
  tableName: string,
  model: string = defaultModelName,
): Promise<T[]> => {
  const params: ScanCommandInput = {
    TableName: tableName,
    ...(model && {
      FilterExpression: '#sk = :sk',
      ExpressionAttributeNames: { '#sk': skField },
      ExpressionAttributeValues: { ':sk': { S: model } },
    }),
  }

  const result = await client.send(new ScanCommand(params))
  return result.Items!.map((item) => parseFromJson(item.data.S!))
}

export const insert = async <T extends BaseDataType>(
  tableName: string,
  data: T,
  model: string = defaultModelName,
): Promise<T> => {
  // When putting new item, it does not return the item itself. Allowed are only ALL_OLD or NONE
  // See: https://stackoverflow.com/a/39728141/14564826
  const params: PutItemCommandInput = {
    TableName: tableName,
    Item: {
      [pkField]: { S: data.id },
      [skField]: { S: model },
      [dataField]: { S: stringifyFromObject(data) },
    },
  }

  await client.send(new PutItemCommand(params))
  const result = await get<T>(tableName, data.id, model)
  if (!result) {
    throw new Error('Item inserted, but not found')
  }

  return result
}

export const update = async <T extends BaseDataType>(
  tableName: string,
  id: string,
  data: T,
  model: string = defaultModelName,
): Promise<T> => {
  const params: UpdateItemCommandInput = {
    TableName: tableName,
    Key: {
      [pkField]: { S: id },
      ...(model && { [skField]: { S: model } }),
    },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: `set ${dataField} = :d`,
    ExpressionAttributeValues: {
      ':d': {
        S: stringifyFromObject({ ...data, id }),
      },
    },
  }

  const result = await client.send(new UpdateItemCommand(params))
  return parseFromJson<T>(result.Attributes?.data.S!)
}

export const remove = async (tableName: string, id: string) => {
  const params: DeleteItemCommandInput = {
    TableName: tableName,
    Key: {
      [pkField]: { S: id },
    },
  }

  await client.send(new DeleteItemCommand(params))
  return { id }
}
