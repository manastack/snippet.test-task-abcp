export const mapQueryParamsToString = (
  queryParams: Record<string, string>,
): string => {
  const entryList: [string, string][] = Object.entries(queryParams)
  return !entryList.length
    ? ''
    : `?${entryList.map(([key, value]) => `${key}=${value}`).join('&')}`
}
