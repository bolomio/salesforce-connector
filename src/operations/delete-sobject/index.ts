import { SALESFORCE_REST_API_VERSION } from '../../constants'
import type { ExtendableOptions } from '../../types'

import type { Got, Options } from 'got'

export function makeDeleteSObject({ gotInstance }: { gotInstance: Got }) {
    /**
     * Deletes a record of a specific Salesforce object using the provided data.
     *
     * Implements this api:
     * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_delete_record.htm
     * @param {string} sObjectName - The name of the Salesforce object to delete a record for.
     * @param {string} recordId - The ID of the record that will be deleted.
     * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
     * @returns {Promise<void>} No returns for successful operations, as Salesforce returns 204 - No Content.
     */
    return async function deleteSObject({
        sObjectName,
        recordId,
        extendOptions = {},
    }: {
        sObjectName: string
        recordId: string
        extendOptions?: ExtendableOptions
    }): Promise<void> {
        const got = gotInstance.extend(extendOptions)

        const options: Options = {
            headers: {
                'content-type': 'application/json',
            },
            responseType: 'json',
        }

        await got.delete(
            `services/data/${SALESFORCE_REST_API_VERSION}/sobjects/${sObjectName}/${recordId}`,
            options
        )
    }
}
