/* eslint-disable react/jsx-key */
import { SquareArrowOutUpRight, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  isYesterday,
} from 'date-fns'
import { GetUserById } from '@/api/users/get-user-by-id'
import { useMutation, useQuery } from '@tanstack/react-query'
import { DeleteComment } from '@/api/comments/delete-comment'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { getUserLogged } from '@/api/auth/get-user'
import { FindPostsById } from '@/api/posts/find-post-by-id'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CreateCommentData,
  createCommentSchema,
} from '@/lib/zod/create-comment.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateComment } from '@/api/comments/create-comment'
import { v4 } from 'uuid'
import { Textarea } from '../ui/textarea'
import { FindAllSubComments } from '@/api/comments/find-all-sub-comments'
import { SubComment } from './sub-comment'

interface CommentProps {
  userId: number
  postId: number
  content: string
  createdAt: Date
  commentId: string
  refetchComments: () => void
}

export function Comment({
  userId,
  postId,
  content,
  createdAt,
  commentId,
  refetchComments,
}: CommentProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCommentData>({
    resolver: zodResolver(createCommentSchema),
  })

  const [isOpen, setIsOpen] = useState(false)

  const { data: GetUserCommentsByIdFn } = useQuery({
    queryKey: ['pending', String(userId)],
    queryFn: GetUserById,
  })

  const { data: FindPostsByIdFn } = useQuery({
    queryKey: ['findPostsById', postId],
    queryFn: FindPostsById,
  })

  const { data: FindAllSubCommentsFn, refetch: refetchSubComments } = useQuery({
    queryKey: ['findAllSubComments', String(postId), commentId],
    queryFn: FindAllSubComments,
  })

  const { data: getUserLoggedFn } = useQuery({
    queryKey: ['user'],
    queryFn: getUserLogged,
  })

  const { mutateAsync: DeleteCommentFn } = useMutation({
    mutationKey: ['DeleteComment'],
    mutationFn: DeleteComment,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Comentário deletado!')
    },
  })

  async function handleDeleteComment() {
    await DeleteCommentFn(commentId)
    await refetchComments()
  }

  const { mutateAsync: CreateSubCommentFn, isPending } = useMutation({
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

      const uuid = v4()

      await CreateSubCommentFn({
        id: uuid,
        userId,
        comment: data.content,
        postId,
        commentId,
      })
      reset()
      await refetchSubComments()
    }
  }

  function formatPublishedDate(publishedAt: Date) {
    const now = new Date()
    const minutesDifference = differenceInMinutes(now, publishedAt)
    const hoursDifference = differenceInHours(now, publishedAt)
    const daysDifference = differenceInDays(now, publishedAt)

    if (minutesDifference < 1) {
      return 'Publicado agora'
    } else if (minutesDifference < 60) {
      return `Publicado há ${minutesDifference} minuto${minutesDifference > 1 ? 's' : ''}`
    } else if (hoursDifference < 24) {
      return `Publicado há ${hoursDifference} hora${hoursDifference > 1 ? 's' : ''}`
    } else if (isYesterday(publishedAt)) {
      return 'Publicado ontem'
    } else if (daysDifference >= 2) {
      return `Publicado há ${daysDifference} dia${daysDifference > 1 ? 's' : ''}`
    }
  }

  const publishedDateFormatted = formatPublishedDate(createdAt)

  return (
    <div className="flex flex-col items-end">
      <div className="w-full flex">
        <>
          {GetUserCommentsByIdFn && GetUserCommentsByIdFn.avatarUrl ? (
            <img
              src={GetUserCommentsByIdFn.avatarUrl}
              alt="Foto de perfil"
              className="rounded-md w-16 h-16"
            />
          ) : (
            <div className="w-12 h-12 rounded-md flex items-center justify-center bg-[#252528]">
              <span className="text-xl font-semibold">
                {GetUserCommentsByIdFn?.name.charAt(0).toUpperCase()}{' '}
              </span>
            </div>
          )}
        </>

        <div className="flex-1 pl-4">
          <div className="bg-zinc-800 rounded-lg pt-4 pb-1 px-4 relative group">
            <header className="flex items-start justify-between">
              <div className="flex flex-col">
                <h1 className="text-white">{GetUserCommentsByIdFn?.name}</h1>
                <time className="text-[#8D8D99] text-xs">
                  {publishedDateFormatted}
                </time>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    className={`${getUserLoggedFn?.id === userId || FindPostsByIdFn?.userId === getUserLoggedFn?.id ? 'w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent text-zinc-200 hover:bg-red-500 duration-150 absolute top-2 right-2' : 'hidden'} `}
                  >
                    <Trash className="size-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Você tem certeza que deseja deletar este comentário?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação não pode ser desfeita. Isso excluirá
                      permanentemente este comemtário de nossos servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteComment}
                      className="bg-amigu text-white hover:bg-amigu hover:opacity-80"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </header>
            <p className="text-white pt-4">{content}</p>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs font-medium hover:brightness-75 duration-150 text-zinc-400 opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity"
            >
              Responder
            </button>
          </div>

          {FindAllSubCommentsFn &&
            getUserLoggedFn &&
            FindAllSubCommentsFn.map((comments) => {
              return (
                <SubComment
                  key={comments.id}
                  userId={comments.userId}
                  subCommentId={comments.id}
                  content={comments.content}
                  createdAt={comments.createdAt}
                  refetchSubComments={refetchSubComments}
                  userIdAtPost={userId}
                  userLoggedId={getUserLoggedFn.id}
                />
              )
            })}
        </div>
      </div>

      {isOpen && (
        <form onClick={handleSubmit(handleCreateComment)} className="mt-4">
          <Textarea
            required
            className="  bg-[#252528] border-[1px] text-white rounded-lg border-none resize-none h-24 p-3"
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
              size="sm"
              type="submit"
              disabled={isPending}
              className="bg-amigu hover:bg-amigu hover:brightness-75 text-zinc-200 flex items-center justify-end gap-2 mt-2 rounded"
            >
              {isSubmitting || isPending ? (
                <div className="w-4 h-4 border-2 border-zinc-300/90 animate-spin border-t-amigu rounded-full" />
              ) : (
                <span className="flex items-center gap-2 text-xs">
                  <SquareArrowOutUpRight className="size-3" />
                  Publicar
                </span>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
