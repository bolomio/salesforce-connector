import { makeSoqlQuery } from './index'

import { SoqlQueryResult } from './types'

import { SALESFORCE_REST_API_VERSION } from '../../constants'

import got, { Got } from 'got'
import nock, { disableNetConnect } from 'nock'

beforeAll(() => {
    disableNetConnect()
})

type Account = {
    Name: string
}

const baseUrl = 'https://bolo.example.com/'
const queryStatement = 'SELECT Id, Name FROM Account'
const path = `/services/data/${SALESFORCE_REST_API_VERSION}/query/?q=${queryStatement}`

describe('soqlQuery', () => {
    const gotInstance: Got = got.extend({
        prefixUrl: baseUrl,
    })

    const soqlQuery = makeSoqlQuery({ gotInstance })

    it('should execute soql query in salesforce', async () => {
        const mockedResult: SoqlQueryResult = {
            totalSize: 1,
            done: true,
            records: [
                {
                    attributes: {
                        type: 'Account',
                        url: '',
                    },
                    Id: '001',
                    Name: 'koko',
                },
            ],
        }

        nock(baseUrl).get(path).reply(200, mockedResult)

        const result = await soqlQuery<Account>({ queryStatement })
        expect(result).toEqual(mockedResult)
    })

    it('should fail to execute soql query in salesforce', async () => {
        nock(baseUrl).persist().get(path).reply(500, 'oh noo...')

        await expect(async () => await soqlQuery({ queryStatement })).rejects.toMatchInlineSnapshot(
            `[HTTPError: Response code 500 (Internal Server Error)]`
        )
    })
})
