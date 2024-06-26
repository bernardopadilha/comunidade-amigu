import { Post } from '@/components/application/Post'
import { Header } from '@/components/application/Header'
import { News } from '@/components/application/amigu-news'

import { SideBar } from '@/components/application/SideBar'
import { useQuery } from '@tanstack/react-query'
import { getUserLogged } from '@/api/auth/get-user'
import { NewPost } from '@/components/application/new-post'
import { FindAllPosts } from '@/api/posts/find-all-posts'
import { HeroHighlight } from '@/components/ui/hero-highlight'
import { filterForLikes } from '@/api/posts/filter-for-likes'
import { filterForSaves } from '@/api/posts/filter-for-saves'
import { useState } from 'react'

export function Feed() {
  const [filteredAtLikes] = useState(false)
  const [filteredAtSaves] = useState(false)

  const { data: getUserLoggedFn, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUserLogged,
  })

  const { data: filterForLikesFn } = useQuery({
    queryKey: ['filterForLikes', String(getUserLoggedFn?.id)],
    queryFn: ({ queryKey }) => filterForLikes(queryKey[1]),
  })

  const { data: filterForSavesFn } = useQuery({
    queryKey: ['filterForSaves', String(getUserLoggedFn?.id)],
    queryFn: ({ queryKey }) => filterForSaves(queryKey[1]),
  })

  const { data: FindAllPostsFn, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: FindAllPosts,
  })

  return (
    <div className="w-full h-full">
      <Header pending={isPending} />
      <HeroHighlight className="w-full h-full min-h-screen">
        <div className="max-w-[90rem] w-full flex flex-col lg:flex-row items-start justify-center mt-20 mx-auto px-2 gap-8 ">
          <div className="sticky top-20 flex flex-col items-center justify-start gap-2">
            {getUserLoggedFn && <SideBar />}

            {/* <div className="w-full max-h-full flex items-center justify-center gap-2">
              <Button
                onClick={() => {
                  setFilteredAtLikes(!filteredAtLikes)
                  setFilteredAtSaves(false)
                }}
                className={`${filteredAtLikes ? 'text-rose-500 hover:text-white' : 'text-white hover:text-rose-500'}  hover:bg-zinc-900 flex items-center justify-center gap-2 bg-zinc-900 w-full rounded-md py-3 hover:brightness-75`}
              >
                <Heart className="size-5" />
                <h1>Curtidas</h1>
              </Button>

              <Button
                onClick={() => {
                  setFilteredAtSaves(!filteredAtSaves)
                  setFilteredAtLikes(false)
                }}
                className={`${filteredAtSaves ? 'text-amber-300 hover:text-white' : 'text-white hover:text-amber-300'}  hover:bg-zinc-900 flex items-center justify-center gap-2 bg-zinc-900 w-full rounded-md py-3 hover:brightness-75`}
              >
                <BookMarked className="size-5" />
                <h1>Salvas</h1>
              </Button>
            </div> */}
          </div>

          <main className="w-full flex-1">
            <NewPost
              refetch={refetch}
              pending={isPending}
              user={getUserLoggedFn}
            />

            {FindAllPostsFn &&
              (filteredAtLikes && filterForLikesFn
                ? filterForLikesFn.map((post) => (
                    <Post
                      key={post.id}
                      postId={post.id}
                      userId={post.userId}
                      content={post.content}
                      publishedAt={post.createdAt} // Use created_at conforme o retorno da função
                    />
                  ))
                : filteredAtSaves && filterForSavesFn
                  ? filterForSavesFn.map((post) => (
                      <Post
                        key={post.id}
                        postId={post.id}
                        userId={post.userId}
                        content={post.content}
                        publishedAt={post.createdAt} // Use created_at conforme o retorno da função
                      />
                    ))
                  : FindAllPostsFn.map((post) => (
                      <Post
                        key={post.id}
                        postId={post.id}
                        userId={post.userId}
                        content={post.content}
                        publishedAt={post.createdAt} // Use created_at conforme o retorno da função
                      />
                    )))}
          </main>

          <News pending={isPending} />
        </div>
      </HeroHighlight>
    </div>
  )
}
