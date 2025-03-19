import { makeSalesforceConnector, SalesforceConnector } from './index'

describe('index', () => {
    const connector: SalesforceConnector = makeSalesforceConnector({
        baseUrl: 'https://koko.example.com',
    })

    it('should be able to instantiate', () => {
        expect(connector).toHaveProperty('createSObject')
        expect(connector).toHaveProperty('updateSObject')
        expect(connector).toHaveProperty('upsertSObjectByExternalId')
        expect(connector).toHaveProperty('deleteSObject')
        expect(connector).toHaveProperty('soqlQuery')
        expect(connector).toHaveProperty('soslQuery')
        expect(connector).toHaveProperty('apexRest')
        expect(connector).toHaveProperty('getKnowledgeArticlesList')
    })
})
