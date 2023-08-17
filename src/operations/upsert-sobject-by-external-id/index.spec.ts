import { makeUpsertSObjectByExternalId } from './index'

import { UpsertSObjectResult } from './types'

import { SALESFORCE_REST_API_VERSION } from '../../constants'

import got, { Got } from 'got'
import nock, { disableNetConnect } from 'nock'

beforeAll(() => {
    disableNetConnect()
})

const sObjectName = 'Account'
const sObjectFieldName = 'AccountExternalId'
const externalId = 'Account-123'
const baseUrl = 'https://bolo.example.com/'
const path = `/services/data/${SALESFORCE_REST_API_VERSION}/sobjects/${sObjectName}/${sObjectFieldName}/${externalId}`

describe('upsertSObject', () => {
    const record = {
        Name: 'koko-company',
    }

    const gotInstance: Got = got.extend({
        prefixUrl: baseUrl,
    })

    const upsertSObjectByExternalId = makeUpsertSObjectByExternalId({ gotInstance })

    it('should upsert sobject in salesforce', async () => {
        const mockedResult: UpsertSObjectResult = {
            id: '001',
            errors: [],
            success: true,
            created: true,
        }

        nock(baseUrl).patch(path).reply(200, mockedResult)

        const result = await upsertSObjectByExternalId({
            sObjectName,
            sObjectFieldName,
            externalId,
            record,
        })

        expect(result).toEqual(mockedResult)
    })

    it('should fail to upsert sobject in salesforce', async () => {
        const mockedResult: UpsertSObjectResult = {
            id: '001',
            errors: [{}],
            success: false,
            created: false,
        }

        nock(baseUrl).patch(path).reply(500, mockedResult)

        await expect(
            async () =>
                await upsertSObjectByExternalId({
                    sObjectName,
                    sObjectFieldName,
                    externalId,
                    record,
                })
        ).rejects.toMatchInlineSnapshot(`[HTTPError: Response code 500 (Internal Server Error)]`)
    })
})
