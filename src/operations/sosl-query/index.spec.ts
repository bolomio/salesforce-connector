import { makeSoslQuery } from './index'

import { QueryConfiguration, SoslQueryResult } from './types'
import { QueryScope } from './constants'

import { SALESFORCE_REST_API_VERSION } from '../../constants'

import got, { Got } from 'got'
import nock, { disableNetConnect } from 'nock'

beforeAll(() => {
    disableNetConnect()
})

type Contact = {
    LastName: string
}

type Lead = {
    FirstName: string
}

const baseUrl = 'https://bolo.example.com/'
const path = `/services/data/${SALESFORCE_REST_API_VERSION}/parameterizedSearch/`

describe('soslQuery', () => {
    const queryConfiguration: QueryConfiguration = {
        q: '0000000',
        in: QueryScope.PHONE,
        fields: ['FirstName', 'LastName'],
        sobjects: [{ name: 'Contact' }, { name: 'Lead' }],
    }

    const gotInstance: Got = got.extend({
        prefixUrl: baseUrl,
    })

    const soslQuery = makeSoslQuery({ gotInstance })

    it('should execute sosl query in salesforce', async () => {
        const mockedResult: SoslQueryResult = {
            searchRecords: [
                {
                    attributes: {
                        type: 'Contact',
                        url: '',
                    },
                    Id: '001',
                    LastName: 'koko',
                },
                {
                    attributes: {
                        type: 'Lead',
                        url: '',
                    },
                    Id: '001',
                    FirstName: 'joko',
                },
            ],
        }

        nock(baseUrl).post(path).reply(200, mockedResult)

        const result = await soslQuery<Contact | Lead>({ queryConfiguration })
        expect(result).toEqual(mockedResult)
    })

    it('should fail to execute sosl query in salesforce', async () => {
        nock(baseUrl).post(path).reply(500, 'oh noo...')

        await expect(
            async () => await soslQuery({ queryConfiguration })
        ).rejects.toMatchInlineSnapshot(`[HTTPError: Response code 500 (Internal Server Error)]`)
    })
})
