import { Button } from '../ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Skeleton } from '../ui/skeleton'

interface NoticesProps {
  pending: boolean
}

export function News({ pending }: NoticesProps) {
  return (
    <aside className="shrink-0 max-h-full hidden 2xl:block sticky top-20 w-80 bg-post/60 backdrop-blur-sm border-2 border-zinc-800 rounded-lg ">
      <div className="p-4 border-b-2 border-b-zinc-800 ">
        {pending ? (
          <Skeleton className="w-40 h-7" />
        ) : (
          <h1 className="text-xl font-semibold text-zinc-100">
            AmiGU Notícias
          </h1>
        )}
      </div>

      <div className="py-2 px-4 space-y-4">
        {pending ? (
          <div>
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-16 h-4 mt-1" />
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="truncate hover:bg-zinc-800 rounded-md p-1">
                  <h1 className="text-white truncate">
                    Varejo tem alta anual de 179% na oferta de vagas
                  </h1>
                  <span className="text-zinc-500 text-sm">24 minutos</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Varejo tem alta anual de 179% na oferta de vagas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {pending ? (
          <div>
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-16 h-4 mt-1" />
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="truncate hover:bg-zinc-800 rounded-md p-1">
                  <h1 className="text-white truncate">
                    Google anuncia funções anti-roubo no Android primeiro no
                    Brasil
                  </h1>
                  <span className="text-zinc-500 text-sm">24 minutos</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Google anuncia funções anti-roubo no Android primeiro no
                  Brasil
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {pending ? (
          <div>
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-16 h-4 mt-1" />
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="truncate hover:bg-zinc-800 rounded-md p-1">
                  <h1 className="text-white truncate">
                    Transição de carreira: profissionais dão dicas sobre seus
                    setores
                  </h1>
                  <span className="text-zinc-500 text-sm">24 minutos</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Transição de carreira: profissionais dão dicas sobre seus
                  setores
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {pending ? (
          <div>
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-16 h-4 mt-1" />
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="truncate hover:bg-zinc-800 rounded-md p-1">
                  <h1 className="text-white truncate">
                    Google anuncia funções anti-roubo no Android primeiro no
                    Brasil
                  </h1>
                  <span className="text-zinc-500 text-sm">24 minutos</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Google anuncia funções anti-roubo no Android primeiro no
                  Brasil
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {pending ? (
          <div>
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-16 h-4 mt-1" />
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="truncate hover:bg-zinc-800 rounded-md p-1">
                  <h1 className="text-white truncate">
                    Fundos de investimentos: saques superam aplicações em R$ 8,8
                    bi
                  </h1>
                  <span className="text-zinc-500 text-sm">24 minutos</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Fundos de investimentos: saques superam aplicações em R$ 8,8
                  bi
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {pending ? (
          <div>
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-16 h-4 mt-1" />
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="truncate hover:bg-zinc-800 rounded-md p-1">
                  <h1 className="text-white truncate">
                    Pix tem 5º vazamento no ano; agora, com 20 mil chaves
                    expostas, diz BC
                  </h1>
                  <span className="text-zinc-500 text-sm">24 minutos</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Pix tem 5º vazamento no ano; agora, com 20 mil chaves
                  expostas, diz BC
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {pending ? (
          <div>
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-16 h-4 mt-1" />
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="truncate hover:bg-zinc-800 rounded-md p-1">
                  <h1 className="text-white truncate">
                    IPCA: inflação oficial sobe 0,46% em maio e avança a 3,93%
                    em 12 meses
                  </h1>
                  <span className="text-zinc-500 text-sm">24 minutos</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  IPCA: inflação oficial sobe 0,46% em maio e avança a 3,93% em
                  12 meses
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {pending ? (
          <div>
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-16 h-4 mt-1" />
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="truncate hover:bg-zinc-800 rounded-md p-1">
                  <h1 className="text-white truncate">
                    Como pedir um aumento de salário?
                  </h1>
                  <span className="text-zinc-500 text-sm">24 minutos</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Como pedir um aumento de salário?</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="flex flex-col items-center justify-center p-6 rounded-b-md bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500">
        {pending ? (
          <Skeleton className="w-48 h-10" />
        ) : (
          <Button className="text-white px-10 bg-zinc-800/90 hover:bg-zinc-800/90 hover:brightness-150 duration-150">
            Quero ser AmiGU
          </Button>
        )}
      </div>
    </aside>
  )
}
