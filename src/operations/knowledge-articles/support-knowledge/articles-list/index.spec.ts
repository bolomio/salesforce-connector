import { makeGetKnowledgeArticlesList } from './index'

import type { ArticleListResult } from './types'

import { SALESFORCE_REST_API_VERSION } from '../../../../constants'

import { Got } from 'got'

jest.mock('got')

describe('getKnowledgeArticlesList', () => {
    let gotInstance: jest.Mocked<Got>
    let getKnowledgeArticlesList: ReturnType<typeof makeGetKnowledgeArticlesList>

    beforeEach(() => {
        gotInstance = {
            extend: jest.fn(() => gotInstance),
            get: jest.fn(),
        } as any

        getKnowledgeArticlesList = makeGetKnowledgeArticlesList({ gotInstance })
    })

    it('should retrieve the list of knowledge articles', async () => {
        const mockResponse: ArticleListResult = {
            // mock the response structure based on the expected ArticleListResult type
            articles: [
                {
                    id: '001',
                    title: 'Sample Article',
                    summary: 'This is a sample article',
                    articleNumber: 'KA-001',
                    urlName: 'sample-article',
                    viewCount: 100,
                    viewScore: 4.5,
                    categoryGroups: [
                        {
                            groupLabel: 'Sample Group',
                            groupName: 'sample-group',
                            selectedCategories: [
                                {
                                    categoryLabel: 'Sample Category',
                                    categoryName: 'sample-category',
                                    url: 'sample-url',
                                },
                            ],
                        },
                    ],
                },
            ],
            currentPageUrl: 'https://example.com',
            nextPageUrl: 'https://example.com?page=2',
            pageNumber: 1,
        }

        gotInstance.get.mockResolvedValue({
            body: mockResponse,
        })

        const result = await getKnowledgeArticlesList({})

        expect(result).toEqual(mockResponse)
        expect(gotInstance.get).toHaveBeenCalledWith(
            `services/data/${SALESFORCE_REST_API_VERSION}/support/knowledgeArticles`,
            expect.objectContaining({
                headers: {
                    'content-type': 'application/json',
                },
                responseType: 'json',
            })
        )
    })
})
