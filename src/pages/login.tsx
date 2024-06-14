import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Login() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-login bg-no-repeat bg-cover bg-center bg-fixed">
      <div>
        <Tabs defaultValue="Sign-in" className="w-[400px]">
          <TabsList className="w-full bg-[#13141D]/60 backdrop-blur-sm">
            <TabsTrigger
              className="w-full data-[state=active]:bg-[#453CA6]"
              value="Sign-in"
            >
              Entrar
            </TabsTrigger>
            <TabsTrigger
              className="w-full data-[state=active]:bg-[#453CA6]"
              value="Sign-out"
            >
              Criar conta
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Sign-in">
            <div className="w-full max-w-[26rem] flex flex-col items-center justify-start py-8 rounded-[10px] px-8 border-2 border-[#1F2130] bg-cardLogin bg-no-repeat bg-cover bg-center bg-fixed">
              <img src="./logo-amigu.png" alt="logo amigu" className="w-44" />

              <div className="mt-4 flex flex-col items-center text-center">
                <h1 className="font-semibold tracking-tight text-3xl">
                  Seja bem-vindo!
                </h1>
                <span className="text-[#7c7c7c] text-sm">
                  Insira seu e-mail e sua senha para <br /> entrar ou crie uma
                  conta
                </span>
              </div>

              <form className="flex flex-col w-full gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">E-mail</label>
                  <Input
                    type="text"
                    placeholder="Digite seu e-mail"
                    className="bg-transparent border-2 placeholder:text- border-[#34394F] focus-visible:ring-[#453CA6] ring-offset-0 outline-none transition-all "
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Senha</label>
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    className="bg-transparent border-2 placeholder:text- border-[#34394F] focus-visible:ring-[#453CA6] ring-offset-0 outline-none transition-all "
                  />
                </div>

                <a
                  href="/alterar-senha"
                  className="text-xs text-zinc-500 text-end"
                >
                  Esqueceu sua senha?
                </a>

                <Button
                  size="lg"
                  type="submit"
                  className="bg-gradient-to-r from-[#453CA6] to-[#A697F7] mt-5 text-white"
                >
                  Entrar
                </Button>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="Sign-out">
            <div className="w-full max-w-[26rem] flex flex-col items-center justify-start py-8 rounded-[10px] px-8 border-2 border-[#1F2130] bg-cardLogin bg-no-repeat bg-cover bg-center bg-fixed">
              <img src="./logo-amigu.png" alt="logo amigu" className="w-32" />

              <div className="mt-4 flex flex-col items-center text-center">
                <h1 className="font-semibold tracking-tight text-2xl">
                  Crie sua conta !
                </h1>
                <span className="text-[#7c7c7c] text-sm">
                  Insira seu melhor e-mail e uma senha <br /> segura para criar
                  sua conta
                </span>
              </div>

              <form className="flex flex-col w-full gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Nome</label>
                  <Input
                    type="text"
                    placeholder="Digite seu nome"
                    className="bg-transparent border-2 placeholder:text- border-[#34394F] focus-visible:ring-[#453CA6] ring-offset-0 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">E-mail</label>
                  <Input
                    type="text"
                    placeholder="Digite seu e-mail"
                    className="bg-transparent border-2 placeholder:text- border-[#34394F] focus-visible:ring-[#453CA6] ring-offset-0 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Senha</label>
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    className="bg-transparent border-2 placeholder:text- border-[#34394F] focus-visible:ring-[#453CA6] ring-offset-0 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">
                    Confirme sua senha
                  </label>
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    className="bg-transparent border-2 placeholder:text- border-[#34394F] focus-visible:ring-[#453CA6] ring-offset-0 outline-none transition-all"
                  />
                </div>

                <Button
                  size="lg"
                  type="submit"
                  className="bg-gradient-to-r from-[#453CA6] to-[#A697F7] mt-5 text-white"
                >
                  Criar conta
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
