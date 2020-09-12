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
  <h3 align="center"> A project for creating your own API player database. </h3>
</p>

## Intro

This is a project for quickly creating a basic chess player API using the cool features of `Lambda` & `DynamoDB` from AWS, all written in `TypeScript`. It provides the initial CRUD operations exposed over HTTP.

Use the [chess-players](https://github.com/chess-centre/chess-players) npm package for downloading offically published player data, you can currate your own santized data, for example, only store top grandmasters!

## Getting started

### Prerequisites

* NodeJs (v12+)
* AWS account: [create here](https://aws.amazon.com/console/)
* Serverless framework: [info](https://www.serverless.com/)

Once you have created your account, proceed with the following:

```
npm i -g serverless
```

### Running locally

Install dynamodb - to test your commands locally with postman or curl

```
sls dynamodb install
```

To understand more about working with `DynamoDB` offline see here: [more info](https://www.serverless.com/plugins/serverless-dynamodb-local)

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

Once your dependencies are all installed, run:

```
sls deploy
```

## API

| Name         | Method      | Description                                                |
| :---         |    :----:   | :---                                                       |
| /player      | POST        | creates a new `Player` record                              |
| /player/{id} | GET         | returns a player record by `id`                            |
| /players     | GET         | returns all players (no limit)                             |
| /player/{id} | PUT         | updates a existing `Player` by `id`                        |


_Note: DELETE has been left out intentionally as this is an unlikely operation_

More complex queries can be added and indexes on your database table will be useful depending on how you intend to use your data.

### Player object

Basic properties for a player record.

```typescript
interface Player {
  id: number,
  name: string,
  rating: number | null,
  country: string,
  createdAt: string,
}
```

