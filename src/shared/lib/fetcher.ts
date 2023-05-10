import axios from 'axios';

export interface IFetchError extends Error {
  response?: string;
  status?: number;
}
interface IFetchParams {
  url: string;
  params?: Array<IParam>;
}

type IParam = Array<string>;

interface IParamsObject {
  [key: string]: string;
}

export async function fetcher({ url, params }: IFetchParams) {
  const paramsObj: IParamsObject = {};
  params && params.map((param) => (paramsObj[param[0]] = param[1]));
  try {
    const rsp = await axios.get(url, params && { params: paramsObj });
    if (rsp.status === 200) {
      return rsp.data;
    } else {
      return null;
    }
  } catch (err: any) {
    const error: IFetchError = new Error(
      'An error occurred while fetching the data'
    );
    error.response = err.response.data.message;
    error.status = err.response.status;
    throw error;
  }
}
