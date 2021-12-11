import React from 'react';
import { useAjax, UseAjaxProps } from '../hooks/useAjax';

interface AjaxProps<T> extends UseAjaxProps<T> {
  children: (...any: any) => any;
  loadingNode?: React.ReactElement; // TODO
}

export function Ajax<T>({ url, method = 'GET', params, data, headers, loadingNode, children }: AjaxProps<T>) {
  let { loading } = useAjax({
    url,
    method,
    params,
    data,
    headers,
  });

  if (loadingNode && loading) {
    return loadingNode;
  }

  return children({
    url,
    method,
    params,
    data,
    headers,
  });
}
