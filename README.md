# @bolomio/salesforce-connector

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/bolomio/salesforce-connector)
[![npm version](https://badge.fury.io/js/%40bolomio%2Fsalesforce-connector.svg)](https://www.npmjs.com/package/@bolomio/salesforce-connector)

The `@bolomio/salesforce-connector` package provides a connector that allows you to interact with the standard Salesforce API. It offers functions for creating records, executing SOQL and SOSL queries, and more.

## Features

- Interact with standard salesforce api
- Create SObject Record
- Update SObject Record
- Upsert SObject Record by External ID
- Execute Composite Request
- Execute SOQL query
- Execute SOSL query
- Interact with custom apex rest api.

## Installation

You can install the package using npm:

```bash
npm install @bolomio/salesforce-connector
```

## Usage

To use the Salesforce Connector, you need to create an instance of it by calling the `makeSalesforceConnector` function with the required configurations.

```javascript
const { makeSalesforceConnector } = require('@bolomio/salesforce-connector')

// Create the Salesforce Connector instance
const connector = makeSalesforceConnector({
  baseUrl: 'https://your-salesforce-instance.com/',
  accessToken: 'your_access_token',
})
```

### Authorization

To authorize your requests, you have multiple options:

1. Pass the access token directly in the options when creating the connector instance. _NB: if the access token is passed - a before request hook will be created to set the token in the authentication header._

```javascript
const { makeSalesforceConnector } = require('@bolomio/salesforce-connector')

// Create the Salesforce Connector instance
const connector = makeSalesforceConnector({
  baseUrl: 'https://your-salesforce-instance.com/',
  accessToken: 'your_access_token',
})
```

2. Set the authorization header yourself in the `beforeRequest` hook.

```javascript
const { makeSalesforceConnector } = require('@bolomio/salesforce-connector')

// Create the Salesforce Connector instance
const connector = makeSalesforceConnector({
  baseUrl: 'https://your-salesforce-instance.com/',
  hooks: {
    beforeRequest: [
      (options) => {
        console.log('Setting token')
        options.headers['Authorization'] = 'Bearer {your_access_token}'
      },
    ],
  },
})
```

Make sure to replace `'https://your-salesforce-instance.com/'` with the actual Salesforce instance URL and `'your_access_token'` with the valid access token obtained through a secure authentication process.

**Note: to receive an access token you can use the [@bolomio/salesforce-authorizer](https://www.npmjs.com/package/@bolomio/salesforce-authorizer)**
### Functions

#### composite
Executes a collection of standard api requests
```javascript
async function compositeExample() {
  try {
    const result = await connector.composite({
      allOrNone: true,
      compositeRequest: [
        connector.compositeRequests.soqlQuery({
          referenceId: 'reference_id_account_1',
          queryStatement: 'SELECT Id FROM Account LIMIT 1',
        }),
        connector.compositeRequests.createSObject({
          record: {
            LastName: 'Koko',
            AccountId: '@{reference_id_account_1.records[0].Id}',
          },
          sObjectName: 'Contact',
          referenceId: 'reference_id_contact_1',
        }),
      ],
    })
    console.log('1 composite executed successfully:', result.compositeResponse[0])
    console.log('2 composite executed successfully:', result.compositeResponse[1])
  } catch (error) {
    console.error('Error executing composite:', error)
  }
}

compositeExample()
```


#### createSObject
Create a new record of a specific Salesforce object using the provided data.
```javascript
async function createSObjectExample() {
  const sObjectName = 'Account'
  const record = {
    Name: 'Acme Corporation',
    Industry: 'Technology',
  }

  try {
    const result = await connector.createSObject({ sObjectName, record })
    console.log('Record created successfully:', result)
  } catch (error) {
    console.error('Error creating record:', error)
  }
}

createSObjectExample()
```

#### updateSObject
Update a record of a specific Salesforce object using the provided data.
```javascript
async function updateSObjectExample() {
  const sObjectName = 'Account'
  const recordId = '0011t00000B0lOMAAZ'
  const record = {
    Name: 'Acme Corporation',
    Industry: 'Technology',
  }

  try {
    await connector.updateSObject({ sObjectName, recordId, record })
    console.log('Record updated successfully')
  } catch (error) {
    console.error('Error updating record:', error)
  }
}

updateSObjectExample()
```

#### upsertSObjectByExternalId
Insert or Update (Upsert) a Record Using an External ID.
```javascript
async function upsertSObjectByExternalIdExample() {
  const sObjectName = 'Account'
  const sObjectFieldName = 'AccountExternalId__c'
  const externalId = 'Account-123'
  const record = {
    Name: 'Acme Corporation',
    Industry: 'Technology',
  }

  try {
    const result = await connector.upsertSObjectByExternalId({ sObjectName, sObjectFieldName, externalId, record })
    console.log('Record upserted successfully:', result)
  } catch (error) {
    console.error('Error upserting record:', error)
  }
}

upsertSObjectByExternalIdExample()
```

#### soqlQuery
Execute a SOQL (Salesforce Object Query Language) query and retrieve the results.

```javascript
async function soqlQueryExample() {
  const queryStatement = 'SELECT Id, Name, Industry FROM Account WHERE Industry = \'Technology\''

  try {
    const result = await connector.soqlQuery({ queryStatement })
    console.log('Query results:', result)
  } catch (error) {
    console.error('Error executing SOQL query:', error)
  }
}

soqlQueryExample()
```


#### soslQuery
Execute a SOSL (Salesforce Object Search Language) query and retrieve the results.

```javascript
async function soslQueryExample() {
  const queryConfiguration: {
      q: '00001',
      in: 'PHONE',
      fields: ['Name'],
      sobjects: [{ name: 'Contact' }],
    }

  try {
    const result = await connector.soslQuery({ queryConfiguration })
    console.log('Query results:', result)
  } catch (error) {
    console.error('Error executing SOSL query:', error)
  }
}

soslQueryExample()

```

#### apexRest
Execute a http request against a custom apex rest endpoint.
[Salesforce Documentation](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_rest.htm)

**Get Example**
```javascript
async function apexRestGetExample() {
  const companyId = 'bolo-id'

  try {
    const result = await connector.apexRest({
      method: 'GET',
      requestURI: `/bolo-companies/${companyId}`,
    })
    console.log('Get result:', result)
  } catch (error) {
    console.error('Error executing get request: ', error)
  }
}

apexRestGetExample()
```

**Put Example**
```javascript
async function apexRestPutExample() {
  const companyId = 'bolo-id'
  
  // the json body to be used in the request
  const json = {
    name: 'bolo'
  }

  try {
    const result = await connector.apexRest({
      method: 'PUT',
      requestURI: `/bolo-companies/${companyId}`,
      json
    })
    console.log('Put result:', result)
  } catch (error) {
    console.error('Error executing put request: ', error)
  }
}

apexRestPutExample()
```

**Post Example with no content response**
```javascript
async function apexRestPostWithNoContentResponseExample() {
  // the json body to be used in the request
  const json = {
    name: 'bolo'
  }

  try {
    await connector.apexRest({
      method: 'POST',
      requestURI: `/bolo-companies/`,
      json
    })
  } catch (error) {
    console.error('Error executing post request: ', error)
  }
}

apexRestPostWithNoContentResponseExample()
```

#### getKnowledgeArticlesList
Execute an http request against the Knowledge Article API to list articles.
[Salesforce Documentation](https://developer.salesforce.com/docs/atlas.en-us.knowledge_dev.meta/knowledge_dev/resources_knowledge_support_artlist.htm)

**Get Knowledge Articles List Example**
```javascript
async function getKnowledgeArticlesListExample() {
  const language = 'en-US'

  try {
    const result = await connector.getKnowledgeArticlesList({ 
      language,
      queryParams: {
        sort: 'ViewScore',
        channel: 'Pkb',
        pageSize: 10,
      }
    })
    console.log('Knowledge result:', result)
  } catch (error) {
    console.error('Error executing get request: ', error)
  }
}
```
## Upcoming

Other features will be added that use the standard salesforce api:
- [delete sobject](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_delete_record.htm)
- [composite graph support](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_graph.htm)
- [composite tree support](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_sobject_tree.htm)
- [composite sobject support](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_sobjects_collections.htm)
- [composite batch support](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_batch.htm)

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request. Make sure to follow the [contribution guidelines](./CONTRIBUTING.md).

## License

This project is licensed under the [GNU General Public License](LICENSE).
