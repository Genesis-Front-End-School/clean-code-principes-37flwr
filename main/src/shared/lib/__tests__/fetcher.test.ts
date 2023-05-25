import axios from 'axios';

import { fetcher, IFetchError } from '../fetcher';

describe('Fetcher function', () => {
  it('should resolve call axios with url only', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 200,
      data: 'response-data',
    });

    await fetcher({ url: 'test-url' });

    expect(axios.get).toHaveBeenCalledWith('test-url', undefined);
  });

  it('should resolve call axios with url and params', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 200,
      data: 'response-data',
    });

    await fetcher({
      url: 'test-url',
      params: [
        ['param1', 'param-1'],
        ['param2', 'param-2'],
      ],
    });

    expect(axios.get).toHaveBeenCalledWith('test-url', {
      params: {
        param1: 'param-1',
        param2: 'param-2',
      },
    });
  });

  it('should resolve axios call', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 200,
      data: 'response-data',
    });

    const rsp = await fetcher({ url: 'test-url' });

    expect(rsp).toEqual('response-data');
  });

  it('should not return data if call status is not 200', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 300,
      data: 'response-data',
    });

    const rsp = await fetcher({ url: 'test-url' });

    expect(rsp).toBeNull();
  });

  it('should fail axios call', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce({
      response: {
        status: 400,
        data: { message: 'response-data' },
      },
    });

    var err: IFetchError = {
      ...new Error('Test error'),
      response: 'response-data',
      status: 400,
    };
    try {
      await fetcher({ url: 'test-url' });
    } catch (e: any) {
      err = e;
    } finally {
      expect(err.response).toEqual('response-data');
      expect(err.status).toEqual(400);
    }
  });
});
