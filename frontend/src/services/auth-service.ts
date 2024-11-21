import { supabase } from "../@libs/supabase";
import { ICredential, IUser } from "../@libs/types";

const signIn = async (credential: ICredential) => {
  const {data, error} = await supabase.auth.signInWithPassword({
    email: credential.username,
    password: credential.password
  });

  if (error) throw error;

  return data;
}

const signUp = async (user: IUser) => {
  const {data, error} = await supabase.auth.admin.createUser({
    user_metadata: { name: user.name },
    email: user.email,
    password: user.password,
    email_confirm: true,
  });

  if (error) throw error;

  return data.user;
}

const signOut = async () => {
  const {error} = await supabase.auth.signOut();

  if (error) throw error;
}

const getUser = async () => {
  const {data, error} = await supabase.auth.getSession();

  if (error) throw error;

  return data.session?.user;
}


const configure = async () => {
  const {data, error} = await supabase.auth.mfa.enroll({
    factorType: 'totp',
    issuer: 'SEG-2024',
    friendlyName: 'SEG-2024'
  })

  if (error) throw error; 
  
  return data;
}

const getFactorId = async () => {
  const {data, error} = await supabase.auth.mfa.listFactors();

  if (error) throw error;

  return { factorID: data.totp.length > 0 ?  data.totp[0].id : '' }
}

const verifyCode = async (factorId: string, code: string) => {
  const {data, error} = await supabase.auth.mfa.challengeAndVerify({
    code: code,
    factorId: factorId
  });

  if (error) throw error;

  return data;
}

const remove = async (factorId: string) => {
  const {data, error} = await supabase.auth.mfa.unenroll({
    factorId: factorId
  });

  if (error) throw error;

  return data;
}

const mfa = {
  configure,
  getFactorId,
  verifyCode,
  remove
}

export const AuthService = {
  signIn,
  signUp,
  signOut,
  getUser,
  mfa
}