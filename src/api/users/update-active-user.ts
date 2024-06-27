/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '../supabase'

interface UpdateUserProps {
  userId: number
}

export async function UpdateActiveUser({ userId }: UpdateUserProps) {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  if (data) {
    const { data: user, error } = await supabase
      .from('user')
      .update({
        active: false,
      })
      .eq('id', userId)
      .select()

    if (error) {
      throw new Error(error.message)
    }

    return user
  }
}
