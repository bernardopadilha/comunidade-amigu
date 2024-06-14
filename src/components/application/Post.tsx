/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable array-callback-return */
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { Button } from '../ui/button'
import {
  Bookmark,
  Heart,
  MessageCircle,
  MessageSquare,
  SquareArrowOutUpRight,
} from 'lucide-react'
import { Textarea } from '../ui/textarea'
import { Separator } from '../ui/separator'
import { Comment } from './Comment'
// import { Skeleton } from '../ui/skeleton'

interface Author {
  name: string
  role: string
  avatarUrl: string
}

export interface Content {
  type: 'paragraph' | 'link'
  content: string
}

interface PostProps {
  author: Author
  publishedAt: Date
  content: Content[]
}

export function Post({ author, content }: PostProps) {
  const [comments, setComments] = useState(['Post mto bacana, hein?!'])

  const [newCommentText, setNewCommentText] = useState('')

  const [activeComments, setActiveComments] = useState<boolean>(false)
  const [activeLike, setActiveLike] = useState<boolean>(false)
  const [activeSave, setActiveSave] = useState<boolean>(false)

  // const publishedDateFormatted = new Intl.DateTimeFormat('pt-BR', {
  //   day: '2-digit',
  //   month: 'long',
  //   hour: '2-digit',
  //   minute: '2-digit',
  // }).format(publishedAt)

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeleteOne = comments.filter((comment) => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeleteOne)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function handleKeyDown(e: any) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleCreateNewComment(e)
    }
  }

  return (
    <div
      className={`${activeComments ? 'pt-4' : 'pt-4'} w-full bg-post/80 backdrop-blur-sm border-2 border-zinc-700  rounded-lg mb-8`}
    >
      <header className="text-white md:px-10 px-5 flex justify-between items-center pb-6">
        <div className="flex items-center">
          {/* <Skeleton className="shrink-0 w-16 h-16 rounded-md" /> */}
          <img
            src={author.avatarUrl}
            alt="Foto de Bernardo Alves Padilha"
            className="rounded-md w-16 border-2 border-zinc-600"
          />
          <div className="pl-4">
            {/* <Skeleton className="shrink-0 w-44 h-6 rounded-md" /> */}
            <h6 className="font-bold text-base">{author.name}</h6>

            {/* <Skeleton className="shrink-0 w-24 h-4 rounded-md mt-2" /> */}
            <p className="text-[#8D8D99] text-xs">{author.role}</p>
          </div>
        </div>
        {/* <Skeleton className="shrink-0 w-24 h-4 rounded-md mt-1" /> */}
        <time className="text-[#8D8D99] text-sm hidden md:block">
          Publicado há 2h
        </time>
      </header>

      <div className="md:px-10 px-5">
        {/* <Skeleton className="shrink-0 w-24 h-6 rounded-md" />
        <Skeleton className="shrink-0 w-full h-6 rounded-md mt-1" />
        <Skeleton className="shrink-0 w-2/3 h-6 rounded-md mt-1" />

        <Skeleton className="shrink-0 w-52 h-6 rounded-md mt-5" />
        <Skeleton className="shrink-0 w-56 h-6 rounded-md mt-1" /> */}
        {content.map((line) => {
          if (line.type === 'paragraph') {
            return (
              <p key={line.content} className="pb-3 text-zinc-100">
                {line.content}
              </p>
            )
          } else if (line.type === 'link') {
            return (
              <p
                key={line.content}
                className="pt-3 font-semibold text-link hover:underline"
              >
                <a href="#">{line.content}</a>
              </p>
            )
          }
        })}
      </div>

      <Separator className="bg-zinc-600 mt-2" />

      <div className="flex items-center justify-between md:px-10 px-5 py-2">
        <div className="flex items-center gap-3">
          {/* <Skeleton className="shrink-0 w-16 h-6 rounded-md mt-1" /> */}
          <div className="flex items-center">
            <button
              onClick={() => setActiveLike(!activeLike)}
              className="bg-transparent hover:bg-transparent hover:text-red-500 text-zinc-200"
            >
              {activeLike ? (
                <img src="./heart.svg" />
              ) : (
                <Heart className="size-5" />
              )}
            </button>
            <span className="text-xs text-zinc-400 ml-1">2.2K</span>
          </div>

          {/* <Skeleton className="shrink-0 w-16 h-6 rounded-md mt-1" /> */}
          <div className="flex items-center">
            <button
              onClick={() => setActiveComments(!activeComments)}
              className="bg-transparent hover:bg-transparent hover:text-blue-500 text-zinc-200"
            >
              {activeComments ? (
                <img src="./message.svg" />
              ) : (
                <MessageCircle className="size-5" />
              )}
            </button>
            <span className="text-xs text-zinc-400 ml-1">300</span>
          </div>
        </div>
        {/* <Skeleton className="shrink-0 w-8 h-6 rounded-md mt-1" /> */}
        <Button
          size="icon"
          onClick={() => setActiveSave(!activeSave)}
          className="bg-transparent hover:bg-transparent hover:text-amber-300 text-zinc-200"
        >
          {activeSave ? (
            <img src="./save.svg" />
          ) : (
            <Bookmark className="size-5" />
          )}
        </Button>
      </div>

      {activeComments && <Separator className="bg-zinc-600" />}

      {activeComments && (
        <>
          <form
            onSubmit={handleCreateNewComment}
            className="mt-6 md:px-10 px-5"
          >
            <h6 className="text-white pb-4">Deixe seu comentário</h6>

            <Textarea
              value={newCommentText}
              placeholder="Digite aqui..."
              onChange={handleNewCommentChange}
              onInvalid={handleNewCommentInvalid}
              onKeyDown={handleKeyDown}
              required
              className="bg-[#252528] border-[1px] text-white rounded-lg border-none resize-none h-[82px] pl-2"
            />

            <Button
              type="submit"
              className="bg-amigu hover:bg-amigu hover:brightness-75 text-zinc-200 flex items-center gap-2 mt-2 rounded"
            >
              <SquareArrowOutUpRight className="size-5" />
              Publicar
            </Button>
          </form>

          <div className="pt-8 md:px-10 px-5">
            {comments.map((comment) => {
              return (
                <Comment
                  key={comment}
                  content={comment}
                  onDeleteComment={deleteComment}
                />
              )
            })}
          </div>

          <div className="md:px-10 px-5 mb-4 flex items-center justify-center">
            <Button className="w-full bg-transparent hover:bg-transparent hover:brightness-75 duration-150 text-zinc-50 flex items-center justify-center gap-1 p-1.5 border-2 border-zinc-300 rounded-sm">
              <MessageSquare className="size-4" />
              <span className="text-sm">Ver mais comentários</span>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
