'use strict';

import * as AWS from 'aws-sdk';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';

const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const playersTable = process.env.PLAYERS_TABLE || "players";

interface Player {
  id: number, // fide player id
  name: string,
  rating: number | null,
  country: string,
  createdAt: string,
}

enum StatusCode {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  ServiceUnavailable = 503
}

/**
 * Response - helper
 * @param statusCode number
 * @param message string
 */
const response: any = (statusCode: number, message: string) => ({ statusCode, body: JSON.stringify(message) });

/**
 * SortByDate - helper
 * @param a Player
 * @param b Player
 */
const sortByDate: any = (a: Player, b: Player) => (a.createdAt > b.createdAt) ? -1 : 1;

/**
 * POST /players
 */
module.exports.createPlayer = async (event: APIGatewayProxyEvent, callback: Function): Promise<APIGatewayProxyHandler> => {
  const { id, name, rating, country }: Player = JSON.parse(event.body || '{}');

  if (!id || !name || !rating) {
    return callback(
      null,
      response(StatusCode.BadRequest, {
        error: 'Player must have an id, name and rating'
      })
    );
  }

  const player: Player = {
    id,
    name,
    rating,
    country,
    createdAt: new Date().toISOString()
  };

  const res = await db.put({ TableName: playersTable, Item: player }).promise()
                      .catch((err) => response(null, response(err.statusCode, err)));
  
  return callback(null, response(StatusCode.Created, res.Item));

};

/**
 * GET /players
 */
module.exports.getPlayers = async (event: APIGatewayProxyEvent, callback: Function): Promise<APIGatewayProxyHandler> => {
  const res = await db.scan({ TableName: playersTable }).promise()
    .catch((err) => callback(null, response(err.statusCode, err)))

  return callback(null, response(StatusCode.Success, res.Items?.sort(sortByDate)));
};

/**
 * GET /player/{id} 
 */
module.exports.getPlayer = async (event: APIGatewayProxyEvent, callback: Function): Promise<APIGatewayProxyHandler> => {
  const { id } = event.pathParameters!;

  const params = {
    TableName: playersTable,
    Key: {
      id
    }
  };

  const res = await db.get(params).promise()
    .catch((err) => callback(null, response(err.statusCode, err)));

  if (res.Item) {
    return callback(null, response(StatusCode.Success, res.Item))
  } else {
    return callback(null, response(StatusCode.NotFound, { error: 'Player not found' }))
  }
};


/**
 * PUT /player/{id} 
 */
module.exports.updatePlayer = async (event: APIGatewayProxyEvent, callback: Function): Promise<APIGatewayProxyHandler> => {
  const { id } = event.pathParameters!;
  const reqBody = JSON.parse(event.body || '{}');
  const { rating }: Player = reqBody;

  const params = {
    Key: {
      id: id
    },
    TableName: playersTable,
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: 'SET rating = :rating',
    ExpressionAttributeValues: {
      ':rating': rating,
    },
    ReturnValues: 'ALL_NEW'
  };

<<<<<<< HEAD
  const res = await db.update(params).promise()
                        .catch((err) => callback(null, response(err.statusCode, err)));

  return callback(null, response(StatusCode.Success, res.Attributes));
    
};
=======
  return db
    .update(params)
    .promise()
    .then((res) => {
      callback(null, response(StatusCode.Success, res.Attributes));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};
>>>>>>> 773cc0bd2cdd22c820b2c328f5db7d2252bb98cf
