import { useEffect, useState } from 'react';
import axios, { Method } from 'axios';

export interface UseAjaxProps<TRes = any, TParams = any> {
  url: string;
  method?: Method;
  params?: TParams;
  data?: TRes;
  headers?: any;
}

export interface UseAjaxResult<T> {
  response: { data: T };
  loading: boolean;
  error: any;
}

export function useAjax<TRes = any, TParams = any>({
  url,
  method = 'GET',
  params,
  data,
  headers,
}: UseAjaxProps<TRes, TParams>): UseAjaxResult<TRes> {
  let [response, setResponse] = useState<{ data: TRes }>();
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    axios
      .request<TRes>({
        method,
        url,
        params,
        headers,
        data,
      })
      .then((res: any) => {
        setResponse(res);
        setLoading(false);
      })
      .catch((res) => {
        setError(res);
        setLoading(false);
      });
  }, [data, headers, url, params, method]);

  return {
    response: response as any,
    loading,
    error,
  };
  // refetch
}
