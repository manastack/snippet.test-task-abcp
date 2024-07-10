import { FC, useCallback, useState } from 'react'
import { ZodTypeDef } from 'zod'

import { MainQueryKey } from '@app/config'
import { UserReadingDto, UserReadingModel } from '@entities/user'
import { useFetching } from '@shared/lib/api'
import { useThrottle } from '@shared/lib/throttle'
import { Button } from '@shared/ui/button'
import { UserInfo } from './user-info'

const User: FC = () => {
  const [id, setId] = useState<number | null>(null)
  const throttledId = useThrottle(id, 1000)

  type QueryKey = [MainQueryKey, number | string]

  const { data: user, isError } = useFetching<
    QueryKey,
    UserReadingModel,
    ZodTypeDef,
    UserReadingDto
  >({
    disabled: throttledId === null,
    queryKey: [MainQueryKey.User, throttledId ?? ''],
    urlParams: { id: throttledId ?? '' },
  })

  const handleButtonClick = useCallback(() => {
    setId(Math.ceil(Math.random() * 10))
  }, [])

  return (
    <>
      {user && <UserInfo {...{ user }} />}
      {isError && <div className="h-[128px]">Error fetching user</div>}
      {!user && <div className="h-[128px]" />}

      <Button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={handleButtonClick}
      >
        Click me {id ? `: now id is ${id}` : ''}
      </Button>
    </>
  )
}

export default User
