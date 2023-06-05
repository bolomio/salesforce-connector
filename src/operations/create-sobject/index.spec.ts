import { makeCreateSObject } from './index'

import { CreateSObjectResult } from './types'

import { SALESFORCE_REST_API_VERSION } from '../../constants'

import got, { Got } from 'got'
import nock, { disableNetConnect } from 'nock'

beforeAll(() => {
    disableNetConnect()
})

const sObjectName = 'Account'
const baseUrl = 'https://bolo.example.com/'
const path = `/services/data/${SALESFORCE_REST_API_VERSION}/sobjects/${sObjectName}`

describe('createSObject', () => {
    const record = {
        Name: 'koko-company',
    }

    const gotInstance: Got = got.extend({
        prefixUrl: baseUrl,
    })

    const createSObject = makeCreateSObject({ gotInstance })

    it('should create sobject in salesforce', async () => {
        const mockedResult: CreateSObjectResult = {
            id: '001',
            errors: [],
            success: true,
        }

        nock(baseUrl).post(path).reply(200, mockedResult)

        const result = await createSObject({ sObjectName, record })

        expect(result).toEqual(mockedResult)
    })

    it('should fail to create sobject in salesforce', async () => {
        const mockedResult: CreateSObjectResult = {
            id: '001',
            errors: [{}],
            success: false,
        }

        nock(baseUrl).post(path).reply(500, mockedResult)

        await expect(
            async () => await createSObject({ sObjectName, record })
        ).rejects.toMatchInlineSnapshot(`[HTTPError: Response code 500 (Internal Server Error)]`)
    })
})
