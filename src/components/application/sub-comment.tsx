import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
} from '../ui/alert-dialog'

import { Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { GetUserById } from '@/api/users/get-user-by-id'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  isYesterday,
} from 'date-fns'
import { DeleteComment } from '@/api/comments/delete-comment'
import { toast } from 'sonner'

interface SubCommentProps {
  userId: number
  createdAt: Date
  content: string
  userIdAtPost: number
  userLoggedId: number
  subCommentId: string
  refetchSubComments: () => void
}

export function SubComment({
  userId,
  content,
  createdAt,
  userIdAtPost,
  userLoggedId,
  subCommentId,
  refetchSubComments,
}: SubCommentProps) {
  const { data: GetUserSubCommentsByIdFn } = useQuery({
    queryKey: ['pending', String(userId)],
    queryFn: GetUserById,
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

  async function handleDeleteSubComment() {
    await DeleteCommentFn(subCommentId)
    refetchSubComments()
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

  const urlRegex = /https?:\/\/[^\s]+/g
  const hashTagRegex = /#[^\s#]+/g

  // Dividir o conteúdo em linhas
  const lines = content.split('\n')

  return (
    <div className="w-full flex mt-2">
      <>
        {GetUserSubCommentsByIdFn && GetUserSubCommentsByIdFn.avatarUrl ? (
          <img
            src={GetUserSubCommentsByIdFn.avatarUrl}
            alt="Foto de perfil"
            className="rounded-md w-10 h-10"
          />
        ) : (
          <div className="w-12 h-12 rounded-md flex items-center justify-center bg-[#252528]">
            <span className="text-xl font-semibold">
              {GetUserSubCommentsByIdFn?.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </>

      <div className="flex-1 pl-4">
        <div className="bg-zinc-800 rounded-lg py-4 pb-1 px-4 relative group">
          <header className="flex items-start justify-between">
            <div className="flex flex-col">
              <h1 className="text-white">{GetUserSubCommentsByIdFn?.name}</h1>
              <time className="text-[#8D8D99] text-xs">
                {publishedDateFormatted}
              </time>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  className={`${userLoggedId === userId || userIdAtPost === userLoggedId ? 'w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent text-zinc-200 hover:bg-red-500 duration-150 absolute top-2 right-2' : 'hidden'} `}
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
                    onClick={handleDeleteSubComment}
                    className="bg-amigu text-white hover:bg-amigu hover:opacity-80"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </header>
          <p className="text-white py-4">
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
          </p>
        </div>
      </div>
    </div>
  )
}
