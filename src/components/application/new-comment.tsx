import { SquareArrowOutUpRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useForm } from 'react-hook-form'
import {
  CreateCommentData,
  createCommentSchema,
} from '@/lib/zod/create-comment.zod'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'

import { getUserLogged } from '@/api/auth/get-user'
import { CreateComment } from '@/api/comments/create-comment'

interface NewCommentProps {
  postId: number
  totalComments: number
  refetchComments: () => void
}

export function NewComment({ postId, refetchComments }: NewCommentProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCommentData>({
    resolver: zodResolver(createCommentSchema),
  })

  const { data: getUserLoggedFn } = useQuery({
    queryKey: ['user'],
    queryFn: getUserLogged,
  })

  const { mutateAsync: CreateCommentFn, isPending } = useMutation({
    mutationKey: ['CreateComment'],
    mutationFn: CreateComment,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Comentário postado com sucesso!')
    },
  })

  async function handleCreateComment(data: CreateCommentData) {
    if (getUserLoggedFn) {
      const userId = getUserLoggedFn.id

      await CreateCommentFn({
        userId,
        comment: data.content,
        postId,
        commentId: null,
      })
      reset()
      await refetchComments()
    }
  }

  return (
    <div>
      <form
        onClick={handleSubmit(handleCreateComment)}
        className="mt-6 md:px-10 px-5"
      >
        <h6 className="text-white pb-4">Deixe seu comentário</h6>

        <Textarea
          required
          className="bg-[#252528] border-[1px] text-white rounded-lg border-none resize-none h-32 p-3"
          {...register('content')}
          placeholder="Digite aqui..."
        />

        {errors.content && (
          <span className="text-xs text-rose-500">
            {errors.content.message}
          </span>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            size="sm"
            disabled={isPending}
            className="bg-amigu hover:bg-amigu hover:brightness-75 text-zinc-200 flex items-center justify-end gap-2 mt-2 rounded"
          >
            {isSubmitting || isPending ? (
              <div className="w-4 h-4 border-2 border-zinc-300/90 animate-spin border-t-amigu rounded-full" />
            ) : (
              <span className="flex items-center gap-2">
                <SquareArrowOutUpRight className="size-4" />
                Publicar
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
