/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/components/ui/input'
import { register } from 'module'
import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

export function PersonaDropzoneAvatar({
  files,
  setFiles,
  setAcceptedFiles,
}: any) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  useEffect(() => {
    const file = acceptedFiles[0]

    if (file) {
      const extension: any = file.name.split('.').pop() ?? ''

      if (extension !== 'png') {
        toast.error('Você precisa selecionar um arquivo de imagem!')
        setFiles([])
        return
      }

      if (acceptedFiles.length > 1) {
        toast.error('Por favor selecione apenas um arquivo de imagem')
        setFiles([])
        return
      }

      setAcceptedFiles(acceptedFiles)

      setFiles(
        acceptedFiles.map((file: any) => (
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        )),
      )
    }
  }, [acceptedFiles])

  return (
    <section className="w-full  transition-all hover:scale-[.98]">
      <div
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
        } inset-0 w-full max-w-28 flex h-28 flex-col items-center justify-center rounded-full hover:brightness-50  shadow-3xl relative -top-12`}
      >
        {!getUserLoggedFn?.avatarUrl && (
          <span className="text-3xl font-semibold flex items-center justify-center h-full w-full">
            {getUserLoggedFn?.name.charAt(0).toUpperCase()}{' '}
          </span>
        )}

        <Input
          type="file"
          {...register('avatarUrl')}
          accept=".jpeg, .jpg, .png, .webp, .svg"
          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
          onChange={(e) => handleFileChange(e, 'avatarUrl')}
        />
      </div>
    </section>
  )
}
