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

describe('GET /filming-locations', () => {
  it('responds with status 200 and JSON data', async () => {
    const searchTerm = 'Inception';
    const response = await request(app).get(`/filming-locations?searchTerm=${searchTerm}`);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.any(String),
          locations: expect.any(String),
          director: expect.any(String),
          release_year: expect.any(String)
        })
      ])
    );
  });

  it('responds with status 500 when search term is missing', async () => {
    const response = await request(app).get('/filming-locations');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Search term is required.');
  });

  it('responds with status 500 when external API request fails', async () => {

    jest.spyOn(app.locals, 'axios').mockRejectedValueOnce(new Error('API request failed'));
    const searchTerm = 'Inception'; 
    const response = await request(app).get(`/filming-locations?searchTerm=${searchTerm}`);
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('API request failed');
  });
});
