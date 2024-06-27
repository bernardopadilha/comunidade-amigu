import { supabase } from '../supabase'

interface LikeAtPostProps {
  userId: number
  postId: number
}

export async function LikePost({ userId, postId }: LikeAtPostProps) {
  // Verifica se já existe uma curtida do usuário no post
  const { data: likeAtPost, error: errorLike } = await supabase
    .from('likeAtPost')
    .select('*')
    .eq('userId', userId)
    .eq('postId', postId)

  if (errorLike) {
    throw new Error(errorLike.message)
  }

  // Se a curtida já existe, exclui a curtida
  if (likeAtPost && likeAtPost.length > 0) {
    const like = likeAtPost[0]

    const { error: errorDeleteLike } = await supabase
      .from('likeAtPost')
      .delete()
      .eq('id', like.id)

    if (errorDeleteLike) {
      throw new Error(errorDeleteLike.message)
    }

    return { message: 'Like removed' } // Retorna uma mensagem indicando que a curtida foi removida
  }

  // Caso contrário, insere uma nova curtida
  const { data, error } = await supabase
    .from('likeAtPost')
    .insert([
      {
        userId,
        postId,
      },
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
