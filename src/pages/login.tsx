import { SigInTabs } from '@/components/application/tabs/signin-tabs'
import { SigUpTabs } from '@/components/application/tabs/signup-tabs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Login() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-login bg-no-repeat bg-cover bg-center bg-fixed">
      <div className="max-w-[400px] w-full px-2">
        <Tabs defaultValue="Sign-in">
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
            <SigInTabs />
          </TabsContent>

          <TabsContent value="Sign-out">
            <SigUpTabs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
