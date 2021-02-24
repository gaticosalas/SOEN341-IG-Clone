/**
 * @jest-environment node
 */
const axios = require('axios');

// todo: create separate mongodb atlas database for testing?

// for npm test to work, you must do npm run server first and then
// in another terminal, do npm test.

describe('POST@/users', () => {
    it('should create a user and return a token with a status of 200', async () => {
        makeRandomString = length => {
            let result           = '';
            const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }
         
        const randomString = makeRandomString(10);
        // todo: don't hardcode localhost and 5000
        const result = await axios.post('http://localhost:5000/api/users', {
            first_name: 'testFirstName',
            last_name: 'testLastName',
            username: randomString,
            email: `${randomString}@test.com`,
            password: 'testPassword'
        });

        expect(result.status).toEqual(200);
    });
})