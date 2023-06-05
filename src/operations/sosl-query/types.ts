import type { DataCategoryOperator, QueryScope } from './constants'

import type { QueriedSObject } from '../../types'

export interface SoslQueryResult<TSObject = unknown> {
    searchRecords: QueriedSObject<TSObject>[]
}

export interface DataCategoriesFilter {
    /**
     * The name of the data category group to filter by.
     */
    groupName: string
    operator: DataCategoryOperator
    /**
     * The name of the categories to filter by.
     */
    categories: string[]
}

export interface SObjectsFilter {
    /**
     * Array of one or more fields to return in the response for the sobject.
     */
    fields?: string[]
    /**
     * Specify the maximum number of rows that are returned for the sobject.
     */
    limit?: number
    /**
     * Name of the sobject to return in the response.
     */
    name: string
    /**
     * Controls the field order of the results using the following syntax "orderBy" : "field {ASC|DESC} [NULLS_{FIRST|LAST}]"
     */
    orderBy?: string
    /**
     * Filter search results for this object by specific field values.
     */
    where?: string
}

export interface QueryConfiguration {
    /**
     * A search string that is properly URL-encoded.
     */
    q: string
    /**
     * If an organization uses Salesforce Knowledge articles or answers, filter all search results based on one or more data categories. When using dataCategories, specify a Salesforce Knowledge article or answer type with sobjects and the required parameters.
     */
    dataCategories?: unknown[]
    /**
     * Single value. The maximum number of results to return for each sobject (GET) or sobjects (POST) specified.
     *
     */
    defaultLimit?: number
    /**
     * Single value. Filters search results based on the division field.
     */
    division?: string
    /**
     * Array of one or more fields to return in the response for each sobjects specified. At least one sobjects must be specified at the global level.
     */
    fields?: string[]
    in?: QueryScope
    /**
     * Specifies if metadata should be returned in the response. No metadata is returned by default. To include metadata in the response, use the LABELS value, which returns the display label for the fields returned in search results. For example: ?q=Acme&metadata=LABELS
     */
    metadata?: string
    /**
     * A network ID represents the Experience Cloud site ID.
     */
    netWorkIds?: string[]
    /**
     * Single value. The starting row offset into the result set returned.
     */
    offset?: number
    /**
     * Single value. The maximum number of results to return across all sobject parameters specified.
     */
    overallLimit?: number
    /**
     * Single value. Filters product search results by a price book ID for only the Product2 object. The price book ID must be associated with the product that you’re searching for. For example, ?q=laptop&sobject=product2&pricebookId=01sxx0000002MffAAE
     */
    pricebookId?: string
    /**
     * The target length (maximum number of snippet characters) to return in Salesforce Knowledge article, case, case comment, feed, feed comment, idea, and idea comment search results. The snippet parameter displays contextual excerpts and highlights the search term for each article in the search results. Snippet results are used to differentiate matches to the search term in article search results. The target length can be from 50 to 1000 characters.
     */
    snippet?: string
    /**
     * Objects to return in the response. Must contain valid object types. Use with the required parameters.
     */
    sobjects?: SObjectsFilter[]
    /**
     * Specifies whether spell correction is enabled for a user’s search. When set to true, spell correction is enabled for searches that support spell correction. The default value is true.
     */
    spellCorrection?: boolean
    /**
     * Specifies a value of true to track keywords that are used in Salesforce Knowledge article searches only.
     */
    updateTracking?: string
    /**
     * Specifies a value of true to update an article’s view statistics. Valid only for Salesforce Knowledge article searches.
     */
    updateViewStat?: string
}
