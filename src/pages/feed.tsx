import { Post } from '@/components/application/Post'
import { Header } from '@/components/application/Header'
import { News } from '@/components/application/amigu-news'

import { SideBar } from '@/components/application/SideBar'
import { useQuery } from '@tanstack/react-query'
import { getUserLogged } from '@/api/auth/get-user'
import { NewPost } from '@/components/application/new-post'
import { FindAllPosts } from '@/api/posts/find-all-posts'
import { HeroHighlight } from '@/components/ui/hero-highlight'

export function Feed() {
  const { data: getUserFn, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUserLogged,
  })

  const { data: FindAllPostsFn, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: FindAllPosts,
  })

  return (
    <div className="w-full h-full">
      <Header pending={isPending} />
      <HeroHighlight>
        <div className="max-w-[1420px] w-full flex flex-col lg:flex-row items-start justify-center mt-20 mx-auto px-2 gap-8 ">
          {getUserFn && <SideBar />}

          <main className="w-full flex-1">
            <NewPost refetch={refetch} pending={isPending} user={getUserFn} />

            {FindAllPostsFn &&
              FindAllPostsFn.map((post) => {
                return (
                  <Post
                    key={post.id}
                    postId={post.id}
                    userId={post.userId}
                    content={post.content}
                    publishedAt={post.createdAt}
                  />
                )
              })}
          </main>

          <News pending={isPending} />
        </div>
      </HeroHighlight>
    </div>
  )
}
