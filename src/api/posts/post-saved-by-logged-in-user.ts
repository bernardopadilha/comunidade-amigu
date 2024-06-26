import { supabase } from '../supabase'

export async function postSavedByLoggedInUser({
  queryKey,
}: {
  queryKey: [string, string, string]
}) {
  const userId = Number(queryKey[1])
  const postId = Number(queryKey[2])

  const { data: saveAtPost, error: errorSave } = await supabase
    .from('saveAtPost')
    .select('*')
    .eq('userId', userId)
    .eq('postId', postId)

  if (errorSave) {
    throw new Error(errorSave.message)
  }

  return saveAtPost
}
