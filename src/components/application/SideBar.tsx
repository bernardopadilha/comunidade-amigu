/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import { Cog } from 'lucide-react'
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
import { DropzoneAvatar } from './dropzone/dropzone-avatar'
import { ThumbnailDropzone } from './dropzone/dropzone-thumbnail'
import { UpdateUser } from '@/api/users/update-user'
import { UpdateThumbnail } from '@/api/users/update-thumbnail'
import { UpdateAvatar } from '@/api/users/update-avatar'

export function SideBar() {
  const [isOpen, setIsOpen] = useState(false)

  const [avatarFiles, setAvatarFiles] = useState([])
  const [avatarAcceptedFiles, setAvatarAcceptedFiles] = useState([])

  console.log(avatarFiles)

  const [thumbnailFiles, setThumbnailFiles] = useState([])
  const [thumbnailAcceptedFiles, setThumbnailAcceptedFiles] = useState([])

  const {
    data: getUserLoggedFn,
    isPending,
    refetch,
  } = useQuery({
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
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
  })

  const { mutateAsync: UpdateUserFn } = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: UpdateUser,
  })

  const { mutateAsync: UpdateThumbnailFn } = useMutation({
    mutationKey: ['updateThumbnail'],
    mutationFn: UpdateThumbnail,
  })

  const { mutateAsync: UpdateAvatarFn } = useMutation({
    mutationKey: ['updateAvatar'],
    mutationFn: UpdateAvatar,
  })

  async function handleUpdateUser(data: UpdateUserData) {
    if (getUserLoggedFn) {
      let avatarUrlPath = null
      let thumbnailUrlPath = null

      if (avatarFiles.length > 0) {
        const avatarUrl = await UpdateAvatarFn({
          userId: getUserLoggedFn.id,
          avatarFile: avatarAcceptedFiles[0],
        })
        avatarUrlPath = avatarUrl
      }

      if (thumbnailFiles.length > 0) {
        const thumbnailUrl = await UpdateThumbnailFn({
          userId: getUserLoggedFn.id,
          thumbnailFile: thumbnailAcceptedFiles[0],
        })
        thumbnailUrlPath = thumbnailUrl
      }

      await UpdateUserFn({
        userId: getUserLoggedFn.id,
        avatarUrl: avatarUrlPath,
        thumbnailUrl: thumbnailUrlPath,
        userData: data,
      })
      refetch()
      setIsOpen(!isOpen)
    }
  }

  const date = formatDate(getUserLoggedFn?.createdAt ?? '')

  return (
    <>
      <aside className="shrink-0 max-h-80 w-full lg:w-80 bg-post/60 backdrop-blur-sm border-2 border-zinc-800 rounded-lg overflow-hidden">
        {isPending ? (
          <Skeleton className="h-24 w-full relative rounded-none" />
        ) : (
          <div className="relative">
            {getUserLoggedFn?.thumbnailUrl ? (
              <img
                src={getUserLoggedFn?.thumbnailUrl}
                alt="banner"
                className="w-full h-24 object-cover pointer-events-none select-none"
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
                      <div className="relative flex flex-col justify-center items-center">
                        <ThumbnailDropzone
                          thumbnailFiles={thumbnailFiles}
                          setThumbnailFiles={setThumbnailFiles}
                          setThumbnailAcceptedFiles={setThumbnailAcceptedFiles}
                        />
                        <DropzoneAvatar
                          avatarFiles={avatarFiles}
                          avatarAcceptedFiles={avatarAcceptedFiles}
                          setAvatarFiles={setAvatarFiles}
                          setAvatarAcceptedFiles={setAvatarAcceptedFiles}
                        />
                      </div>

                      <div className="flex flex-col items-center ">
                        <div className="-mt-6 flex flex-col items-center pb-6 z-50">
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
                  className="rounded-full w-28 h-28 relative -top-12 pointer-events-none select-none"
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
