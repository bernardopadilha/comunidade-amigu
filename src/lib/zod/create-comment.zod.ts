import { z } from 'zod'

export const createCommentSchema = z.object({
  content: z
    .string({
      invalid_type_error: 'Esse campo precisa ser um texto',
      required_error: 'Por favor nos conte sobre sua experiência',
    })
    .nonempty('Por favor digite seu comentário'),
})
export type CreateCommentData = z.infer<typeof createCommentSchema>
