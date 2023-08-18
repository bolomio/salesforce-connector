import { makeCreateCompositeSubRequestUpsertSObjectByExternalId } from './index'

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

    const createCompositeSubRequestUpsertSObjectByExternalId =
        makeCreateCompositeSubRequestUpsertSObjectByExternalId({
            gotInstance,
        })

    it('should create subRequest in salesforce', () => {
        const subRequest = createCompositeSubRequestUpsertSObjectByExternalId({
            sObjectName,
            record,
            sObjectFieldName: 'Koko_External__c',
            externalId: 'koko-id',
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
              "url": "/services/data/v55.0/sobjects/Account/Koko_External__c/koko-id",
            }
        `)
    })
})
