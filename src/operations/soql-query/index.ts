import type { SoqlQueryResult } from './types'

import { SALESFORCE_REST_API_VERSION } from '../../constants'
import type { ExtendableOptions } from '../../types'

import type { Got, Options, Response } from 'got'

export function makeSoqlQuery({ gotInstance }: { gotInstance: Got }) {
    /**
     * Executes a SOQL (Salesforce Object Query Language) query and retrieves the results.
     * For more information regarding soql:
     * @link https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm
     * Implements this api:
     * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_query.htm?q=soql
     *
     * @param {string} queryStatement - The SOQL query statement to execute.
     * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
     * @returns {Promise<SoqlQueryResult<TSObject>>} A Promise that resolves to the result of the SOQL query.
     * The result is of type SoqlQueryResult<TSObject>, where TSObject is the type of the Salesforce object being queried.
     */
    return async function soqlQuery<TSObject = unknown>({
        queryStatement,
        extendOptions = {},
    }: {
        queryStatement: string
        extendOptions?: ExtendableOptions
    }): Promise<SoqlQueryResult<TSObject>> {
        const got = gotInstance.extend(extendOptions)

        const options: Options = {
            headers: {
                'content-type': 'application/json',
            },
            responseType: 'json',
        }

        const response = (await got.get(
            `services/data/${SALESFORCE_REST_API_VERSION}/query/?q=${queryStatement}`,
            options
        )) as Response<SoqlQueryResult<TSObject>>

        return response.body
    }
}
