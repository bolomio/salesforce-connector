import { SALESFORCE_REST_API_VERSION } from '../../constants'
import type { ExtendableOptions } from '../../types'

import type { Got, Options } from 'got'

export function makeUpdateSObject({ gotInstance }: { gotInstance: Got }) {
    /**
     * Insert or Update (Upsert) a Record Using an External ID
     *
     * Implements this api:
     * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_upsert.htm
     * @param {string} sObjectName - The name of the Salesforce object to create or update a record for.
     * @param {string} sObjectField - The field on the sObject where the external id is stored.
     * @param {string} externalId - The external id used on the upsert.
     * @param {Record<string, unknown>} record - The data for the record.
     * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
     * @returns {Promise<UpsertSObjectResult>} A Promise that resolves to the result of the upsert operation.
     */
    return async function updateSObject({
        sObjectName,
        sObjectId,
        record,
        extendOptions = {},
    }: {
        sObjectName: string
        sObjectId: string
        record: Record<string, unknown>
        extendOptions?: ExtendableOptions
    }): Promise<void> {
        const got = gotInstance.extend(extendOptions)

        const options: Options = {
            json: record,
            headers: {
                'content-type': 'application/json',
            },
            responseType: 'json',
        }

        await got.patch(
            `services/data/${SALESFORCE_REST_API_VERSION}/sobjects/${sObjectName}/${sObjectId}`,
            options
        )
    }
}
