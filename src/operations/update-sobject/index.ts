import { SALESFORCE_REST_API_VERSION } from '../../constants'
import type { ExtendableOptions } from '../../types'

import type { Got, Options } from 'got'

export function makeUpdateSObject({ gotInstance }: { gotInstance: Got }) {
    /**
     * Updates a record of a specific Salesforce object using the provided data.
     *
     * Implements this api:
     * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_update_fields.htm
     * @param {string} sObjectName - The name of the Salesforce object to update a record for.
     * @param {string} recordId - The ID of the record that will be updated.
     * @param {Record<string, unknown>} record - The data for the record.
     * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
     * @returns {Promise<void>} No returns for successful operations, as Salesforce returns 204 - No Content.
     */
    return async function updateSObject({
        sObjectName,
        recordId,
        record,
        extendOptions = {},
    }: {
        sObjectName: string
        recordId: string
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
            `services/data/${SALESFORCE_REST_API_VERSION}/sobjects/${sObjectName}/${recordId}`,
            options
        )
    }
}
