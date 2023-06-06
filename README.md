# @bolomio/salesforce-connector

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/bolomio/salesforce-connector)
[![npm version](https://badge.fury.io/js/%40bolomio%2Fsalesforce-connector.svg)](https://www.npmjs.com/package/@bolomio/salesforce-connector)

The `@bolomio/salesforce-connector` package provides a connector that allows you to interact with the standard Salesforce API. It offers functions for creating records, executing SOQL and SOSL queries, and more.

## Features

- Interact with standard salesforce api
- Create SObject Record
- Execute SOQL query
- Execute SOSL query

## Installation

You can install the package using npm:

```bash
npm install @bolomio/salesforce-authorizer
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

1. Pass the access token directly in the options when creating the connector instance.

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
    const result = await connector.createSObject(sObjectName, record)
    console.log('Record created successfully:', result)
  } catch (error) {
    console.error('Error creating record:', error)
  }
}

createSObjectExample()
```

#### soqlQuery
Execute a SOQL (Salesforce Object Query Language) query and retrieve the results.

```javascript
async function soqlQueryExample() {
  const queryStatement = 'SELECT Id, Name, Industry FROM Account WHERE Industry = \'Technology\''

  try {
    const result = await connector.soqlQuery(queryStatement)
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
    const result = await connector.soslQuery(queryConfiguration)
    console.log('Query results:', result)
  } catch (error) {
    console.error('Error executing SOSL query:', error)
  }
}

soslQueryExample()

```

## Upcoming

Other features will be added that use the standard salesforce api:
- update sobject
- delete sobject
- upsert sobject

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request. Make sure to follow the [contribution guidelines](./CONTRIBUTING.md).

## License

This project is licensed under the [GNU General Public License](LICENSE).
