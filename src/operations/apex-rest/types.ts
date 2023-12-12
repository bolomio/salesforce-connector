import type { ExtendableOptions } from '../../types'

import type { Headers, Method, ResponseType } from 'got'

/**
 * Represents the configurations required to execute an apex rest http request.
 */
export type ApexRestRequestConfiguration = {
    /**
     * Returns or sets everything after the host in the HTTP request string.
     * For example, if the request string is https://instance.salesforce.com/services/apexrest/Account/ then the requestURI is /Account/.
     *
     * @type {string}
     */
    requestURI: string
    /**
     * The Http Method to be used in the http request.
     *
     * @type {Method}
     */
    method: Method
    /**
     * The JSON to be passed in the body of the request.
     *
     * @type Record<string, unknown>
     * @optional
     */
    json?: Record<string, unknown>
    /**
     * Extendable Options from got with inclusion of custom headers.
     *
     * @type ExtendableOptions & { headers?: Headers }
     * @optional
     */
    extendOptions?: ExtendableOptions & { headers?: Headers }
    /**
     * The supported Response Type, used to parse response body.
     *
     * @type ResponseType
     * @optional
     */
    responseType?: ResponseType
}
