import { makeUpdateSObject } from './index'

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

describe('updateSObject', () => {
    const record = {
        Name: 'koko-company',
    }

    const gotInstance: Got = got.extend({
        prefixUrl: baseUrl,
    })

    const updateSObject = makeUpdateSObject({ gotInstance })

    it('should update sobject in salesforce', async () => {
        const scope = nock(baseUrl).patch(path).reply(204)

        await updateSObject({ sObjectName, recordId, record })

        expect(scope.isDone()).toBe(true)
    })
    it('should fail to update sobject in salesforce', async () => {
        nock(baseUrl).patch(path).reply(500)

        await expect(
            async () => await updateSObject({ sObjectName, recordId, record })
        ).rejects.toMatchInlineSnapshot(`[HTTPError: Response code 500 (Internal Server Error)]`)
    })
})
