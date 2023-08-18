import type { CompositeSubRequest, CompositeResult } from './types'

import { SALESFORCE_REST_API_VERSION } from '../../constants'
import type { ExtendableOptions } from '../../types'

import type { Got, Options, Response } from 'got'

export function makeComposite({ gotInstance }: { gotInstance: Got }) {
    /**
     * Creates and executes a composite request containing multiple subrequests.
     *
     * Implements this api:
     * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_composite_post.htm
     *
     * @param {boolean} allOrNone - Indicates whether all subrequests should be executed or none in case of failure.
     * @param {boolean} collateSubrequests - Indicates whether to collate the subrequests for better efficiency.
     * @param {CompositeSubRequest[]} compositeRequest - The array of subrequests to be executed in the composite request.
     * @param {ExtendableOptions} [extendOptions] - Additional options to extend the HTTP request.
     * @returns {Promise<CompositeResult>} A Promise that resolves to the result of the composite request.
     */
    return async function composite({
        allOrNone,
        collateSubrequests,
        compositeRequest,
        extendOptions = {},
    }: {
        allOrNone?: boolean
        collateSubrequests?: boolean
        compositeRequest: CompositeSubRequest[]
        extendOptions?: ExtendableOptions
    }): Promise<CompositeResult> {
        const got = gotInstance.extend(extendOptions)

        const options: Options = {
            json: {
                allOrNone,
                collateSubrequests,
                compositeRequest,
            },
            headers: {
                'content-type': 'application/json',
            },
            responseType: 'json',
        }

        const response = (await got.post(
            `services/data/${SALESFORCE_REST_API_VERSION}/composite/`,
            options
        )) as Response<CompositeResult>

        return response.body
    }
}
