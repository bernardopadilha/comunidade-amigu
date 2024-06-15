import { Keyboard, LogOut, Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { UserLogOut } from '@/api/auth/log-out'
import { useNavigate } from 'react-router-dom'
// import { Skeleton } from '../ui/skeleton'

interface HeaderProps {
  pending: boolean
}

export function Header({ pending }: HeaderProps) {
  const navigate = useNavigate()

  const { mutateAsync: logOutFN } = useMutation({
    mutationKey: ['logOut'],
    mutationFn: UserLogOut,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.error('Saindo da sua conta...')
    },
  })

  async function handleLogOut() {
    await logOutFN()
    navigate('/')
  }

  return (
    <header className="w-full fixed top-0 left-0 z-50 h-16 bg-header bg-post backdrop-blur-sm border-b-2 border-b-zinc-700 flex items-center justify-center px-0">
      <div className="max-w-[1420px] w-full mx-auto flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          {pending ? (
            <Skeleton className="h-10 w-10" />
          ) : (
            <Button
              size="icon"
              className="text-zinc-300 bg-zinc-800 border-2 border-zinc-600 hidden md:flex"
            >
              <Keyboard className="size-5" />
            </Button>
          )}

          {pending ? (
            <Skeleton className="h-10 w-24" />
          ) : (
            <img
              src="./logo-amigu.png"
              alt="logo amiGU"
              className="h-8 pointer-events-none select-none"
            />
          )}
        </div>
        {pending ? (
          <Skeleton className=" h-8 w-96" />
        ) : (
          <div className="relative hidden md:flex">
            <Search className="absolute size-4 text-zinc-300 top-1/2 -translate-y-1/2 left-3" />
            <Input
              className="h-8 w-96 bg-zinc-800 border-none pl-9 text-zinc-200 focus-visible:!ring-amigu focus-visible:ring-offset-0 transition-all outline-none"
              placeholder="Pesquisar..."
            />
          </div>
        )}

        {pending ? (
          <Skeleton className="h-10 w-10" />
        ) : (
          <Button
            onClick={handleLogOut}
            size="icon"
            className="bg-amigu hover:bg-amigu hover:brightness-90"
          >
            <LogOut className="text-white " />
          </Button>
        )}
      </div>
    </header>
  )
}
