import axios from 'axios';

type FetchParams = {
  url: string;
  params: Array<Param>;
};

type Param = Array<string>;

type ParamsObject = {
  [key: string]: string;
};

type ExtendedError = Error & {
  response?: string;
  status?: number;
};

export async function fetcher({ url, params }: FetchParams) {
  const paramsObj: ParamsObject = {};
  params && params.map((param) => (paramsObj[param[0]] = param[1]));
  try {
    const rsp = await axios.get(url, params && { params: paramsObj });
    if (rsp.status === 200) {
      return rsp.data;
    }
  } catch (err: any) {
    const error: ExtendedError = new Error(
      'An error occurred while fetching the data'
    );
    error.response = err.response.data.message;
    error.status = err.response.status;
    throw error;
  }
}
