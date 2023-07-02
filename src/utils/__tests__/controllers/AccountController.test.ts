let testId = '';

describe('Account tests', () => {
    // Test for POST /account
    test('should create account and return 200', async () => {
        const response = await fetch('http://localhost:3001/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@test.com',
                password: 'test',
            }),
        });

        expect(response.status).toBe(200);

        // We suppose the response body contains an 'id' property
        const data = await response.json();
        testId = data._id;

        // Test that password is not in the response
        expect(data).not.toHaveProperty('password');
    });

    // Test for GET /account
    test('should get accounts and return 200', async () => {
        const response = await fetch('http://localhost:3001/account');
        expect(response.status).toBe(200);

        const data = await response.json();

        // Test that none of the accounts in the response contain 'password'
        data.forEach(account => {
            expect(account).not.toHaveProperty('password');
        });
    });

    // Test for GET /account/:id
    test('should get specific account and return 200', async () => {
        const response = await fetch(`http://localhost:3001/account/${testId}`);
        expect(response.status).toBe(200);

        const data = await response.json();

        // Test that password is not in the response
        expect(data).not.toHaveProperty('password');
    });

    // Test for PUT /account/:id
    test('should update specific account and return 200', async () => {
        const response = await fetch(`http://localhost:3001/account/${testId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test2@test2.com',
                password: 'test',
            }),
        });
        expect(response.status).toBe(200);

        const data = await response.json();

        // Test that password is not in the response
        expect(data).not.toHaveProperty('password');
    });

    // Test for DELETE /account/:id
    test('should delete specific account and return 200', async () => {
        const response = await fetch(`http://localhost:3001/account/${testId}`, {
            method: 'DELETE',
        });
        expect(response.status).toBe(200);
    });
});
