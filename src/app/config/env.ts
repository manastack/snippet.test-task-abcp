const envList = ['VITE_REACT_QUERY_DEVTOOLS_ENABLED', 'VITE_TIMESTAMP'] as const

type EnvKey = typeof envList[number]

const envConfig: Record<EnvKey, 'boolean' | 'number' | 'string'> = {
  VITE_REACT_QUERY_DEVTOOLS_ENABLED: 'boolean',
  VITE_TIMESTAMP: 'string',
}

export const env: Record<
  EnvKey,
  boolean | null | number | string
> = Object.keys(envConfig).reduce((acc, key) => {
  const type = envConfig[key as EnvKey]
  const value = import.meta.env[key as EnvKey] ?? null
  if (value === null) {
    return { ...acc, [key]: null }
  }

  switch (type) {
    case 'boolean':
      return { ...acc, [key]: value === 'true' }

    case 'number':
      return {
        ...acc,
        [key]: Number.isNaN(+value) ? null : +value,
      }

    default:
      return { ...acc, [key]: value }
  }
}, {} as Record<EnvKey, boolean | null | number | string>)
