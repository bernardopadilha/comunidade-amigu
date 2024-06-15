import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: 'Esse campo não pode ser vazio',
        required_error: 'Esse campo não pode ser vazio',
      })
      .nonempty('Por favor digite seu nome!'),

    email: z
      .string({
        invalid_type_error: 'Esse campo não pode ser vazio',
        required_error: 'Esse campo não pode ser vazio',
      })
      .nonempty('Por favor digite seu email!')
      .email('Por favor digite um email válido!'),

    password: z
      .string({
        invalid_type_error: 'Esse campo não pode ser vazio',
        required_error: 'Esse campo não pode ser vazio',
      })
      .nonempty('Por favor digite sua senha!'),

    confirmPassword: z
      .string({
        invalid_type_error: 'Esse campo não pode ser vazio',
        required_error: 'Esse campo não pode ser vazio',
      })
      .nonempty('Por favor confirme sua senha!'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'], // Path of error for the custom validation
  })
export type SignUpData = z.infer<typeof signUpSchema>
