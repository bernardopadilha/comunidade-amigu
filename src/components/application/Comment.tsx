import { Trash } from 'lucide-react'
import { Button } from '../ui/button'

interface CommentProps {
  content: string
  onDeleteComment: (comment: string) => void
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  function handleDeleteComment() {
    console.log('delete comment')

    onDeleteComment(content)
  }

  return (
    <div className="w-full h-[120px] flex mb-9">
      <img
        src="https://github.com/rafaelppereira.png"
        alt="Foto de Bernardo Alves Padilha"
        className="rounded-md w-12 h-12 border-2 border-zinc-600"
      />

      <div className="flex-1 pl-4">
        <div className="bg-zinc-800 rounded-lg pt-4 pb-1 px-4 relative group">
          <header className="flex items-start justify-between">
            <div className="flex flex-col">
              <h1 className="text-white">Bernardo Padilha</h1>
              <time className="text-[#8D8D99] text-xs">
                Publicado há 1 hora
              </time>
            </div>

            <Button
              onClick={handleDeleteComment}
              size="icon"
              className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent text-zinc-200 hover:bg-red-500 duration-150 absolute top-2 right-2"
            >
              <Trash className="size-4" />
            </Button>
          </header>
          <p className="text-white pt-4">{content}</p>

          <button className="text-xs font-medium hover:brightness-75 duration-150 text-zinc-400 opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity">
            Responder
          </button>
        </div>
      </div>
    </div>
  )
}
