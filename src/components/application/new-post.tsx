/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '../ui/textarea'
import { useForm } from 'react-hook-form'
import { getUserLogged, userLoggedProps } from '@/api/auth/get-user'
import { SquareArrowOutUpRight } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createNewPost } from '@/api/posts/create-new-post'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CreatePostData, createPostSchema } from '@/lib/zod/create-new-post.zod'

interface NewPostProps {
  pending: boolean
  user: userLoggedProps | undefined
  refetch: any
}

export function NewPost({ pending, user, refetch }: NewPostProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostData>({
    resolver: zodResolver(createPostSchema),
  })

  const [dialogOpen, setDialogOpen] = useState(false)

  const { data: getUserFn } = useQuery({
    queryKey: ['user'],
    queryFn: getUserLogged,
  })

  const { mutateAsync: createPostFn, isPending } = useMutation({
    mutationKey: ['post'],
    mutationFn: createNewPost,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Post publicado...!')
    },
  })

  async function handleCreateNewPost(content: CreatePostData) {
    if (getUserFn) {
      const userId = getUserFn.id
      await createPostFn({ content: content.content, userId })

      reset()
      setDialogOpen(!dialogOpen)
    }
    await refetch()
  }

  return (
    <div className="bg-post/60 backdrop-blur-sm border-2 border-zinc-700 py-5 md:px-10 px-5 rounded-lg mb-8">
      {pending ? (
        <Skeleton className="w-36 h-8" />
      ) : (
        <span className="text-lg font-medium text-zinc-100">Nova postagem</span>
      )}
      <div className="flex items-center gap-5 mt-3">
        {pending ? (
          <Skeleton className="shrink-0 w-14 h-14 rounded-md" />
        ) : (
          <>
            {user && user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="Foto de perfil"
                className="rounded-md w-14 h-14 pointer-events-none select-none"
              />
            ) : (
              <div className="w-16 h-14 rounded-md flex items-center justify-center bg-[#252528]">
                <span className="text-lg font-semibold">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </>
        )}

        {pending ? (
          <Skeleton className="w-full h-14 rounded-md" />
        ) : (
          <Dialog
            open={dialogOpen}
            onOpenChange={() => setDialogOpen(!dialogOpen)}
          >
            <DialogTrigger asChild>
              <Button
                onClick={() => setDialogOpen(!dialogOpen)}
                className="w-full justify-start bg-[#252528] hover:bg-[#252528] hover:brightness-75 hover:cursor-text text-zinc-200 h-14 focus-visible:!ring-amigu focus-visible:ring-offset-0 border-none placeholder:text-zinc-200"
              >
                Comece uma publicação...
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Digite o que você está pensando</DialogTitle>
                <DialogDescription>
                  Compartilhe com nossa comunidade suas experiências e estudos{' '}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(handleCreateNewPost)}>
                {/* Limitar para até 3000 caracteres */}
                <Textarea
                  disabled={isSubmitting || isPending}
                  {...register('content')}
                  placeholder="Digite aqui..."
                  className="resize-none"
                />

                {errors.content && (
                  <span className="text-xs text-red-500 mt-3">
                    {errors.content.message}
                  </span>
                )}

                <DialogFooter>
                  <Button
                    disabled={isSubmitting || isPending}
                    type="submit"
                    className="bg-amigu hover:bg-amigu hover:brightness-75 text-zinc-200 flex items-center gap-2 mt-2 rounded disabled:opacity75 disabled:cursor-not-allowed"
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
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
