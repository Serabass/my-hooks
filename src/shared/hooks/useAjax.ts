import React, { useEffect, useState } from 'react';
import axios, { Method } from 'axios';

export interface UseAjaxProps<TRes> {
  url: string;
  method?: Method;
  params?: any;
  data?: any;
  headers?: any;
  loading?: React.ReactElement | null;
}

export interface UseAjaxResult<T> {
  response: { data: T };
  loading: boolean;
  error: any;
}

export function useAjax<T>({ url, method = 'GET', params, data, headers }: UseAjaxProps<T>): [UseAjaxResult<T>] {
  let [response, setResponse] = useState<{ data: T }>();
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    axios
      .request<T>({
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

  return [
    {
      response: response as any,
      loading,
      error,
    },
    // refetch
  ];
}
