import { makeCreateSObject } from './operations/create-sobject'
import type { ConnectorOptions } from './types'
import { makeSoqlQuery } from './operations/soql-query'
import { makeSoslQuery } from './operations/sosl-query'
import { makeUpdateSObject } from './operations/update-sobject'
import { makeUpsertSObjectByExternalId } from './operations/upsert-sobject-by-external-id'

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
        headers: {
            // if access token has been passed, use it in the header
            ...('accessToken' in options && options.accessToken
                ? { Authorization: `Bearer ${options.accessToken}` }
                : {}),
            ...options.headers,
        },
        timeout: options.timeout,
        retry: options.retry,
        hooks: options.hooks,
    })

    return {
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
    }
}

export type SalesforceConnector = ReturnType<typeof makeSalesforceConnector>
