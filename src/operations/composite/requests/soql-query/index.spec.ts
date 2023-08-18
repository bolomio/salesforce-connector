import { makeCreateCompositeSubRequestUpdateSObject } from './index'

import got, { Got } from 'got'
import { disableNetConnect } from 'nock'

beforeAll(() => {
    disableNetConnect()
})

const sObjectName = 'Account'
const baseUrl = 'https://bolo.example.com/'
describe('createCompositeSubRequestUpdateSObject', () => {
    const record = {
        Name: 'koko-company',
    }

    const gotInstance: Got = got.extend({
        prefixUrl: baseUrl,
    })

    const createCompositeSubRequestUpdateSObject = makeCreateCompositeSubRequestUpdateSObject({
        gotInstance,
    })

    it('should create subRequest in salesforce', () => {
        const subRequest = createCompositeSubRequestUpdateSObject({
            sObjectName,
            record,
            recordId: 'account-id-1',
            referenceId: 'koko',
        })

        expect(subRequest).toMatchInlineSnapshot(`
            {
              "body": {
                "Name": "koko-company",
              },
              "httpHeaders": {
                "content-type": "application/json",
                "user-agent": "got (https://github.com/sindresorhus/got)",
              },
              "method": "PATCH",
              "referenceId": "koko",
              "url": "services/data/v55.0/sobjects/Account/account-id-1",
            }
        `)
    })
})
