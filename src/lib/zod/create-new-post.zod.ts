import { z } from 'zod'

export const createPostSchema = z.object({
  content: z
    .string({
      invalid_type_error: 'Esse campo precisa ser um texto',
      required_error: 'Por favor nos conte sobre sua experiência',
    })
    .nonempty('Por favor nos conte sobre sua experiência'),
})
export type CreatePostData = z.infer<typeof createPostSchema>
