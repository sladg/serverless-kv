export type BaseDataType = {
  id: string
}

export type DeleteDataType = {
  id: string
}

export type KvClient<T extends BaseDataType> = {
  check: () => Promise<boolean>
  get: (id: string) => Promise<T | null>
  insert: (data: T) => Promise<T>
  update: (id: string, data: T) => Promise<T>
  delete: (id: string) => Promise<DeleteDataType>
  scanAll: () => Promise<T[]>
}
