import { Cog } from 'lucide-react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
// import { Skeleton } from '../ui/skeleton'

export function SideBar() {
  return (
    <aside className="shrink-0 max-h-80 lg:sticky lg:top-20 w-full lg:w-80 bg-post/80 backdrop-blur-sm border-2 border-zinc-800 rounded-lg overflow-hidden">
      {/* <Skeleton className="h-24 w-full relative rounded-none" /> */}
      <div className="relative">
        <img src="banner.png" alt="" className="w-full h-24 object-cover" />
        <Button
          size="icon"
          className="absolute top-2 right-2 bg-amigu hover:bg-amigu group"
        >
          <Cog className="text-white bg-amigu group-hover:rotate-45 duration-500" />
        </Button>
      </div>

      <div className="flex flex-col items-center ">
        {/* <Skeleton className="h-28 w-28 rounded-full relative -top-12" /> */}
        <img
          src="https://github.com/Bernardopadilha.png"
          alt="Foto de Bernardo Alves Padilha"
          className="rounded-full w-28 relative -top-12"
        />

        <div className="-mt-8 flex flex-col items-center pb-6">
          {/* <Skeleton className="h-6 w-36" /> */}
          <h6 className="text-gray-100 font-medium text-lg">
            Bernardo Padilha
          </h6>

          {/* <Skeleton className="h-3 w-28 mt-1" /> */}
          <span className="text-zinc-400 text-xs">@bernardopadilha</span>
        </div>

        <Separator className="bg-zinc-700" />

        <div className="p-6 flex flex-col items-center justify-center">
          {/* <Skeleton className="h-4 w-44" /> */}
          <span className="text-sm text-zinc-400 whitespace-nowrap">
            Desde 11 de Junho de 2024
          </span>
        </div>
      </div>
    </aside>
  )
}
