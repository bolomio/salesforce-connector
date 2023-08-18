import { makeCreateCompositeSubRequestCreateSObject } from './index'

import got, { Got } from 'got'
import { disableNetConnect } from 'nock'

beforeAll(() => {
    disableNetConnect()
})

const sObjectName = 'Account'
const baseUrl = 'https://bolo.example.com/'
describe('createCompositeSubRequestCreateSObject', () => {
    const record = {
        Name: 'koko-company',
    }

    const gotInstance: Got = got.extend({
        prefixUrl: baseUrl,
    })

    const createCompositeSubRequestCreateSObject = makeCreateCompositeSubRequestCreateSObject({
        gotInstance,
    })

    it('should create subRequest in salesforce', () => {
        const subRequest = createCompositeSubRequestCreateSObject({
            sObjectName,
            record,
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
              "method": "POST",
              "referenceId": "koko",
              "url": "/services/data/v55.0/sobjects/Account",
            }
        `)
    })
})
