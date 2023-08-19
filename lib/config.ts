import type { TableProps } from 'sst/constructs'

type SstPartialConfig = Pick<TableProps, 'fields' | 'primaryIndex'>

export const pkField = 'id'
export const skField = 'model'
export const dataField = 'data'

export const sstTableConfig: SstPartialConfig = {
  fields: {
    [pkField]: 'string',
    [skField]: 'string',
    [dataField]: 'string',
  },
  primaryIndex: {
    partitionKey: pkField,
    sortKey: skField,
  },
}
