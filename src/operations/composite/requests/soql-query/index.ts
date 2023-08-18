import type { ExtendableOptions } from '../../../../types'
import type { CompositeSubRequest } from '../../types'
import { SALESFORCE_REST_API_VERSION } from '../../../../constants'

import type { Got } from 'got'

export function makeCreateCompositeSubRequestSoqlQuery({ gotInstance }: { gotInstance: Got }) {
    /**
     * Creates a composite sub request for executing a SOQL (Salesforce Object Query Language) query and retrieves the results.
     * For more information regarding soql:
     * @link https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm
     * Implements this api:
     * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_query.htm?q=soql
     *
     * @param {string} referenceId - The reference ID specified in the subrequest. This property lets you easily associate subrequests with their results.
     * @param {string} queryStatement - The SOQL query statement to execute.
     * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
     * @returns {Promise<CompositeSubRequest>} A Promise that resolves to the result of the create operation.
     */
    return function createCompositeSubRequestSoqlQuery({
        referenceId,
        queryStatement,
        extendOptions = {},
    }: {
        referenceId: string
        queryStatement: string
        extendOptions?: ExtendableOptions
    }): CompositeSubRequest {
        const got = gotInstance.extend(extendOptions)
        return {
            httpHeaders: { ...got.defaults.options.headers, 'content-type': 'application/json' },
            method: 'GET',
            referenceId,
            url: `/services/data/${SALESFORCE_REST_API_VERSION}/query/?q=${queryStatement}`,
        }
    }
}
