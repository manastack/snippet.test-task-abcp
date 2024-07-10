import { UserReadingDtoSchema } from '@entities/user'
import { ApiConfig } from '@shared/lib/api'

export enum MainQueryKey {
  User = 'User',
}

export const apiConfig: ApiConfig<MainQueryKey> = {
  [MainQueryKey.User]: {
    getUrl: (p) => `https://jsonplaceholder.typicode.com/users/${p!.id}`,
    method: 'get',
    responseSchema: UserReadingDtoSchema,
  },
}
