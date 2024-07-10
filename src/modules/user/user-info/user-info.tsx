import { FC } from 'react'

import { UserReadingModel } from '@entities/user'

type Props = {
  user: UserReadingModel
}

const UserInfo: FC<Props> = ({ user }) => {
  const renderTable = () => (
    <div className="flex h-[128px] w-[90%] gap-1 text-left text-sm text-gray-200">
      <div className="flex w-1/4 flex-col gap-1">
        <div className="flex h-[64px] items-center justify-center bg-stone-500 font-bold">
          id
        </div>
        <div className="flex h-[64px] items-center justify-center bg-stone-500">
          {user.id}
        </div>
      </div>
      <div className="flex w-1/4 flex-col gap-1">
        <div className="flex h-[64px] items-center justify-center bg-stone-500 font-bold">
          Username
        </div>
        <div className="flex h-[64px] items-center justify-center bg-stone-500">
          {user.name}
        </div>
      </div>
      <div className="flex w-1/2 flex-col gap-1">
        <div className="flex h-[64px] items-center justify-center bg-stone-500 font-bold">
          Phone number
        </div>
        <div className="flex h-[64px] items-center justify-center bg-stone-500">
          {user.phone}
        </div>
      </div>
    </div>
  )

  return renderTable()
}

export default UserInfo
