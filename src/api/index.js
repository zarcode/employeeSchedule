// @flow
import axios from 'axios';
import type { Api, FetchShiftsParams, Shift, PromiseCancel } from './types';
import config from '../config.json';

function requestGet<T>({ url, params }): PromiseCancel<T> {
  const cancelSource = axios.CancelToken.source();

  const request = {
    method: 'get',
    url,
    params,
    cancelToken: cancelSource.token,
  };

  const promise: Promise<T> = axios(request).then(r => r.data);

  return {
    promise,
    cancel: cancelSource.cancel,
  };
}

class ApiIml implements Api {
  fetchPhotos = (params: FetchShiftsParams): PromiseCancel<Array<Shift>> =>
    requestGet({
      url: `${config.url}/shifts`,
      params,
    });
}

const api: Api = new ApiIml();

export default api;
