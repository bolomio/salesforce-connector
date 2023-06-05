import type { Headers, Hooks, NormalizedOptions, RequiredRetryOptions } from 'got'

/**
 * Configurations for the Salesforce Connector.
 */
export type Options = {
    /**
     * The base URL of the Salesforce instance.
     */
    baseUrl: string

    /**
     * Optional headers to include in requests to the Salesforce API.
     */
    headers?: Headers

    /**
     * The timeout duration for requests to the Salesforce API.
     */
    timeout?: NormalizedOptions['timeout']

    /**
     * Retry options for failed requests to the Salesforce API.
     */
    retry?: RequiredRetryOptions

    /**
     * Hooks to customize the behavior of requests to the Salesforce API.
     */
    hooks?: Hooks
}

export type OptionsWithDefaultAuth = Options & { accessToken: string }

export type ConnectorOptions = OptionsWithDefaultAuth | Options

/**
 * Represents a queried Salesforce object.
 * It includes the standard attributes of the object, such as type and URL,
 * along with additional custom attributes of type TSObject.
 *
 * @template TSObject - The type of additional custom attributes for the Salesforce object.
 */
export type QueriedSObject<TSObject = unknown> = {
    attributes: {
        type: string
        url: string
    }
    Id: string
    [k: string]: unknown
} & TSObject

/**
 * Configuration options that can be extended for the HTTP request.
 */
export interface ExtendableOptions {
    /**
     * Configuration options for retrying failed requests.
     */
    retry?: RequiredRetryOptions

    /**
     * Hooks to modify the behavior of the HTTP request.
     */
    hooks?: Hooks
}
