import type { ExtendableOptions } from '../../../../types'
import type { CompositeSubRequest } from '../../types'
import { SALESFORCE_REST_API_VERSION } from '../../../../constants'

import type { Got } from 'got'

export function makeCreateCompositeSubRequestDeleteSObject({ gotInstance }: { gotInstance: Got }) {
    /**
     * Creates a composite sub request for deleting a record of a specific Salesforce object.
     *
     * Implements this api:
     * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_delete_record.htm
     *
     * @param {string} referenceId - The reference ID specified in the subrequest.
     * @param {string} sObjectName - The name of the Salesforce object to delete a record for.
     * @param {string} recordId - The ID of the record that will be deleted.
     * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
     * @returns {Promise<CompositeSubRequest>} A Promise that resolves to the result of the delete operation.
     */
    return function createCompositeSubRequestDeleteSObject({
        referenceId,
        sObjectName,
        recordId,
        extendOptions = {},
    }: {
        referenceId: string
        sObjectName: string
        recordId: string
        extendOptions?: ExtendableOptions
    }): CompositeSubRequest {
        const got = gotInstance.extend(extendOptions)
        return {
            httpHeaders: { ...got.defaults.options.headers, 'content-type': 'application/json' },
            method: 'DELETE',
            referenceId,
            url: `/services/data/${SALESFORCE_REST_API_VERSION}/sobjects/${sObjectName}/${recordId}`,
        }
    }
}
