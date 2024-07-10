import { z } from 'zod'

import { UserReadingDtoSchema } from './user.reading.dto'

const UserReadingModelSchema = UserReadingDtoSchema

export type UserReadingModel = z.infer<typeof UserReadingModelSchema>
