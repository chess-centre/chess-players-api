<p align="center">
    <img
      alt="The Chess Centre | API"
      src="https://github.com/Chess-Centre/welcome/blob/master/img/bcc-dark-logo.png?raw=true"
      width="100"
    />
  <p align="center">
      <a href="https://github.com/chess-centre/welcome/blob/master/LICENSE">
        <img alt="GitHub" src="https://img.shields.io/github/license/chess-centre/welcome?style=flat">
      </a>
  </p>
  <h1 align="center"> Chess Players API </h1>
</p>
<p align="center">
  <h3 align="center"> A project for creating your own player database & RESTful API. </h3>
</p>

## Intro

This package for creating a basic chess player API using AWS `Lambda` & `DynamoDB` written in `TypeScript`. This provides the initial CRUD operations to expose a HTTP service using the AWS `Gateway API`. 

This package is to support the creation of the [chess-players](https://github.com/chess-centre/chess-players) npm package for downloading offically published player data. You can then currate your own data and santize this as you choose i.e., only store top grandmasters

## Getting started

### Prerequisites

* AWS Account: [create here](https://aws.amazon.com/console/)
* Serverless Framework: [info](https://www.serverless.com/)

Once you have created your account, proceed with the following:

```
npm i -g serverless
```

### Running locally

Install dynamodb - so you can test your commands locally, with postman or curl

```
sls dynamodb install
npm i -g serverless-offline
```

[more info](https://www.serverless.com/plugins/serverless-dynamodb-local)

```
sls offline start
```

### Deploying

Before you deploy, ensure the `serverless.yml` is using the correct AWS region 

```yml
provider:
  name: aws
  runtime: nodejs12.x
  region: eu-west-2 <---- change to your local region
```

```
sls deploy
```

## API

| Name         | Method      | Description                                                |
| :---         |    :----:   | :---                                                       |
| /player      | POST        | Creates a new [player record](#player-record)              |
| /player/{id} | GET         | Returns a player record by `id`                            |
| /players     | GET         | Returns all players (no limit)                             |
| /player/{id} | PUT         | Updates a existing [player record](#player-record) by `id` |


_Note: DELETE has been left out as this is an unlikely operation_


### Player object
#player-object

```
interface Player {
  id: number,
  name: string,
  rating: number | null,
  country: string,
  createdAt: string,
}
```

