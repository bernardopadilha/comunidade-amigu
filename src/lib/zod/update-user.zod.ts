import { z } from 'zod'

export const updateUserSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Esse campo não pode ser vazio',
      required_error: 'Esse campo não pode ser vazio',
    })
    .nonempty('Por favor digite seu nome!'),
  avatarUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  username: z
    .string({
      invalid_type_error: 'Esse campo não pode ser vazio',
      required_error: 'Esse campo não pode ser vazio',
    })
    .nonempty('Por favor digite seu username!'),
})

export type UpdateUserData = z.infer<typeof updateUserSchema>
