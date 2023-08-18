import type { ExtendableOptions } from '../../../../types'
import type { CompositeSubRequest } from '../../types'
import { SALESFORCE_REST_API_VERSION } from '../../../../constants'

import type { Got } from 'got'

export function makeCreateCompositeSubRequestCreateSObject({ gotInstance }: { gotInstance: Got }) {
    /**
     * Creates a composite sub request for creating a new record of a specific Salesforce object using the provided data.
     *
     * Implements this api:
     * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_sobject_create.htm
     *
     * @param {string} referenceId - The reference ID specified in the subrequest. This property lets you easily associate subrequests with their results.
     * @param {string} sObjectName - The name of the Salesforce object to create a record for.
     * @param {Record<string, unknown>} record - The data for the new record.
     * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
     * @returns {Promise<CompositeSubRequest>} A Promise that resolves to the result of the create operation.
     */
    return function createCompositeSubRequestCreateSObject({
        referenceId,
        sObjectName,
        record,
        extendOptions = {},
    }: {
        referenceId: string
        sObjectName: string
        record: Record<string, unknown>
        extendOptions?: ExtendableOptions
    }): CompositeSubRequest {
        const got = gotInstance.extend(extendOptions)
        return {
            body: record,
            httpHeaders: { ...got.defaults.options.headers, 'content-type': 'application/json' },
            method: 'POST',
            referenceId,
            url: `/services/data/${SALESFORCE_REST_API_VERSION}/sobjects/${sObjectName}`,
        }
    }
}
