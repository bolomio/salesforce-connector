import type { CreateSObjectResult } from './types'

import { SALESFORCE_REST_API_VERSION } from '../../constants'
import type { ExtendableOptions } from '../../types'

import type { Got, Options, Response } from 'got'

export function makeCreateSObject({ gotInstance }: { gotInstance: Got }) {
    /**
     * Creates a new record of a specific Salesforce object using the provided data.
     *
     * Implements this api:
     * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_sobject_create.htm
     *
     * @param {string} sObjectName - The name of the Salesforce object to create a record for.
     * @param {Record<string, unknown>} record - The data for the new record.
     * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
     * @returns {Promise<CreateSObjectResult>} A Promise that resolves to the result of the create operation.
     */
    return async function createSObject({
        sObjectName,
        record,
        extendOptions = {},
    }: {
        sObjectName: string
        record: Record<string, unknown>
        extendOptions?: ExtendableOptions
    }): Promise<CreateSObjectResult> {
        const got = gotInstance.extend(extendOptions)

        const options: Options = {
            json: record,
            headers: {
                'content-type': 'application/json',
            },
            responseType: 'json',
        }

        const response = (await got.post(
            `services/data/${SALESFORCE_REST_API_VERSION}/sobjects/${sObjectName}`,
            options
        )) as Response<CreateSObjectResult>

        return response.body
    }
}
