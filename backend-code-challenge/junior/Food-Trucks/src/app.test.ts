import request from 'supertest';
import app from './app';

describe('GET /', () => {
  it('responds with status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('serves index.html', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('<!DOCTYPE html>');
  });
});

describe('GET /food-trucks', () => {
  it('responds with status 200 and JSON data', async () => {
    const latitude = '37.7749'; // Example latitude
    const longitude = '-122.4194'; // Example longitude
    const response = await request(app).get(`/food-trucks?latitude=${latitude}&longitude=${longitude}`);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          address: expect.any(String),
          foodItems: expect.any(String)
        })
      ])
    );
  });

  it('responds with status 500 when latitude is missing', async () => {
    const response = await request(app).get('/food-trucks?longitude=-122.4194');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Latitude and longitude are required.');
  });

  it('responds with status 500 when longitude is missing', async () => {
    const response = await request(app).get('/food-trucks?latitude=37.7749');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Latitude and longitude are required.');
  });

  it('responds with status 500 when external API request fails', async () => {
    jest.spyOn(app.locals, 'axios').mockRejectedValueOnce(new Error('API request failed'));
    const latitude = '37.7749'; // Example latitude
    const longitude = '-122.4194'; // Example longitude
    const response = await request(app).get(`/food-trucks?latitude=${latitude}&longitude=${longitude}`);
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('API request failed');
  });
});

