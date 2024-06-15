import { Content, Post } from '@/components/application/Post'
import { Header } from '@/components/application/Header'
import { Notices } from '@/components/application/amigu-notices'
import { Input } from '@/components/ui/input'

import { SideBar } from '@/components/application/SideBar'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/api/auth/get-user'
import { Skeleton } from '@/components/ui/skeleton'

const posts = [
  {
    id: 1,
    author: {
      name: 'Bernardo Alves Padilha',
      role: "CTO BAP Dev's",
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋🏽' },
      {
        type: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      { type: 'link', content: '👉 jane.design/doctorcare' },
      { type: 'link', content: '#novoprojeto #react #amiGu' },
    ] as Content[],
    publishedAt: new Date('2022-12-25 20:00:00'),
  },
  {
    id: 2,
    author: {
      name: 'Rafael Pereira',
      role: "CTO BAP Dev's",
      avatarUrl: 'https://i.pravatar.cc/150?img=2',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋🏽' },
      {
        type: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      { type: 'link', content: '👉 jane.design/doctorcare' },
    ] as Content[],
    publishedAt: new Date('2022-12-26 20:37:00'),
  },
  {
    id: 3,
    author: {
      name: 'Camila Oliveira',
      role: 'Fullstack Developer',
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
    },
    content: [
      { type: 'paragraph', content: 'Olá pessoal 👋🏽' },
      {
        type: 'paragraph',
        content:
          'Finalizei um novo projeto incrível no meu portfólio. Esse foi desenvolvido durante o NLW Return, evento da Rocketseat. O nome é HealthCareApp 🚀',
      },
      { type: 'link', content: '👉 camila.dev/healthcareapp' },
      { type: 'link', content: '#novoprojeto #vuejs #webdev' },
    ] as Content[],
    publishedAt: new Date('2023-01-10 14:00:00'),
  },
  {
    id: 4,
    author: {
      name: 'Pedro Silva',
      role: 'Backend Engineer',
      avatarUrl: 'https://i.pravatar.cc/150?img=4',
    },
    content: [
      { type: 'paragraph', content: 'E aí galera 👋🏽' },
      {
        type: 'paragraph',
        content:
          'Acabei de finalizar um projeto novo no meu portfólio. Foi feito durante o NLW Return da Rocketseat. O projeto se chama MedConnect 🚀',
      },
      { type: 'link', content: '👉 pedro.dev/medconnect' },
    ] as Content[],
    publishedAt: new Date('2023-01-15 18:00:00'),
  },
  {
    id: 5,
    author: {
      name: 'Ana Costa',
      role: 'Frontend Developer',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
    },
    content: [
      { type: 'paragraph', content: 'Oi pessoal 👋🏽' },
      {
        type: 'paragraph',
        content:
          'Subi um novo projeto no meu portfólio, desenvolvido durante o evento NLW Return da Rocketseat. O nome do projeto é CareFinder 🚀',
      },
      { type: 'link', content: '👉 ana.dev/carefinder' },
      { type: 'link', content: '#frontend #reactjs #nlwreturn' },
    ] as Content[],
    publishedAt: new Date('2023-01-20 11:30:00'),
  },
  {
    id: 6,
    author: {
      name: 'Lucas Martins',
      role: 'DevOps Engineer',
      avatarUrl: 'https://i.pravatar.cc/150?img=6',
    },
    content: [
      { type: 'paragraph', content: 'Fala, pessoal 👋🏽' },
      {
        type: 'paragraph',
        content:
          'Tenho um novo projeto no meu portfólio, feito durante o NLW Return da Rocketseat. O projeto é o ClinicManager 🚀',
      },
      { type: 'link', content: '👉 lucas.dev/clinicmanager' },
      { type: 'link', content: '#devops #docker #kubernetes' },
    ] as Content[],
    publishedAt: new Date('2023-01-25 19:45:00'),
  },
  {
    id: 7,
    author: {
      name: 'Juliana Mendes',
      role: 'Mobile Developer',
      avatarUrl: 'https://i.pravatar.cc/150?img=7',
    },
    content: [
      { type: 'paragraph', content: 'Oi pessoal 👋🏽' },
      {
        type: 'paragraph',
        content:
          'Acabei de lançar um novo projeto no meu portfólio, desenvolvido durante o NLW Return da Rocketseat. É o HealthTracker 🚀',
      },
      { type: 'link', content: '👉 juliana.dev/healthtracker' },
      { type: 'link', content: '#mobiledev #flutter #nlwreturn' },
    ] as Content[],
    publishedAt: new Date('2023-01-30 10:15:00'),
  },
  {
    id: 8,
    author: {
      name: 'Carlos Eduardo',
      role: 'Data Scientist',
      avatarUrl: 'https://i.pravatar.cc/150?img=8',
    },
    content: [
      { type: 'paragraph', content: 'Olá pessoal 👋🏽' },
      {
        type: 'paragraph',
        content:
          'Subi um novo projeto no meu portfólio, desenvolvido durante o NLW Return da Rocketseat. O nome do projeto é DataCare 🚀',
      },
      { type: 'link', content: '👉 carlos.dev/datacare' },
      { type: 'link', content: '#datascience #python #nlwreturn' },
    ] as Content[],
    publishedAt: new Date('2023-02-05 16:00:00'),
  },
  {
    id: 9,
    author: {
      name: 'Mariana Santos',
      role: 'UI/UX Designer',
      avatarUrl: 'https://i.pravatar.cc/150?img=9',
    },
    content: [
      { type: 'paragraph', content: 'Oi galera 👋🏽' },
      {
        type: 'paragraph',
        content:
          'Acabei de subir um novo projeto no meu portfólio, feito durante o evento NLW Return da Rocketseat. O projeto se chama WellnessApp 🚀',
      },
      { type: 'link', content: '👉 mariana.dev/wellnessapp' },
      { type: 'link', content: '#design #ux #ui' },
    ] as Content[],
    publishedAt: new Date('2023-02-10 14:30:00'),
  },
  {
    id: 10,
    author: {
      name: 'Thiago Rodrigues',
      role: 'Fullstack Developer',
      avatarUrl: 'https://i.pravatar.cc/150?img=10',
    },
    content: [
      { type: 'paragraph', content: 'E aí pessoal 👋🏽' },
      {
        type: 'paragraph',
        content:
          'Lancei um novo projeto no meu portfólio, desenvolvido no evento NLW Return da Rocketseat. O nome do projeto é MedTracker 🚀',
      },
      { type: 'link', content: '👉 thiago.dev/medtracker' },
      { type: 'link', content: '#fullstack #nodejs #reactjs' },
    ] as Content[],
    publishedAt: new Date('2023-02-15 09:00:00'),
  },
]

export function Feed() {
  const { data: getUserFn, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })

  return (
    <div className="w-full h-full bg-body bg-no-repeat bg-cover bg-center bg-fixed">
      <Header pending={isPending} />

      <div className="max-w-[1420px] w-full flex flex-col lg:flex-row items-start justify-center mt-20 mx-auto px-2 gap-8 ">
        <SideBar
          pending={isPending}
          name={getUserFn?.name ?? ''}
          username={getUserFn?.username ?? ''}
          avatarUrl={getUserFn?.avatarUrl ?? ''}
          createdAt={getUserFn?.createdAt ?? ''}
          thumbnailUrl={getUserFn?.thumbnailUrl}
        />

        <main className="w-full flex-1">
          <div className="bg-post/80 backdrop-blur-sm border-2 border-zinc-700 py-5 md:px-10 px-5 rounded-lg mb-8">
            {isPending ? (
              <Skeleton className="w-36 h-8" />
            ) : (
              <span className="text-lg font-medium text-zinc-100">
                Nova postagem
              </span>
            )}
            <div className="flex items-center gap-5 mt-3">
              {isPending ? (
                <Skeleton className="shrink-0 w-14 h-14 rounded-md" />
              ) : (
                <img
                  src={getUserFn?.avatarUrl}
                  alt="Foto de Bernardo Alves Padilha"
                  className="rounded-md w-14 border-2 border-zinc-600"
                />
              )}

              {isPending ? (
                <Skeleton className="w-full h-14 rounded-md" />
              ) : (
                <Input
                  className="bg-[#252528] text-zinc-200 h-14 focus-visible:!ring-amigu focus-visible:ring-offset-0 border-none placeholder:text-zinc-200"
                  placeholder="Comece uma publicação"
                />
              )}
            </div>
          </div>

          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                pending={isPending}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>

        <Notices />
      </div>
    </div>
  )
}
