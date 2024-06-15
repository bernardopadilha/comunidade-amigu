import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Esse campo não pode ser vázio',
      required_error: 'Esse campo não pode ser vázio',
    })
    .nonempty('Por favor digite seu email!'),

  password: z
    .string({
      invalid_type_error: 'Esse campo não pode ser vázio',
      required_error: 'Esse campo não pode ser vázio',
    })
    .nonempty('Por favor digite sua senha!'),
})
export type LoginData = z.infer<typeof loginSchema>
