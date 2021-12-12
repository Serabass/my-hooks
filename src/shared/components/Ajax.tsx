import React from 'react';
import { useAjax, UseAjaxProps } from '../hooks/useAjax';

interface AjaxProps<T> extends UseAjaxProps<T> {
  children: (...any: any) => any;
  loadingNode?: () => React.ReactNode; // TODO
  errorNode?: (error: any) => React.ReactNode; // TODO
}

export function Ajax<T>({
  url,
  method = 'GET',
  params,
  inputData,
  headers,
  loadingNode,
  errorNode,
  children,
}: AjaxProps<T>) {
  let { loading, response, error } = useAjax({
    url,
    method,
    params,
    inputData,
    headers,
  });

  if (loadingNode && loading) {
    return loadingNode();
  }

  if (errorNode && error) {
    return errorNode(error);
  }

  return children({
    loading,
    url,
    method,
    params,
    response,
    headers,
  });
}
