import { test, expect } from '@playwright/test';

test('GET Users', async ({ request }) => {

    const response = await request.get(
        'https://reqres.in/api/users?page=2'
    );

    expect(response.status()).toBe(200);
});
test('Create User API', async ({ request }) => {

  const response = await request.post(
    'https://reqres.in/api/users',
    {
      data: {
        name: 'Sameer',
        job: 'QA Engineer'
      }
    }
  );

  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  console.log(responseBody);

  expect(responseBody.name).toBe('Pankaj');
  expect(responseBody.job).toBe('QA Engineer');
});