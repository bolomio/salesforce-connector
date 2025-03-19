import { makeDeleteSObject } from './index'

import { SALESFORCE_REST_API_VERSION } from '../../constants'

import got, { Got } from 'got'
import nock, { disableNetConnect } from 'nock'

beforeAll(() => {
    disableNetConnect()
})

const sObjectName = 'Account'
const recordId = '0010A000000aAAaAAA'
const baseUrl = 'https://bolo.example.com/'
const path = `/services/data/${SALESFORCE_REST_API_VERSION}/sobjects/${sObjectName}/${recordId}`

describe('deleteSObject', () => {
    const gotInstance: Got = got.extend({
        prefixUrl: baseUrl,
    })

    const deleteSObject = makeDeleteSObject({ gotInstance })

    it('should delete sobject in salesforce', async () => {
        const scope = nock(baseUrl).delete(path).reply(204)

        await deleteSObject({ sObjectName, recordId })

        expect(scope.isDone()).toBe(true)
    })
    it('should fail to delete sobject in salesforce', async () => {
        // Create a scope that will match the exact request URL
        const scope = nock(baseUrl).delete(path).reply(500).persist()

        await expect(async () => await deleteSObject({ sObjectName, recordId })).rejects.toThrow(
            'Response code 500 (Internal Server Error)'
        )

        // Verify the nock interceptor was used
        expect(scope.isDone()).toBe(true)
    })
})
