import { makeCreateCompositeSubRequestSoqlQuery } from './index'

import got, { Got } from 'got'
import { disableNetConnect } from 'nock'

beforeAll(() => {
    disableNetConnect()
})

const baseUrl = 'https://bolo.example.com/'
describe('createCompositeSubRequestUpdateSObject', () => {
    const gotInstance: Got = got.extend({
        prefixUrl: baseUrl,
    })

    const createCompositeSubRequestSoqlQuery = makeCreateCompositeSubRequestSoqlQuery({
        gotInstance,
    })

    it('should create subRequest in salesforce', () => {
        const subRequest = createCompositeSubRequestSoqlQuery({
            queryStatement: 'SELECT Id FROM Account LIMIT 1',
            referenceId: 'koko',
        })

        expect(subRequest).toMatchInlineSnapshot(`
            {
              "httpHeaders": {
                "content-type": "application/json",
                "user-agent": "got (https://github.com/sindresorhus/got)",
              },
              "method": "GET",
              "referenceId": "koko",
              "url": "services/data/v55.0/query/?q=SELECT Id FROM Account LIMIT 1",
            }
        `)
    })
})
