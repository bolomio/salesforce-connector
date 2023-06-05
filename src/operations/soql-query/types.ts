import type { QueriedSObject } from '../../types'

export interface SoqlQueryResult<TSObject = unknown> {
    records: QueriedSObject<TSObject>[]
    done: boolean
    totalSize: number
}
