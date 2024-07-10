import { useCallback, useContext } from 'react'
import { QueryFunction, useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { ZodError, ZodType, ZodTypeDef } from 'zod'

import { ApiContext } from './api.context'
import { useApiListeners } from './use.api-listeners'
import { useAxiosInstance } from './use.axios-instance'

export const useFetching = <
  QueryKey extends (string | number)[],
  ResponseModel extends unknown,
  ResponseDef extends ZodTypeDef = ZodTypeDef,
  ResponseDto = ResponseModel
>({
  disabled = false,
  urlParams,
  queryKey,
}: {
  disabled?: boolean
  urlParams?: Record<string, unknown>
  queryKey: QueryKey
}): UseQueryResult<ResponseModel> => {
  const { config } = useContext(ApiContext)

  const { getUrl, method } = config[queryKey[0]]

  const responseSchema = config[queryKey[0]].responseSchema as ZodType<
    ResponseModel,
    ResponseDef,
    ResponseDto
  >

  const axiosInstance: AxiosInstance = useAxiosInstance()

  const { onError, onLoading, onSuccess } = useApiListeners()

  const url = getUrl(urlParams)

  const queryFn: QueryFunction<
    ResponseModel | null,
    QueryKey
  > = useCallback(async (): Promise<ResponseModel | null> => {
    if (disabled) {
      return null
    }

    onLoading()

    try {
      const response: AxiosResponse<ResponseDto> = await axiosInstance({
        method,
        url,
      })

      const modelData = responseSchema.parse(response.data)

      onSuccess()

      return modelData
    } catch (error) {
      if (error instanceof AxiosError) {
        onError('error by data fetching')
        throw error
      }

      if (error instanceof ZodError) {
        onError('error by response-data parsing (dto to model)', error)
        throw error
      }

      throw error
    }
  }, [
    axiosInstance,
    disabled,
    method,
    onError,
    onLoading,
    onSuccess,
    responseSchema,
    url,
  ])

  return useQuery<ResponseModel | null, Error, ResponseModel, QueryKey>(
    queryKey,
    queryFn,
  )
}
