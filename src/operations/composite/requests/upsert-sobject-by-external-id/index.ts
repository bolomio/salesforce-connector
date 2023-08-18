import type { ExtendableOptions } from '../../../../types'
import type { CompositeSubRequest } from '../../types'
import { SALESFORCE_REST_API_VERSION } from '../../../../constants'

import type { Got } from 'got'

export function makeCreateCompositeSubRequestUpsertSObjectByExternalId({
    gotInstance,
}: {
    gotInstance: Got
}) {
    /**
     * Creates a composite sub request for inserting or updating (Upserting) a Record Using an External ID
     *
     * Implements this api:
     * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_upsert.htm
     * @param {string} referenceId - The reference ID specified in the subrequest. This property lets you easily associate subrequests with their results.
     * @param {string} sObjectName - The name of the Salesforce object to create or update a record for.
     * @param {string} sObjectFieldName - The field on the sObject where the external id is stored.
     * @param {string} externalId - The external id used on the upsert.
     * @param {Record<string, unknown>} record - The data for the record.
     * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
     * @returns {Promise<CompositeSubRequest>} A Promise that resolves to the result of the create operation.
     */
    return function createCompositeSubRequestUpsertSObjectByExternalId({
        referenceId,
        sObjectName,
        sObjectFieldName,
        externalId,
        record,
        extendOptions = {},
    }: {
        referenceId: string
        sObjectName: string
        sObjectFieldName: string
        externalId: string
        record: Record<string, unknown>
        extendOptions?: ExtendableOptions
    }): CompositeSubRequest {
        const got = gotInstance.extend(extendOptions)
        return {
            body: record,
            httpHeaders: { ...got.defaults.options.headers, 'content-type': 'application/json' },
            method: 'PATCH',
            referenceId,
            url: `services/data/${SALESFORCE_REST_API_VERSION}/sobjects/${sObjectName}/${sObjectFieldName}/${externalId}`,
        }
    }
}
