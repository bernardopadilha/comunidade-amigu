import { z } from 'zod'

const fileOrUrl = z.union([
  z.instanceof(File), // Aceita um objeto do tipo File
  z.string().url(), // Aceita uma string que seja uma URL válida
])

export const updateUserSchema = z.object({
  name: z.string().optional(),
  avatarUrl: fileOrUrl.optional(),
  thumbnailUrl: fileOrUrl.optional(),
  username: z.string().optional(),
})

export type UpdateUserData = z.infer<typeof updateUserSchema>
