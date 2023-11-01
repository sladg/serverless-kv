import type { TableProps } from 'sst/constructs'

type SstPartialConfig = Pick<TableProps, 'fields' | 'primaryIndex'>

export const pkField = 'id'
export const skField = 'model'
export const dataField = 'val'

export const defaultModelName = 'default'

export const tableConfig: SstPartialConfig = {
  fields: {
    [pkField]: 'string' as const,
    [skField]: 'string' as const,
    [dataField]: 'string' as const,
  },
  primaryIndex: {
    partitionKey: pkField,
    sortKey: skField,
  },
}
