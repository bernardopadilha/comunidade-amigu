import { useState } from 'react'

import { signIn } from '@/api/auth/login'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoginData, loginSchema } from '@/lib/zod/login.zod'

import { EyeOff, Eye } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export function SigInTabs() {
  const navigate = useNavigate()

  const [typePassword, setTypePassword] = useState('password')

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const { mutateAsync: signInFn } = useMutation({
    mutationKey: ['login'],
    mutationFn: signIn,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Login efetuado com sucesso!')
    },
  })

  async function handleSignIn(data: LoginData) {
    await signInFn({ email: data.email, password: data.password })
    reset()
    navigate('/feed')
  }

  return (
    <div className="w-full max-w-[26rem] bg-[#13141D]/30 backdrop-blur-sm flex flex-col items-center justify-start py-8 rounded-[10px] px-8 border-2 border-[#1F2130] ">
      <img src="./logo-amigu.png" alt="logo amigu" className="w-44" />

      <div className="mt-4 flex flex-col items-center text-center">
        <h1 className="font-semibold tracking-tight text-3xl">
          Seja bem-vindo!
        </h1>
        <span className="text-[#7c7c7c] text-sm">
          Insira seu e-mail e sua senha para <br /> entrar ou crie uma conta
        </span>
      </div>

      <form
        className="flex flex-col w-full gap-2"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <div className="space-y-1">
          <label className="text-xs font-semibold">E-mail</label>
          <Input
            type="text"
            placeholder="Digite seu e-mail"
            disabled={isSubmitting}
            {...register('email')}
            className="bg-transparent border-2 placeholder:text- border-[#34394F] focus-visible:ring-[#453CA6] ring-offset-0 outline-none transition-all "
          />

          {errors.email && (
            <span className="text-xs text-red-500 mt-3">
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
              className="bg-transparent border-2 placeholder:text- border-[#34394F] focus-visible:ring-[#453CA6] ring-offset-0 outline-none transition-all"
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
            <span className="text-xs text-red-500 mt-3">
              {errors.password.message}
            </span>
          )}
        </div>

        <a
          href="/alterar-senha"
          className="text-xs text-zinc-500 text-end hover:brightness-75 hover:underline"
        >
          Esqueceu sua senha?
        </a>

        <Button
          size="lg"
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-[#453CA6] to-[#A697F7] mt-5 text-white disabled:opacity-75 disabled:cursor-not-allowed"
        >
          Entrar
        </Button>
      </form>
    </div>
  )
}
