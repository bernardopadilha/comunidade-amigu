/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable array-callback-return */
import { useState } from 'react'
import { Button } from '../ui/button'
import { Bookmark, Heart, MessageCircle } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GetUserById } from '@/api/users/get-user-by-id'
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  isYesterday,
} from 'date-fns'
import { LikeAtPost } from '@/api/posts/like-at-post'
import { toast } from 'sonner'
import { SaveAtPost } from '@/api/posts/save-at-post'
import { NewComment } from './new-comment'
import { FindAllLikes } from '@/api/posts/find-all-likes'
import { FindAllComments } from '@/api/comments/find-all-comments'
import { Comment } from './Comment'

interface PostProps {
  userId: number
  postId: number
  publishedAt: Date
  content: string
}

export function Post({ userId, postId, content, publishedAt }: PostProps) {
  const [activeComments, setActiveComments] = useState<boolean>(false)
  const [activeLike, setActiveLike] = useState<boolean>(false)
  const [activeSave, setActiveSave] = useState<boolean>(false)

  const { data: GetUserByIdFn, isPending } = useQuery({
    queryKey: ['pending', String(userId)],
    queryFn: GetUserById,
  })

  const { data: FindAllLikesFn, refetch: refetchLikes } = useQuery({
    queryKey: ['pending', String(userId), String(postId)],
    queryFn: FindAllLikes,
  })

  const { data: FindAllCommentsFn, refetch: refetchComments } = useQuery({
    queryKey: ['comments', String(postId)],
    queryFn: FindAllComments,
  })

  const { mutateAsync: LikeAtPostFn, isPending: pendingLike } = useMutation({
    mutationKey: ['likeAtPost'],
    mutationFn: LikeAtPost,
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { mutateAsync: SaveAtPostFn, isPending: pendingSave } = useMutation({
    mutationKey: ['saveAtPost'],
    mutationFn: SaveAtPost,
    onError: (error) => {
      toast.error(error.message)
    },
  })

  async function handleLikeAtPost() {
    const credentials = {
      userId,
      postId,
    }
    await LikeAtPostFn(credentials)
    setActiveLike(!activeLike)
    await refetchLikes()
  }

  async function handleSaveAtPost() {
    const credentials = {
      userId,
      postId,
    }
    await SaveAtPostFn(credentials)
    setActiveSave(!activeSave)
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

  const publishedDateFormatted = formatPublishedDate(publishedAt)

  // Regex para detectar URLs e hashtags
  const urlRegex = /https?:\/\/[^\s]+/g
  const hashTagRegex = /#[^\s#]+/g

  // Dividir o conteúdo em linhas
  const lines = content.split('\n')

  return (
    <div
      className={`${activeComments ? 'py-4' : 'pt-4'} w-full bg-post/60 backdrop-blur-sm border-2 border-zinc-700  rounded-lg mb-8`}
    >
      {/* Header */}
      <header className="text-white md:px-10 px-5 flex justify-between items-center pb-6">
        <div className="flex items-center">
          {isPending ? (
            <Skeleton className="shrink-0 w-16 h-16 rounded-md" />
          ) : (
            <>
              {GetUserByIdFn && GetUserByIdFn.avatarUrl ? (
                <img
                  src={GetUserByIdFn.avatarUrl}
                  alt="Foto de perfil"
                  className="rounded-md w-16 h-16"
                />
              ) : (
                <div className="w-16 h-16 rounded-md flex items-center justify-center bg-[#252528]">
                  <span className="text-xl font-semibold">
                    {GetUserByIdFn?.name.charAt(0).toUpperCase()}{' '}
                  </span>
                </div>
              )}
            </>
          )}
          <div className="pl-4">
            {isPending ? (
              <Skeleton className="shrink-0 w-44 h-6 rounded-md" />
            ) : (
              <h6 className="font-bold text-base">
                {GetUserByIdFn && GetUserByIdFn.name}
              </h6>
            )}

            {isPending ? (
              <Skeleton className="shrink-0 w-24 h-4 rounded-md mt-2" />
            ) : (
              <p className="text-[#8D8D99] text-xs">
                {GetUserByIdFn && GetUserByIdFn.specialty}
              </p>
            )}
          </div>
        </div>
        {isPending ? (
          <Skeleton className="shrink-0 w-24 h-4 rounded-md mt-1" />
        ) : (
          <time className="text-[#8D8D99] text-sm hidden md:block">
            {publishedDateFormatted}
          </time>
        )}
      </header>

      {/* Content */}
      <div className="md:px-10 px-5">
        {isPending ? (
          <>
            <Skeleton className="shrink-0 w-24 h-6 rounded-md" />
            <Skeleton className="shrink-0 w-full h-6 rounded-md mt-1" />
            <Skeleton className="shrink-0 w-2/3 h-6 rounded-md mt-1" />

            <Skeleton className="shrink-0 w-52 h-6 rounded-md mt-5" />
            <Skeleton className="shrink-0 w-56 h-6 rounded-md mt-1" />
          </>
        ) : (
          <>
            {lines.map((line, index) => {
              // Se a linha estiver vazia, retorna um <br /> para pular uma linha
              if (line.trim() === '') {
                return <br key={index} />
              }

              // Dividir a linha em partes de acordo com espaços, mantendo os delimitadores
              const words = line.split(/(\s+)/)

              // Processar cada palavra
              const processedLine = words.map((word, wordIndex) => {
                if (urlRegex.test(word)) {
                  // Exibir apenas a parte do URL a partir de 'www.'
                  const displayText = word.includes('www.')
                    ? word.split('www.')[1]
                    : word
                  return (
                    <a
                      href={word}
                      className="text-[#8d83ff] font-medium hover:underline hover:brightness-75"
                      key={wordIndex}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {displayText}
                    </a>
                  )
                } else if (hashTagRegex.test(word)) {
                  // Aplicar cor especial para hashtags
                  return (
                    <span
                      className="text-[#8d83ff] font-medium"
                      key={wordIndex}
                    >
                      {word}
                    </span>
                  )
                } else {
                  return <span key={wordIndex}>{word}</span>
                }
              })

              return <p key={index}>{processedLine}</p>
            })}
          </>
        )}
      </div>

      <Separator className="bg-zinc-600 mt-2" />

      {/* Buttons */}
      <div className="flex items-center justify-between md:px-10 px-5 py-2">
        <div className="flex items-center gap-3">
          {isPending ? (
            <Skeleton className="shrink-0 w-12 h-6 rounded-md mt-1" />
          ) : (
            <div className="flex items-center">
              <button
                onClick={handleLikeAtPost}
                disabled={pendingLike}
                className="bg-transparent hover:bg-transparent hover:text-red-500 text-zinc-200 p-2"
              >
                {activeLike ? (
                  <img src="./heart.svg" />
                ) : (
                  <Heart className="size-5" />
                )}
              </button>
              <span className="text-xs text-zinc-400 ml-1">
                {FindAllLikesFn &&
                  (FindAllLikesFn?.length > 1000
                    ? `${FindAllLikesFn.length + 'K'}`
                    : FindAllLikesFn.length)}
              </span>
            </div>
          )}

          {isPending ? (
            <Skeleton className="shrink-0 w-12 h-6 rounded-md mt-1" />
          ) : (
            <div className="flex items-center">
              <button
                onClick={() => setActiveComments(!activeComments)}
                className="bg-transparent hover:bg-transparent hover:text-blue-500 text-zinc-200 p-2"
              >
                {activeComments ? (
                  <img src="./message.svg" />
                ) : (
                  <MessageCircle className="size-5" />
                )}
              </button>
              <span className="text-xs text-zinc-400 ml-1">
                {FindAllCommentsFn &&
                  (FindAllCommentsFn?.length > 1000
                    ? `${FindAllCommentsFn.length + 'K'}`
                    : FindAllCommentsFn.length)}
              </span>
            </div>
          )}
        </div>
        {isPending ? (
          <Skeleton className="shrink-0 w-8 h-6 rounded-md mt-1" />
        ) : (
          <Button
            size="icon"
            onClick={handleSaveAtPost}
            disabled={pendingSave}
            className="bg-transparent hover:bg-transparent hover:text-amber-300 text-zinc-200"
          >
            {activeSave ? (
              <img src="./save.svg" />
            ) : (
              <Bookmark className="size-5" />
            )}
          </Button>
        )}
      </div>

      {activeComments && (
        <>
          <Separator className="bg-zinc-600" />
          <NewComment
            postId={postId}
            totalComments={FindAllCommentsFn ? FindAllCommentsFn.length : 0}
            refetchComments={refetchComments}
          />

          <div className="pt-8 md:px-10 px-5 flex flex-col gap-4">
            {FindAllCommentsFn &&
              FindAllCommentsFn.map((comment) => {
                return (
                  <Comment
                    postId={postId}
                    key={comment.id}
                    commentId={comment.id}
                    userId={comment.userId}
                    content={comment.content}
                    createdAt={comment.createdAt}
                    refetchComments={refetchComments}
                  />
                )
              })}
          </div>
        </>
      )}
    </div>
  )
}
