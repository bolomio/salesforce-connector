import type { ArticleListResult } from './types'

import type { ExtendableOptions, QueryParams } from '../../../../types'
import { SALESFORCE_REST_API_VERSION } from '../../../../constants'

import type { Got, Options, Response } from 'got'

export function makeGetKnowledgeArticlesList({ gotInstance }: { gotInstance: Got }) {
    /**
     * Retrieves a list of Knowledge Articles from Salesforce.
     * For more information regarding the Knowledge Articles API:
     * @link https://developer.salesforce.com/docs/atlas.en-us.knowledge_dev.meta/knowledge_dev/knowledge_development_rest_intro.htm
     * Implements this API:
     * @link https://developer.salesforce.com/docs/atlas.en-us.knowledge_dev.meta/knowledge_dev/resources_knowledge_support_artlist.htm
     *
     * @param {ExtendableOptions} extendOptions - Additional options to extend the HTTP request.
     * @returns {Promise<ArticleListResult>} A Promise that resolves to the list of Knowledge Articles.
     * The result is of type ArticleListResult.
     */
    return async function getKnowledgeArticlesList({
        language,
        queryParams,
        extendOptions = {},
    }: {
        language: string
        queryParams?: QueryParams
        extendOptions?: ExtendableOptions
    }): Promise<ArticleListResult> {
        const got = gotInstance.extend(extendOptions)

        const options: Options = {
            headers: {
                'content-type': 'application/json',
                'Accept-language': language,
            },
            responseType: 'json',
            searchParams: queryParams,
        }

        const response = (await got.get(
            `services/data/${SALESFORCE_REST_API_VERSION}/support/knowledgeArticles`,
            options
        )) as Response<ArticleListResult>

        return response.body
    }
}
