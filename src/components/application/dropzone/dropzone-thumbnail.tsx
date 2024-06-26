/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserLogged } from '@/api/auth/get-user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import { PencilIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

export function ThumbnailDropzone({
  setThumbnailFiles,
  setThumbnailAcceptedFiles,
}: any) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  useEffect(() => {
    const file = acceptedFiles[0]

    if (file) {
      const extension: any = file.name.split('.').pop() ?? ''

      if (extension !== 'png') {
        toast.error('Você precisa selecionar um arquivo de imagem!')
        setThumbnailFiles([])
        return
      }

      if (acceptedFiles.length > 1) {
        toast.error('Por favor selecione apenas um arquivo de imagem')
        setThumbnailFiles([])
        return
      }

      setThumbnailAcceptedFiles(acceptedFiles)

      setThumbnailFiles(
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

  const imageUrl = acceptedFiles[0]?.name
    ? URL.createObjectURL(acceptedFiles[0])
    : getUserLoggedFn?.thumbnailUrl

  return (
    <section className="w-full">
      <div
        {...getRootProps({ className: 'dropzone' })}
        style={
          imageUrl
            ? {
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }
            : {}
        }
        className={`${
          imageUrl
            ? 'bg-cover bg-center bg-no-repeat'
            : 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900'
        } inset-0 w-full flex flex-col items-center justify-center h-28 rounded hover:brightness-50 shadow-3xl transition-all hover:scale-[.98] cursor-pointer z-10`}
      >
        <Button
          disabled
          size="icon"
          className="absolute top-2 right-2 bg-zinc-800 disabled:opacity-100"
        >
          <PencilIcon className="size-4 text-white" />
        </Button>

        <Input
          {...getInputProps()}
          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        />
      </div>
    </section>
  )
}
