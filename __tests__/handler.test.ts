const handler = require('../handler');
const mockData = require('./mock.data.json');

describe('HTTP calls', () => {
    test('GET /players -> getPlayers()', async () => {
        expect(handler.getPlayers()).resolves.toBe(mockData);
    });

    test('GET /player/{id} -> getPlayer()', async () => {
        expect(handler.getPlayer({ pathParameters: {
            id: 1
        }})).resolves.toBe(mockData);
    });

    test('POST /player -> createPlayer()', async () => {
        expect(handler.createPlayer({ body: JSON.stringify({
            name: 'player name',
            country: 'player country',
            rating: 1000 })
        })).resolves.toBe(mockData);
    });

    test('PUT /player/{id} -> updatePlayer()', async () => {
        expect(handler.updatePlayer({
            pathParameters: {
                id: 1
            },
            body: JSON.stringify({
                rating: 2000
            })
        })).resolves.toBe({ ...mockData, rating: 2000 });
    });
})
