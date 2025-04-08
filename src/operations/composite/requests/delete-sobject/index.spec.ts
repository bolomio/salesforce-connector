import { makeCreateCompositeSubRequestDeleteSObject } from './index'

import got, { Got } from 'got'
import { disableNetConnect } from 'nock'

beforeAll(() => {
    disableNetConnect()
})

const sObjectName = 'Account'
const baseUrl = 'https://bolo.example.com/'
describe('createCompositeSubRequestDeleteSObject', () => {
    const gotInstance: Got = got.extend({
        prefixUrl: baseUrl,
    })

    const createCompositeSubRequestDeleteSObject = makeCreateCompositeSubRequestDeleteSObject({
        gotInstance,
    })

    it('should create subRequest in salesforce', () => {
        const subRequest = createCompositeSubRequestDeleteSObject({
            sObjectName,
            recordId: 'account-id-1',
            referenceId: 'koko',
        })

        expect(subRequest).toMatchInlineSnapshot(`
            {
              "httpHeaders": {
                "content-type": "application/json",
                "user-agent": "got (https://github.com/sindresorhus/got)",
              },
              "method": "DELETE",
              "referenceId": "koko",
              "url": "/services/data/v55.0/sobjects/Account/account-id-1",
            }
        `)
    })
})
