/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Cog, PencilIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { Separator } from '../ui/separator'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateUserData, updateUserSchema } from '@/lib/zod/update-user.zod'
import { Input } from '../ui/input'
import { getUserLogged } from '@/api/auth/get-user'
import { useMutation, useQuery } from '@tanstack/react-query'
import { UpdateProfileUser } from '@/api/users/update-profile-user'

export function SideBar() {
  const [isOpen, setIsOpen] = useState(false)

  const { data: getUserLoggedFn, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUserLogged,
  })

  function formatDate(dateString: Date | string) {
    const date = new Date(dateString)

    const day = date.getDate()
    const month = date.toLocaleString('pt-BR', { month: 'long' })
    const year = date.getFullYear()

    return `Desde ${day} de ${month.charAt(0).toUpperCase() + month.slice(1)} de ${year}`
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
  })

  const { mutateAsync: UpdateProfileUserFn, isPending: pendingUpdateUser } =
    useMutation({
      mutationKey: ['updateProfileUser'],
      mutationFn: UpdateProfileUser,
    })

  const [thumbnailUrlChange, setThumbnailUrlChange] = useState<
    string | undefined
  >()
  const [avatarUrlChange, setAvatarUrlChange] = useState<string | undefined>()

  console.log(thumbnailUrlChange, avatarUrlChange)

  async function handleUpdateUser(data) {
    if (getUserLoggedFn) {
      // UpdateProfileUser(Number(getUserLoggedFn.id))
    }
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'avatarUrl' | 'thumbnailUrl',
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      if (type === 'avatarUrl') {
        setAvatarUrlChange(url)
      } else {
        setThumbnailUrlChange(url)
      }
      setValue(type, url)
    }
  }

  const date = formatDate(getUserLoggedFn?.createdAt ?? '')

  useEffect(() => {
    if (getUserLoggedFn) {
      setValue('name', getUserLoggedFn.name)
      setValue('username', getUserLoggedFn.username)
      if (getUserLoggedFn.active) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
  }, [getUserLoggedFn])

  return (
    <>
      <aside className="shrink-0 max-h-80 lg:sticky lg:top-20 w-full lg:w-80 bg-post/60 backdrop-blur-sm border-2 border-zinc-800 rounded-lg overflow-hidden">
        {isPending ? (
          <Skeleton className="h-24 w-full relative rounded-none" />
        ) : (
          <div className="relative">
            {getUserLoggedFn?.thumbnailUrl ? (
              <img
                src={getUserLoggedFn?.thumbnailUrl}
                alt="banner"
                className="w-full h-24 object-cover"
              />
            ) : (
              <div className="w-full h-24 object-cover bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900" />
            )}

            {getUserLoggedFn && (
              <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    className="absolute top-2 right-2 bg-zinc-800 hover:bg-zinc-800 hover:brightness-75 group"
                  >
                    <Cog className="text-white group-hover:rotate-45 duration-500" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {isOpen
                        ? 'Seja bem vindo a comunidade AmiGU'
                        : 'Insira suas credenciais'}
                    </DialogTitle>
                    <DialogDescription>
                      Aproveite para deixar suas informações sempre atualizadas
                      e seu perfil ainda mais interessante!
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={handleSubmit(handleUpdateUser)}
                    className="flex flex-col items-center justify-center space-y-4"
                  >
                    <div className="w-full max-w-sm border-2 border-zinc-800 rounded-md flex flex-col justify-center">
                      <div className="relative">
                        <div
                          style={
                            getUserLoggedFn?.thumbnailUrl
                              ? {
                                  backgroundImage: `url(${getUserLoggedFn?.thumbnailUrl})`,
                                }
                              : {}
                          }
                          className={`${
                            getUserLoggedFn?.thumbnailUrl
                              ? 'bg-cover bg-center bg-no-repeat'
                              : 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900'
                          } inset-0 w-full flex flex-col items-center justify-center h-28 rounded hover:brightness-50 shadow-3xl`}
                        >
                          <Button
                            size="icon"
                            className="absolute top-2 right-2 bg-zinc-800 hover:bg-zinc-800 hover:brightness-75"
                          >
                            <PencilIcon className="size-4 text-white" />
                          </Button>

                          <Input
                            type="file"
                            {...register('thumbnailUrl')}
                            accept=".jpeg, .jpg, .png, .webp, .svg"
                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                            onChange={(e) =>
                              handleFileChange(e, 'thumbnailUrl')
                            }
                          />
                        </div>
                      </div>

                      <div className="flex flex-col items-center ">
                        <div className="-mt-8 flex flex-col items-center pb-6">
                          <Input
                            type="text"
                            {...register('name')}
                            className="bg-transparent "
                            placeholder="Nome"
                          />
                          {errors.name && <p>{errors.name.message}</p>}

                          <Input
                            type="text"
                            {...register('username')}
                            className="bg-transparent max-w-40 mt-2"
                            placeholder="Insira um username válido"
                          />
                          {errors.username && <p>{errors.username.message}</p>}
                        </div>

                        <div className="bg-zinc-700 h-px w-full" />

                        <div className="p-6 flex flex-col items-center justify-center">
                          <span className="text-sm text-zinc-400 whitespace-nowrap">
                            {date}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:justify-end flex space-x-2">
                      <button
                        type="button"
                        disabled={isSubmitting}
                        className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded"
                      >
                        Cancelar
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-zinc-300 animate-spin border-t-white rounded-full" />
                        ) : (
                          <span>Salvar</span>
                        )}
                      </button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        )}

        <div className="flex flex-col items-center ">
          {isPending ? (
            <Skeleton className="h-28 w-28 rounded-full relative -top-12" />
          ) : (
            <>
              {getUserLoggedFn?.avatarUrl ? (
                <img
                  src={getUserLoggedFn?.avatarUrl}
                  alt="Foto de perfil"
                  className="rounded-full w-28 h-28 relative -top-12"
                />
              ) : (
                <div className="w-28 h-28 rounded-full flex items-center justify-center relative -top-12 bg-zinc-800">
                  <span className="text-3xl font-semibold">
                    {getUserLoggedFn?.name.charAt(0).toUpperCase()}{' '}
                  </span>
                </div>
              )}
            </>
          )}

          <div className="-mt-8 flex flex-col items-center pb-6">
            {isPending ? (
              <Skeleton className="h-6 w-36" />
            ) : (
              <h6 className="text-gray-100 font-medium text-lg">
                {getUserLoggedFn?.name}
              </h6>
            )}

            {isPending ? (
              <Skeleton className="h-3 w-28 mt-1" />
            ) : (
              <span className="text-zinc-400 text-xs">
                {getUserLoggedFn?.username}
              </span>
            )}
          </div>

          <Separator className="bg-zinc-700" />

          <div className="p-6 flex flex-col items-center justify-center">
            {isPending ? (
              <Skeleton className="h-4 w-44" />
            ) : (
              <span className="text-sm text-zinc-400 whitespace-nowrap">
                {date}
              </span>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
