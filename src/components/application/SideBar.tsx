import { Cog } from 'lucide-react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'

interface SidebarProps {
  thumbnailUrl?: string
  avatarUrl?: string
  name: string
  username: string
  createdAt: Date | string
  pending: boolean
}

export function SideBar({
  name,
  pending,
  username,
  avatarUrl,
  createdAt,
  thumbnailUrl,
}: SidebarProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function formatDate(dateString: any) {
    const date = new Date(dateString)

    const day = date.getDate()
    const month = date.toLocaleString('pt-BR', { month: 'long' })
    const year = date.getFullYear()

    return `Desde ${day} de ${month.charAt(0).toUpperCase() + month.slice(1)} de ${year}`
  }

  const date = formatDate(createdAt)

  return (
    <aside className="shrink-0 max-h-80 lg:sticky lg:top-20 w-full lg:w-80 bg-post/80 backdrop-blur-sm border-2 border-zinc-800 rounded-lg overflow-hidden">
      {pending ? (
        <Skeleton className="h-24 w-full relative rounded-none" />
      ) : (
        <div className="relative">
          <img src={thumbnailUrl} alt="" className="w-full h-24 object-cover" />
          <Button
            size="icon"
            className="absolute top-2 right-2 bg-amigu hover:bg-amigu hover:brightness-90 group"
          >
            <Cog className="text-white bg-amigu group-hover:rotate-45 duration-500" />
          </Button>
        </div>
      )}

      <div className="flex flex-col items-center ">
        {pending ? (
          <Skeleton className="h-28 w-28 rounded-full relative -top-12" />
        ) : (
          <img
            src={avatarUrl}
            alt="Foto de Bernardo Alves Padilha"
            className="rounded-full w-28 relative -top-12"
          />
        )}

        <div className="-mt-8 flex flex-col items-center pb-6">
          {pending ? (
            <Skeleton className="h-6 w-36" />
          ) : (
            <h6 className="text-gray-100 font-medium text-lg">{name}</h6>
          )}

          {pending ? (
            <Skeleton className="h-3 w-28 mt-1" />
          ) : (
            <span className="text-zinc-400 text-xs">{username}</span>
          )}
        </div>

        <Separator className="bg-zinc-700" />

        <div className="p-6 flex flex-col items-center justify-center">
          {pending ? (
            <Skeleton className="h-4 w-44" />
          ) : (
            <span className="text-sm text-zinc-400 whitespace-nowrap">
              {date}
            </span>
          )}
        </div>
      </div>
    </aside>
  )
}
