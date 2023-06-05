import type { QueryConfiguration, SoslQueryResult } from './types'

import { SALESFORCE_REST_API_VERSION } from '../../constants'
import type { ExtendableOptions } from '../../types'

import type { Got, Options, Response } from 'got'

export function makeSoslQuery({ gotInstance }: { gotInstance: Got }) {
    /**
     * Executes a SOSL (Salesforce Object Search Language) query and retrieves the results.
     * For more information regarding sosl:
     * @link https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_sosl.htm
     * Implements this api:
     * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_search_parameterized_post.htm
     *
     * @param {QueryConfiguration} queryConfiguration - The configuration object for the SOSL query.
     * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
     * @returns {Promise<SoslQueryResult<TSObject>>} A Promise that resolves to the result of the SOSL query.
     * The result is of type SoslQueryResult<TSObject>, where TSObject is the type of the Salesforce object being queried.
     */
    return async function soslQuery<TSObject = unknown>({
        queryConfiguration,
        extendOptions = {},
    }: {
        queryConfiguration: QueryConfiguration
        extendOptions?: ExtendableOptions
    }): Promise<SoslQueryResult<TSObject>> {
        const got = gotInstance.extend(extendOptions)

        const options: Options = {
            json: queryConfiguration,
            headers: {
                'content-type': 'application/json',
            },
            responseType: 'json',
        }

        const response = (await got.post(
            `services/data/${SALESFORCE_REST_API_VERSION}/parameterizedSearch/`,
            options
        )) as Response<SoslQueryResult<TSObject>>

        return response.body
    }
}
