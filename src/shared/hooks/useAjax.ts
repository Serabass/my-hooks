import React, { useEffect, useState } from 'react';
import { TTL } from '../chronoparse';
import 'node-fetch';
import { LocalForageCacheDriver } from '../ajax/remember';
import axios, { Method } from 'axios';
import { DefaultCacheKeyBuilder } from '../ajax/CacheKeyBuilder';

export interface CacheOptions {
  enabled?: boolean;
  ttl: TTL;
}

export type CacheField = boolean | TTL | CacheOptions;

export interface UseAjaxProps<TRes> {
  url: string;
  method?: Method;
  params?: any;
  data?: any;
  headers?: any;
  loading?: React.ReactElement | null;
  cache?: CacheField;
}

export interface UseAjaxResult<T> {
  response: { data: T };
  loading: boolean;
  cached: CacheField;
  error: any;
}

export function cacheEnabled(value?: CacheField): boolean {
  if (typeof value === 'undefined') {
    return false;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'object') {
    if (typeof value.enabled === 'undefined') {
      return true;
    }
    return value.enabled;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return true;
  }

  return false;
}

export function useAjax<T>({ url, method = 'GET', params, data, headers, cache }: UseAjaxProps<T>): [UseAjaxResult<T>] {
  let [response, setResponse] = useState<{ data: T }>();
  let [loading, setLoading] = useState(false);
  let [cached, setCached] = useState(false);
  let [error, setError] = useState<Error>();

  useEffect(() => {
    let key = DefaultCacheKeyBuilder.instance({ url, method, params, data, headers }).build();
    let cacheTtl: TTL = 0;

    if (typeof cache === 'object') {
      cacheTtl = cache.ttl;
    } else if (typeof cache === 'boolean') {
      cacheTtl = '10sec';
    } else if (typeof cache === 'string' || typeof cache === 'number') {
      cacheTtl = cache;
    }

    LocalForageCacheDriver.instance
      .remember<{ data: T }>(
        key,
        cacheTtl,
        cacheEnabled(cache),
        () => {
          setLoading(true);
          return axios
            .request<T>({
              method,
              url,
              params,
              headers,
              data,
            })
            .then((res) => ({
              data: res.data,
            }));
        },
        (cached: any) => {
          setCached(cached);
        },
      )
      .then((res: any) => {
        setResponse(res);
        setLoading(false);
      })
      .catch((res) => {
        setError(res);
        setLoading(false);
      });
  }, [data, headers, url, params, method, cache]);

  return [
    {
      response: response as any,
      loading,
      cached,
      error,
    },
    // refetch
  ];
}
