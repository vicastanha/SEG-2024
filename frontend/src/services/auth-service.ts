import { supabase } from "../@libs/supabase";
import { ICredential } from "../@libs/types";

const signIn = async (credential: ICredential) => {
  const {data, error} = await supabase.auth.signInWithPassword({
    email: credential.username,
    password: credential.password
  });

  if (error) throw error;

  return data;
}
export const AuthService = {
    signIn
}