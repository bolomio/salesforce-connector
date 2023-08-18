import type { ExtendableOptions } from '../../../../types'
import type { CompositeSubRequest } from '../../types'
import { SALESFORCE_REST_API_VERSION } from '../../../../constants'

import type { Got } from 'got'

export function makeCreateCompositeSubRequestUpdateSObject({ gotInstance }: { gotInstance: Got }) {
    /**
     * Creates a composite sub request for updating a record of a specific Salesforce object using the provided data.
     *
     * Implements this api:
     * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_update_fields.htm
     *
     * @param {string} referenceId - The reference ID specified in the subrequest. This property lets you easily associate subrequests with their results.
     * @param {string} sObjectName - The name of the Salesforce object to update a record for.
     * @param {string} recordId - The ID of the record that will be updated.
     * @param {Record<string, unknown>} record - The data for the record.
     * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
     * @returns {Promise<CompositeSubRequest>} A Promise that resolves to the result of the create operation.
     */
    return function createCompositeSubRequestUpdateSObject({
        referenceId,
        sObjectName,
        recordId,
        record,
        extendOptions = {},
    }: {
        referenceId: string
        sObjectName: string
        recordId: string
        record: Record<string, unknown>
        extendOptions?: ExtendableOptions
    }): CompositeSubRequest {
        const got = gotInstance.extend(extendOptions)
        return {
            body: record,
            httpHeaders: { ...got.defaults.options.headers, 'content-type': 'application/json' },
            method: 'PATCH',
            referenceId,
            url: `services/data/${SALESFORCE_REST_API_VERSION}/sobjects/${sObjectName}/${recordId}`,
        }
    }
}
