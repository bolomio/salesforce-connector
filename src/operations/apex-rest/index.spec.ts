import { makeApexRest } from './index'

import got, { Got } from 'got'
import nock, { disableNetConnect } from 'nock'

beforeAll(() => {
    disableNetConnect()
})

const baseUrl = 'https://bolo.example.com/'
const requestURI = '/company/bolo/'

describe('updateSObject', () => {
    const gotInstance: Got = got.extend({
        prefixUrl: baseUrl,
    })

    const apexRest = makeApexRest({ gotInstance })

    it('should call the apex rest endpoint with 200 response', async () => {
        const json = {
            name: 'koko-company',
        }

        const scope = nock(baseUrl)
            .post(`/services/apexrest${requestURI}`)
            .reply(200, { success: true })

        const responseBody = (await apexRest({
            requestURI,
            json,
            method: 'post',
        })) as Record<string, unknown>

        expect(scope.isDone()).toBe(true)
        expect(responseBody.success).toBe(true)
    })
    it('should call the apex rest endpoint with 204 response', async () => {
        const json = {
            name: 'koko-company',
        }

        const scope = nock(baseUrl).post(`/services/apexrest${requestURI}`).reply(204)

        const responseBody = (await apexRest({
            requestURI,
            json,
            method: 'post',
        })) as Record<string, unknown>

        expect(scope.isDone()).toBe(true)
        expect(responseBody).toBe(undefined)
    })

    it('should fail to update sobject in salesforce', async () => {
        nock(baseUrl).post(`/services/apexrest${requestURI}`).reply(500)

        await expect(
            async () =>
                await apexRest({
                    requestURI,
                    method: 'post',
                })
        ).rejects.toMatchInlineSnapshot(`[HTTPError: Response code 500 (Internal Server Error)]`)
    })
})
