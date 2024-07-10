import { ZodType } from 'zod'

type ApiItemConfigBase = {
  getUrl: (p?: Record<string, unknown>) => string
}

export type ApiItemConfigReading = ApiItemConfigBase & {
  method: 'get'
  responseSchema: ZodType
}

export type ApiItemConfigMutation = ApiItemConfigBase & {
  method: 'put' | 'post' | 'delete'
  requestSchema: ZodType
  responseSchema: ZodType
}

export type ApiItemConfig = ApiItemConfigReading | ApiItemConfigMutation

export type ApiConfig<MainQueryKey extends string> = Record<
  MainQueryKey,
  ApiItemConfig
>
