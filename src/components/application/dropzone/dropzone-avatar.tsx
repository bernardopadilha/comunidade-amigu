/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserLogged } from '@/api/auth/get-user'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

export function DropzoneAvatar({
  setAvatarFiles,
  setAvatarAcceptedFiles,
}: any) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  useEffect(() => {
    const file = acceptedFiles[0]

    if (file) {
      const extension: any = file.name.split('.').pop() ?? ''

      if (extension !== 'png') {
        toast.error('Você precisa selecionar um arquivo de imagem!')
        setAvatarFiles([])
        return
      }

      if (acceptedFiles.length > 1) {
        toast.error('Por favor selecione apenas um arquivo de imagem')
        setAvatarFiles([])
        return
      }

      setAvatarAcceptedFiles(acceptedFiles)

      setAvatarFiles(
        acceptedFiles.map((file: any) => (
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        )),
      )
    }
  }, [acceptedFiles])

  const { data: getUserLoggedFn } = useQuery({
    queryKey: ['user'],
    queryFn: getUserLogged,
  })

  return (
    <section className="w-full flex justify-center ">
      <div
        {...getRootProps({ className: 'dropzone' })}
        style={
          getUserLoggedFn?.avatarUrl
            ? {
                backgroundImage: `url(${getUserLoggedFn?.avatarUrl})`,
              }
            : {}
        }
        className={`${
          getUserLoggedFn?.avatarUrl
            ? 'bg-cover bg-center bg-no-repeat'
            : 'bg-zinc-800'
        } inset-0 w-full max-w-28 flex h-28 flex-col items-center justify-center rounded-full hover:brightness-50  shadow-2xl relative -top-12 transition-all hover:scale-[.98] cursor-pointer`}
      >
        {!getUserLoggedFn?.avatarUrl && (
          <span className="text-3xl font-semibold flex items-center justify-center h-full w-full">
            {getUserLoggedFn?.name.charAt(0).toUpperCase()}{' '}
          </span>
        )}

        <Input
          {...getInputProps()}
          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
        />
      </div>
    </section>
  )
}
