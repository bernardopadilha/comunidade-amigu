import { supabase } from '../supabase'

interface CommentsProps {
  id: string
  postId: number
  userId: number
  createdAt: Date
  content: string
  parentCommentId: number | null
}

export async function FindAllSubComments({
  queryKey,
}: {
  queryKey: [string, string, string]
}): Promise<CommentsProps[]> {
  const postId = queryKey[1]
  const commentId = queryKey[2]

  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .eq('postId', Number(postId))
    .eq('parentCommentId', commentId)

  if (error) {
    throw new Error(error.message)
  }

  const subComments = comments.filter(
    (comment) => comment.parentCommentId !== null,
  )

  return subComments
}
