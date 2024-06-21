import { toast } from 'sonner'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { SignUpData, signUpSchema } from '@/lib/zod/sign-up.zod'
import { signUp } from '@/api/auth/sign-up'
import { EyeOff, Eye } from 'lucide-react'

export function SigUpTabs() {
  const navigate = useNavigate()

  const [typePassword, setTypePassword] = useState('password')
  // const [typePasswordConfirm, setTypePasswordConfirm] = useState('password')

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  })

  const { mutateAsync: signUpFn } = useMutation({
    mutationKey: ['signUp'],
    mutationFn: signUp,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Sua conta foi criada com sucesso!')
    },
  })

  async function handleSignOut(data: SignUpData) {
    await signUpFn({
      name: data.name,
      email: data.email,
      password: data.password,
    })
    reset()
    navigate('/')
  }

  return (
    <div className="w-full max-w-[26rem] bg-[#13141D]/30 backdrop-blur-[2px] flex flex-col items-center justify-start py-8 rounded-[10px] px-8 border-2 border-[#1F2130]">
      <img src="./logo-amigu.png" alt="logo amigu" className="w-44" />

      <div className="mt-4 flex flex-col items-center text-center">
        <h1 className="font-semibold tracking-tight text-3xl">
          Crie sua conta !
        </h1>
        <span className="text-[#7c7c7c] text-sm">
          Insira seu melhor e-mail e uma senha <br /> segura para criar sua
          conta
        </span>
      </div>

      <form
        onSubmit={handleSubmit(handleSignOut)}
        className="flex flex-col w-full gap-2"
      >
        <div className="space-y-1">
          <label className="text-xs font-semibold">Nome</label>
          <Input
            type="text"
            placeholder="Digite seu nome"
            {...register('name')}
            disabled={isSubmitting}
            className="bg-transparent border-2 placeholder:text- border-[#34394F] focus-visible:ring-[#453CA6] ring-offset-0 outline-none transition-all"
          />

          {errors.name && (
            <span className="text-xs text-rose-500 mt-3">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold">E-mail</label>
          <Input
            type="text"
            placeholder="Digite seu e-mail"
            {...register('email')}
            disabled={isSubmitting}
            className="bg-transparent border-2 placeholder:text- border-[#34394F] focus-visible:ring-[#453CA6] ring-offset-0 outline-none transition-all"
          />

          {errors.email && (
            <span className="text-xs text-rose-500 mt-3">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold">Senha</label>
          <div className="relative">
            <Input
              type={typePassword}
              placeholder="Digite sua senha"
              disabled={isSubmitting}
              {...register('password')}
              className={`${errors.confirmPassword ? 'focus-visible:ring-rose-500' : 'focus-visible:ring-[#453CA6]'} bg-transparent border-2 placeholder:text- border-[#34394F] ring-offset-0 outline-none transition-all`}
            />
            <button
              type="button"
              onClick={() =>
                setTypePassword(typePassword === 'text' ? 'password' : 'text')
              }
              className=" absolute top-1/2 -translate-y-1/2 right-2"
            >
              {typePassword === 'text' ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {errors.password && (
            <span className="text-xs text-rose-500 mt-3">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold">Confirme sua senha</label>
          <div className="relative">
            <Input
              type={typePassword}
              placeholder="Digite sua senha"
              disabled={isSubmitting}
              {...register('confirmPassword')}
              className={`${errors.confirmPassword ? 'focus-visible:ring-rose-500' : 'focus-visible:ring-[#453CA6]'} bg-transparent border-2 placeholder:text- border-[#34394F] ring-offset-0 outline-none transition-all`}
            />
            <button
              type="button"
              onClick={() =>
                setTypePassword(typePassword === 'text' ? 'password' : 'text')
              }
              className=" absolute top-1/2 -translate-y-1/2 right-2"
            >
              {typePassword === 'text' ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <span className="text-xs text-rose-500 mt-3">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <Button
          size="lg"
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-[#453CA6] to-[#A697F7] mt-5 text-white disabled:opacity-75 disabled:cursor-not-allowed"
        >
          Criar conta
        </Button>
      </form>
    </div>
  )
}
