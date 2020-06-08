import { postWeatherAndGeoData } from './weather';

test('postWeatherAndGeoData calls fetch', () => {
    const mockSuccessResponse = { success : "true" };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
    const mockFetchPromise = Promise.resolve({ 
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    return postWeatherAndGeoData().then(data => {
        expect(data).toStrictEqual({ success : "true" });
    });
});