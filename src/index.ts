import { makeCreateSObject } from './operations/create-sobject'
import type { ConnectorOptions } from './types'
import { makeSoqlQuery } from './operations/soql-query'
import { makeSoslQuery } from './operations/sosl-query'
import { makeUpdateSObject } from './operations/update-sobject'
import { makeUpsertSObjectByExternalId } from './operations/upsert-sobject-by-external-id'
import { makeCreateCompositeSubRequestCreateSObject } from './operations/composite/requests/create-sobject'
import { makeComposite } from './operations/composite'
import { makeCreateCompositeSubRequestUpdateSObject } from './operations/composite/requests/update-sobject'
import { makeCreateCompositeSubRequestUpsertSObjectByExternalId } from './operations/composite/requests/upsert-sobject-by-external-id'
import { makeCreateCompositeSubRequestSoqlQuery } from './operations/composite/requests/soql-query'
import { makeApexRest } from './operations/apex-rest'

import type { Got } from 'got'
import got from 'got'

/**
 * Create a Salesforce Connector that provides functions to interact with the standard salesforce api.
 *
 * @param {Options} options - Configurations for the connector.
 * @returns {SalesforceConnector} An object with salesforce api functions.
 */
export function makeSalesforceConnector(options: ConnectorOptions) {
    const gotInstance: Got = got.extend({
        prefixUrl: options.baseUrl,
        headers: options.headers,
        timeout: options.timeout,
        retry: options.retry,
        hooks: {
            // if as access token was passed - set-up hook on before request to use in authorization header
            ...('accessToken' in options && options.accessToken
                ? {
                      beforeRequest: [
                          (hookOptions) => {
                              hookOptions.headers['Authorization'] = `Bearer ${options.accessToken}`
                          },
                      ],
                  }
                : {}),
            ...options.hooks,
        },
    })

    return {
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
        composite: makeComposite({ gotInstance }),
        /**
         * Predefined sub requests which are ready to be used with the composite api
         */
        compositeRequests: {
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
            soqlQuery: makeCreateCompositeSubRequestSoqlQuery({ gotInstance }),
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
            createSObject: makeCreateCompositeSubRequestCreateSObject({ gotInstance }),
            /**
             * Creates a composite sub request for updating a record of a specific Salesforce object using the provided data.
             *
             * Implements this api:
             * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_update_fields.htm
             *
             * @param {string} referenceId - The reference ID specified in the subrequest. This property lets you easily associate subrequests with their results.
             * @param {string} sObjectName - The name of the Salesforce object to update a record for.
             * @param {string} recordId - The ID of the record that will be updated.
             * @param {Record<string, unknown>} record - The data for the record.
             * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
             * @returns {Promise<void>} No returns for successful operations, as Salesforce returns 204 - No Content.
             */
            updateSObject: makeCreateCompositeSubRequestUpdateSObject({ gotInstance }),
            /**
             * Creates a composite sub request for inserting or updating (Upserting) a Record Using an External ID
             *
             * Implements this api:
             * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_upsert.htm
             * @param {string} referenceId - The reference ID specified in the subrequest. This property lets you easily associate subrequests with their results.
             * @param {string} sObjectName - The name of the Salesforce object to create or update a record for.
             * @param {string} sObjectFieldName - The field on the sObject where the external id is stored.
             * @param {string} externalId - The external id used on the upsert.
             * @param {Record<string, unknown>} record - The data for the record.
             * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
             * @returns {Promise<CompositeSubRequest>} A Promise that resolves to the result of the create operation.
             */
            upsertSObjectByExternalId: makeCreateCompositeSubRequestUpsertSObjectByExternalId({
                gotInstance,
            }),
        },
        /**
         * Creates a new record of a specific Salesforce object using the provided data.
         *
         * Implements this api:
         * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_sobject_create.htm
         * @param {string} sObjectName - The name of the Salesforce object to create a record for.
         * @param {Record<string, unknown>} record - The data for the new record.
         * @param {ExtendableOptions} - Additional options to extend the HTTP request.
         * @returns {Promise<CreateSObjectResult>} A Promise that resolves to the result of the create operation.
         */
        createSObject: makeCreateSObject({ gotInstance }),
        /**
         * Updates a record of a specific Salesforce object using the provided data.
         *
         * Implements this api:
         * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_update_fields.htm
         * @param {string} sObjectName - The name of the Salesforce object to update a record for.
         * @param {string} recordId - The ID of the record that will be updated.
         * @param {Record<string, unknown>} record - The data for the record.
         * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
         * @returns {Promise<void>} No returns for successful operations, as Salesforce returns 204 - No Content.
         */
        updateSObject: makeUpdateSObject({ gotInstance }),
        /**
         * Insert or Update (Upsert) a Record Using an External ID
         *
         * Implements this api:
         * @link https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_upsert.htm
         * @param {string} sObjectName - The name of the Salesforce object to create or update a record for.
         * @param {string} sObjectFieldName - The field on the sObject where the external id is stored.
         * @param {string} externalId - The external id used on the upsert.
         * @param {Record<string, unknown>} record - The data for the record.
         * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
         * @returns {Promise<UpsertSObjectResult>} A Promise that resolves to the result of the upsert operation.
         */
        upsertSObjectByExternalId: makeUpsertSObjectByExternalId({ gotInstance }),
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
        soslQuery: makeSoslQuery({ gotInstance }),
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
        soqlQuery: makeSoqlQuery({ gotInstance }),
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
        apexRest: makeApexRest({ gotInstance }),
    }
}

export type SalesforceConnector = ReturnType<typeof makeSalesforceConnector>
