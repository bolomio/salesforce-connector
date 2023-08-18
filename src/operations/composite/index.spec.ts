import { makeComposite } from './index'

import { CompositeResult } from './types'

import { SALESFORCE_REST_API_VERSION } from '../../constants'

import got, { Got } from 'got'
import nock, { disableNetConnect } from 'nock'

beforeAll(() => {
    disableNetConnect()
})

const baseUrl = 'https://bolo.example.com/'
const path = `/services/data/${SALESFORCE_REST_API_VERSION}/composite/`

describe('createSObject', () => {
    const gotInstance: Got = got.extend({
        prefixUrl: baseUrl,
    })

    const composite = makeComposite({ gotInstance })

    it('should execute composite request in salesforce', async () => {
        const mockedResult: CompositeResult = {
            compositeResponse: [],
        }

        nock(baseUrl).post(path).reply(200, mockedResult)

        const result = await composite({
            allOrNone: false,
            collateSubrequests: false,
            compositeRequest: [
                {
                    referenceId: 'koko-1',
                    url: '/sobjects/',
                    method: 'POST',
                },
            ],
        })

        expect(result).toEqual(mockedResult)
    })

    it('should fail to create sobject in salesforce', async () => {
        const mockedResult: CompositeResult = {
            compositeResponse: [],
        }

        nock(baseUrl).post(path).reply(500, mockedResult)

        await expect(
            async () =>
                await composite({
                    allOrNone: false,
                    collateSubrequests: false,
                    compositeRequest: [],
                })
        ).rejects.toMatchInlineSnapshot(`[HTTPError: Response code 500 (Internal Server Error)]`)
    })
})
