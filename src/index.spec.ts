import { makeSalesforceConnector, SalesforceConnector } from './index'

describe('index', () => {
    const connector: SalesforceConnector = makeSalesforceConnector({
        baseUrl: 'https://koko.exameple.com',
    })

    it('should be able to instantiate', () => {
        expect(connector).toHaveProperty('createSObject')
        expect(connector).toHaveProperty('soslQuery')
        expect(connector).toHaveProperty('soqlQuery')
    })
})
