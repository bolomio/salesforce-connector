import type { ApexRestRequestConfiguration } from './types'

import type { Got, Options, Response } from 'got'

export function makeApexRest({ gotInstance }: { gotInstance: Got }) {
    /**
     * Invoke a custom apex rest api.
     *
     * @link For more information regarding apexrest: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_rest.htm
     *
     * @param {ApexRestRequestConfiguration} configuration - configurations required to execute the apex rest call. Note: 'responseType' is set by default to 'json'
     *
     * @returns {Promise<unknown | void>} A Promise that resolves to the result of the apex rest request, depending on the request can return undefined.
     * The result is of type SoqlQueryResult<TSObject>, where TSObject is the type of the Salesforce object being queried.
     */
    return async function apexRest(
        configuration: ApexRestRequestConfiguration
    ): Promise<unknown | void> {
        const got = gotInstance.extend(configuration.extendOptions ?? {})
        const options: Options = {
            method: configuration.method,
            json: configuration.json,
            responseType: configuration.responseType ?? 'json',
        }

        const response: Response = (await got(
            `services/apexrest${configuration.requestURI}`,
            options
        )) as Response

        // if status code equals no content, we should not return a response body
        if (response.statusCode === 204) {
            return
        }

        return response.body
    }
}
