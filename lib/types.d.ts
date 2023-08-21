export type BaseDataType = {
  id: string
}

export type DeleteDataType = {
  id: string
}

export type KvClient = {
  check: () => Promise<boolean>
  get: <T extends BaseDataType>(id: string) => Promise<T>
  insert: <T extends BaseDataType>(data: T) => Promise<T>
  update: <T extends BaseDataType>(id: string, data: T) => Promise<T>
  delete: (id: string) => Promise<DeleteDataType>
  scanAll: <T extends BaseDataType>() => Promise<T[]>
}
