import { Header } from './components/application/Header'
import { Content, Post } from './components/application/Post'
import { SideBar } from './components/application/SideBar'

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/Bernardopadilha.png',
      name: 'Bernardo Alves Padilha',
      role: "CTO BAP Dev's",
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
    publishedAt: new Date('2022-12-25 20:00:00'),
  },

  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/rafaelppereira.png',
      name: 'Rafael Pereira',
      role: 'CTO Alpha Desenvolvimentos',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋🏽' },
      {
        type: 'paragraph',
        content:
          'acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      { type: 'link', content: '👉 jane.design/doctorcare' },
    ] as Content[],
    publishedAt: new Date('2022-12-26 20:37:00'),
  },
]

export function App() {
  return (
    <div className="w-full h-full">
      <Header />

      <div className="max-w-6xl w-full mt-8 mx-auto py-0 px-8 grid grid-cols-[1fr] gap-8  md:grid-cols-[256px,1fr]">
        <SideBar />
        <main className="w-full">
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}
