import { supabase } from '../supabase'

export async function DeleteComment(commentId: string) {
  const { error } = await supabase.from('comments').delete().eq('id', commentId)

  if (error) {
    throw new Error(error.message)
  }
}
