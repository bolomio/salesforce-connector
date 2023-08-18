/**
 * Represents the result of a composite request, containing an array of subrequest results.
 */
export type CompositeResult = {
    /**
     * Collection of subrequest results.
     *
     * @type {CompositeSubRequestResult[]}
     */
    compositeResponse: CompositeSubRequestResult[]
}

/**
 * Represents the result of a subrequest within a composite request.
 */
export type CompositeSubRequestResult = {
    /**
     * The response body of this subrequest. The type depends on the response type of the subrequest.
     * See the documentation for the subrequest resource for more information.
     *
     * If the subrequest returns an error, the body includes the error code and message.
     * For more details on error responses, see Status Codes and Error Responses.
     *
     * @type {unknown}
     */
    body: unknown

    /**
     * Response headers and their values for this subrequest.
     *
     * @type {Record<string, string>}
     */
    httpHeaders: Record<string, string>

    /**
     * The HTTP status code for this subrequest.
     *
     * @type {number}
     */
    httpStatusCode: number

    /**
     * The reference ID specified in the subrequest. This property lets you easily associate subrequests
     * with their results.
     *
     * @type {string}
     */
    referenceId: string
}

/**
 * Represents a subrequest within a composite request.
 */
export type CompositeSubRequest = {
    /**
     * The input body for the subrequest. The type depends on the request specified in the `url` property.
     *
     * @type {unknown}
     * @optional
     */
    body?: unknown

    /**
     * Request headers and their values to include with the subrequest. You can include any header supported by
     * the requested resource except for Accept, Authorization, and Content-Type. Subrequests inherit these three
     * header values from the top-level request.
     *
     * @type {Record<string, string>}
     * @optional
     */
    httpHeaders?: Record<string, string>

    /**
     * The method to use with the requested resource. Possible values are POST, PUT, PATCH, GET, and DELETE (case-sensitive).
     *
     * @type {string}
     * @required
     */
    method: string

    /**
     * Reference ID that maps to the subrequest’s response and can be used to reference the response in later subrequests.
     * You can reference the referenceId in either the body or URL of a subrequest.
     *
     * Use this syntax to include a reference: @{referenceId.FieldName}.
     *
     * You can use . operator to reference a field on a JSON object in the response, and [] operator to index a JSON collection
     * in the response. You can use each operator recursively as long as it makes sense in the context of the response.
     *
     * @type {string}
     * @required
     */
    referenceId: string

    /**
     * The resource to request. The URL can include any query string parameters that the subrequest supports.
     * The query string must be URL-encoded.
     *
     * @type {string}
     * @required
     */
    url: string
}
